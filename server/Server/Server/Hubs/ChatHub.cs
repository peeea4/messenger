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
        private readonly Context.MessengerContext _messengerContext;
        private readonly ChatsService _service;
        private readonly MessagesService _messagesService;
        private readonly UsersService _usersService;

        public ChatHub(
            IDictionary<string, User> connections,
            Context.MessengerContext messengerContext,
            ChatsService service,
            MessagesService messagesService,
            UsersService usersService)
        {
            _botUser = _messengerContext?.Users is null 
                ? new User
                    {
                        Id = 1,
                        Username = "Bot"
                    } 
                : _messengerContext.Users.Find(1);

            _connections = connections;
            _messengerContext = messengerContext;
            _service = service;
            _messagesService = messagesService;
            _usersService = usersService;
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

            try
            {
                this._connections.Add(Context.UserIdentifier, user);
            }
            catch(Exception e)
            {

            }
            
            await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());
            var chat = await this._service.GetChatByIdAsync(int.Parse(chatId));
            if (!chat.Users.Contains(user))
            {
                await Clients.Group(chatId).SendAsync(
                    "ReceiveMessage",
                    new Message
                    {
                        Text = $"{user.Username} joined the chat!",
                        Sender = _botUser,
                        TimeSent = DateTime.Now.ToString("HH:mm")
                    });
            }
        }

        public async Task SendMessage(string chatId, string messageText)
        {
            if (this._connections.TryGetValue(Context.UserIdentifier, out User user))
            {
                var chat = await this._messengerContext.Chats.FindAsync(int.Parse(chatId));
                var existingUser = await this._messengerContext.Users.FindAsync(user.Id);
                var message = new Message
                {
                    Text = messageText,
                    Sender = existingUser,
                    Chat = chat,
                    TimeSent = DateTime.Now.ToString("HH:mm")
                };

                await Clients.Group(chatId).SendAsync(
                    "ReceiveMessage",
                    message
                    );

                await this._messagesService.CreateMessageAsync(message);
            }
        }

        public Task SendUsersConnected(string room)
        {
            var users = _connections.Values
                .Where(c => c.Chats.Exists(chat => chat.Name == room))
                .Select(c => c.Username);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }
}
