using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Server.Context;
using Server.Hubs;
using Server.Models;

namespace Server.Services
{
    public class ChatsService
    {
        private readonly MessengerContext _messengerContext;
        private readonly IHubContext<ChatHub> _hub;

        public ChatsService(MessengerContext messengerContext, IHubContext<ChatHub> hub)
        {
            _messengerContext = messengerContext;
            _hub = hub;
        }

        public async Task<int> CreateChatAsync(Chat chat)
        {
            int id = 0;
            try
            {
                var users = chat?.Users?.Select(user => this._messengerContext.Users.Find(user.Id)).ToList();
                var newChat = new Chat
                {
                    Name = chat.Name,
                    Users = users,
                };

                await this._messengerContext.Chats.AddAsync(newChat);
                await this._messengerContext.SaveChangesAsync();
                
                foreach (var user in newChat.Users)
                {
                    await this._hub.Clients.User(user.Id.ToString()).SendAsync("newChatCreated");
                }

                id = newChat.Id;
            }
            catch (Exception e)
            {
                return -1;
            }

            return id;
        }

        public async Task<bool> DeleteChatAsync(int id)
        {
            var chat = await this._messengerContext.Chats.FindAsync(id);
            if (chat is null)
            {
                return false;
            }

            this._messengerContext.Chats.Remove(chat);
            try
            {
                await this._messengerContext.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return false;
            }

            return true;
        }

        public async Task<List<Chat>> GetChatsAsync()
        {
            return await this._messengerContext.Chats
                .Include(chat => chat.Users)
                .AsNoTracking()
                .Include(chat => chat.Messages)
                .ThenInclude(message => message.Sender)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Chat> GetChatByIdAsync(int id)
        {
            return await this._messengerContext.Chats
                .Include(chat => chat.Users)
                .AsNoTracking()
                .Include(chat => chat.Messages)
                .ThenInclude(message => message.Sender)
                .AsNoTracking()
                .FirstOrDefaultAsync(chat => chat.Id == id);
        }

        public async Task<Chat> UpdateChatAsync(int id, Chat chat)
        {
            var existingChat = await this._messengerContext.Chats.FindAsync(id);
            existingChat.Messages = chat.Messages;
            existingChat.Users = chat.Users;
            existingChat.Name = chat.Name;

            this._messengerContext.Entry(existingChat).State = EntityState.Modified;
            try
            {
                await this._messengerContext.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return null;
            }
            
            return this._messengerContext.Entry(existingChat).Entity;
        }

        public async Task<List<Message>> GetChatMessagesAsync(int id)
        {
            var user = await this.GetChatByIdAsync(id);
            var chats = user?.Messages;
            return chats;
        }

        public async Task<bool> AddMessagesToChatAsync(int chatId, List<Message> messages)
        {
            try
            {
                var chat = await this._messengerContext.Chats.FirstOrDefaultAsync(chat => chat.Id == chatId);
                var t = chat.Messages;
                t.Add(messages.First());
                chat.Messages = t;
                this._messengerContext.Entry(chat).State = EntityState.Detached;
                await this._messengerContext.SaveChangesAsync();

                chat = await this.GetChatByIdAsync(chatId);
            }
            catch (DbUpdateException)
            {
                return false;
            }
            catch (Exception e)
            {
                return false;
            }

            return true;
        }
    }
}