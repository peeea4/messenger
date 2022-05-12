using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Server.Context;
using Server.Models;
using Server.Services;

namespace Server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly User _botUser;
        private readonly IDictionary<string, User> _connections;
        private readonly Context.Context _context;
        private readonly ChatsService _service;

        public ChatHub(IDictionary<string, User> connections, Context.Context context, ChatsService service)
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
            _service = service;
        }

        public async Task LeaveRoom(string chatId)
        {
            await Clients.Group(chatId).SendAsync("ReceiveMessage", _botUser, $"{Context.UserIdentifier} has left");
            await SendUsersConnected(chatId);
        }

        public async Task JoinRoom(User user, string chatId)
        {
            if (chatId == "0")
            {
                return;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
        }

        public async Task SendMessage(int chatId, string message)
        {
            var chat = await this._service.GetChatByIdAsync(chatId);
            foreach (var user in chat.Users)
            {
                await Clients.User(user.Id.ToString()).SendAsync(
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
                .Where(c => c.Chats.Exists(chat => chat.Name == room))
                .Select(c => c.Username);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }

        public async Task NotifyChatCreated(Chat chat)
        {
            foreach (var user in chat.Users)
            {
                var c = Clients.User(user.Id.ToString());
                await Clients.Client(user.Id.ToString()).SendAsync("newChatCreated");
            }
        }

        public async Task CreateRoom(string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        }
    }
}
