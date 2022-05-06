﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Server.Hubs;
using Server.Models;

namespace Server.Services
{
    public class ChatsService
    {
        private readonly Context.Context _context;
        private readonly ChatHub _hub;

        public ChatsService(Context.Context context, ChatHub hub)
        {
            _context = context;
            _hub = hub;
        }

        public async Task<int> CreateChatAsync(Chat chat)
        {
            EntityEntry<Chat> newChat;
            try
            {
                chat.Users = chat?.Users?.Select(user => this._context.Users.Find(user.Id)).ToList();
                newChat = await this._context.Chats.AddAsync(chat);
                await this._context.SaveChangesAsync();
                
            }
            catch (DbUpdateException e)
            {
                return -1;
            }

            return newChat.Entity.Id;
        }

        public async Task<bool> DeleteChatAsync(int id)
        {
            var chat = await this._context.Chats.FindAsync(id);
            if (chat is null)
            {
                return false;
            }

            this._context.Chats.Remove(chat);
            try
            {
                await this._context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return false;
            }

            return true;
        }

        public async Task<List<Chat>> GetChatsAsync()
        {
            return await this._context.Chats
                .Include(chat => chat.Messages)
                .Include(chat => chat.Users)
                .ToListAsync();
        }

        public async Task<Chat> GetChatByIdAsync(int id)
        {
            return (await this.GetChatsAsync()).Find(user => user.Id == id);
        }

        public async Task<Chat> UpdateChatAsync(int id, Chat chat)
        {
            var existingChat = await this._context.Chats.FindAsync(id);
            existingChat.Messages = chat.Messages;
            existingChat.Users = chat.Users;
            existingChat.Name = chat.Name;

            this._context.Entry(existingChat).State = EntityState.Modified;
            try
            {
                await this._context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return null;
            }
            
            return this._context.Entry(existingChat).Entity;
        }

        public async Task<List<Message>> GetChatMessagesAsync(int id)
        {
            var user = await this.GetChatByIdAsync(id);
            var chats = user?.Messages;
            return chats;
        }

        public async Task<bool> AddMessagesToChat(int chatId, List<Message> messages)
        {
            var chat = await this._context.Chats.FindAsync(chatId);
            chat.Messages.AddRange(messages.Select(message => new Message
            {
                Chat = chat,
                Text = message.Text,
                TimeSent = message.TimeSent,
                Id = message.Id,
                IsEdited = message.IsEdited,
                Sender = message.Sender
            }));

            this._context.Entry(chat).State = EntityState.Modified;
            try
            {
                await this._context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return false;
            }

            return true;
        }
    }
}