using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Server.Context;
using Server.Models;

namespace Server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly User _botUser;
        private readonly IDictionary<string, User> _connections;
        private readonly Context.Context _context;

        public ChatHub(IDictionary<string, User> connections, Context.Context context)
        {
            _botUser = _context?.Users is null 
                ? new User
                    {
                        Id = 1,
                        Username = "Bot"
                    } 
                : _context.Users.Find(1);

            _connections = connections;
            _context = context;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out User userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.Username} has left");
                SendUsersConnected(userConnection.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task JoinRoom(User user)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, user.Room);
            
            _connections[Context.ConnectionId] = user;
            var message = new Message
            {
                Text = $"{user.Username} has joined {user.Room}",
                Sender = _botUser,
                TimeSent = DateTime.Now.ToString("HH:mm"),
            };
            await Clients.Group(user.Room).SendAsync(
                "ReceiveMessage",
                message);
            
            await SendUsersConnected(user.Room);
        }

        public async Task SendMessage(string message)
        {
            var c = Clients?.User("stas");
            if (_connections.TryGetValue(Context.ConnectionId, out User user))
            {
                await Clients.Group(user.Room).SendAsync(
                    "ReceiveMessage",
                    new Message
                    {
                        Text = message,
                        Sender = user,
                        TimeSent = DateTime.Now.ToString("HH:mm"),
                    });
            }
        }

        public Task SendUsersConnected(string room)
        {
            var users = _connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.Username);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }

        public async Task NotifyChatCreated(Chat chat)
        {
            foreach (var user in chat.Users)
            {
                var c = Clients.User(user.Email);
                await Clients.Client(user.Email).SendAsync("newChatCreated");
            }
        }

        public async Task CreateRoom(string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        }
    }
}
