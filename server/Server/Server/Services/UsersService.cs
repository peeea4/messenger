using System.Collections.Generic;
using System.IO.Pipelines;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
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

        public async Task<User> CreateUserAsync(User user)
        {
            if (await this._context.Users.AnyAsync(t => t.Email == user.Email))
            {
                return null;
            }

            user.Password = user.Password.GetHash();
            var newUser = await this._context.Users.AddAsync(user);
            try
            {
                await this._context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                return null;
            }

            return newUser.Entity;
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
            return await this._context.Users.Include(user => user.Chats).ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await this._context.Users.Where(user => user.Id == id).Include(user => user.Chats).FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await this._context.Users.Include(user => user.Chats).FirstOrDefaultAsync(user => string.Equals(user.Email, email));
        }

        public async Task<User> UpdateUserAsync(int id, User user)
        {
            var existingUser = await this._context.Users.FindAsync(id);
            existingUser.Chats = user.Chats;
            existingUser.Username = user.Username;

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

        public async Task<List<Chat>> GetUserChatsAsync(int id)
        {
            var user = await this.GetUserByIdAsync(id);
            var chats = user?.Chats;
            return chats;
        }
    }
}
