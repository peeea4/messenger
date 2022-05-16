using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Context;
using Server.Models;

namespace Server.Services
{
    public class UsersService
    {
        private readonly MessengerContext _messengerContext;

        public UsersService(MessengerContext messengerContext)
        {
            _messengerContext = messengerContext;
        }

        public async Task<User> CreateUserAsync(User user)
        {
            if (await this._messengerContext.Users.AnyAsync(t => t.Email == user.Email))
            {
                return null;
            }

            user.Password = user.Password.GetHash();
            var newUser = await this._messengerContext.Users.AddAsync(user);
            try
            {
                await this._messengerContext.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                return null;
            }

            return newUser.Entity;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await this._messengerContext.Users.FindAsync(id);
            if (user is null)
            {
                return false;
            }

            user.Messages = null;
            this._messengerContext.Users.Remove(user);
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

        public async Task<List<User>> GetUsersAsync()
        {
            return await this._messengerContext.Users.Include(user => user.Chats).ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await this._messengerContext.Users
                .Include(user => user.Chats)
                .ThenInclude(chat => chat.Users)
                .FirstOrDefaultAsync(user => user.Id == id);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await this._messengerContext.Users.Include(user => user.Chats).FirstOrDefaultAsync(user => string.Equals(user.Email, email));
        }

        public async Task<User> UpdateUserAsync(int id, User user)
        {
            var existingUser = await this._messengerContext.Users.FindAsync(id);
            existingUser.Chats = user.Chats;
            existingUser.Username = user.Username;

            this._messengerContext.Entry(existingUser).State = EntityState.Modified;
            try
            {
                await this._messengerContext.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return null;
            }
            var t = this._messengerContext.Entry(existingUser).Entity;

            return this._messengerContext.Entry(existingUser).Entity;
        }

        public async Task<List<Chat>> GetUserChatsAsync(int id)
        {
            var user = await this.GetUserByIdAsync(id);
            var chats = user?.Chats;
            return chats;
        }
    }
}
