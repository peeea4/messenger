using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Services
{
    public class UsersService
    {
        private readonly Context.Context _context;

        public UsersService(Context.Context context)
        {
            _context = context;
        }

        public async Task<int> CreateUserAsync(User user)
        {
            var newUser = await this._context.Users.AddAsync(user);
            try
            {
                await this._context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return -1;
            }

            return newUser.Entity.Id;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await this._context.Users.FindAsync(id);
            if (user is null)
            {
                return false;
            }

            this._context.Users.Remove(user);
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

        public async Task<List<User>> GetUsersAsync()
        {
            return await this._context.Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await this._context.Users.FindAsync(id);
        }

        public async Task<User> UpdateUserAsync(int id, User user)
        {
            var existingUser = await this._context.Users.FindAsync(id);
            existingUser.Chats = user.Chats;
            existingUser.Username = user.Username;
            existingUser.Room = user.Room;

            this._context.Entry(existingUser).State = EntityState.Modified;
            try
            {
                await this._context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return null;
            }
            var t = this._context.Entry(existingUser).Entity;

            return this._context.Entry(existingUser).Entity;
        }

        public async Task<List<Chat>> GetUserChats(int id)
        {
            var user = await this._context.Users.FindAsync(id);
            var chats = user?.Chats;
            return chats;
        }
    }
}
