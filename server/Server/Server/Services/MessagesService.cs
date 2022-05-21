using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Context;
using Server.Models;

namespace Server.Services
{
    public class MessagesService
    {
        private readonly MessengerContext _messengerContext;

        public MessagesService(MessengerContext messengerContext)
        {
            _messengerContext = messengerContext;
        }

        public async Task<Message> CreateMessageAsync(Message message)
        {
            var newMessage = await this._messengerContext.Messages.AddAsync(message);
            try
            {
                await this._messengerContext.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return null;
            }

            return newMessage.Entity;
        }

        public async Task<bool> DeleteMessageAsync(int id)
        {
            var message = await this._messengerContext.Messages.FindAsync(id);
            if (message is null)
            {
                return false;
            }

            this._messengerContext.Messages.Remove(message);
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

        public async Task<List<Message>> GetMessagesAsync()
        {
            return await this._messengerContext.Messages.ToListAsync();
        }

        public async Task<Message> GetMessageByIdAsync(int id)
        {
            return await this._messengerContext.Messages.
                    Include(message => message.Emotions)
                    .FirstOrDefaultAsync(message => message.Id == id);
        }

        public async Task<Message> UpdateMessageAsync(int id, Message message)
        {
            var existingMessage = await GetMessageByIdAsync(id);
            existingMessage.Text = message.Text;
            existingMessage.IsEdited = true;
            var emotion = message.Emotions.FirstOrDefault();
            var existingEmotion = existingMessage.Emotions.FirstOrDefault(e => string.Equals(e.Symbol, emotion.Symbol));
            if (existingEmotion != null)
            {
                existingEmotion.Count++;
            }
            else
            {
                existingMessage.Emotions.Add(new Emotion
                {
                    Symbol = emotion.Symbol,
                    Count = 1
                });
            }

            this._messengerContext.Entry(existingMessage).State = EntityState.Modified;
            try
            {
                await this._messengerContext.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return null;
            }
            
            return this._messengerContext.Entry(existingMessage).Entity;
        }
    }
}