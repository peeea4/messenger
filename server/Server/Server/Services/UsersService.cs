using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Server.Context;
using Server.Models;

namespace Server.Services
{
    public class UsersService
    {
        private readonly MessengerContext _messengerContext;
        private readonly IWebHostEnvironment _env;

        public UsersService(MessengerContext messengerContext, IWebHostEnvironment env)
        {
            _messengerContext = messengerContext;
            _env = env;
        }

        public async Task<User> CreateUserAsync(User user, IFormFile image = null)
        {
            if (await this._messengerContext.Users.AnyAsync(t => t.Email == user.Email))
            {
                return null;
            }

            user.Password = user.Password.GetHash();
            var newUser = await this._messengerContext.Users.AddAsync(user);
            if (image != null)
            {
                await SaveProfileImage(newUser.Entity.Id, image);
            }
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

        public async Task<User> UpdateUserAsync(int id, User user, IFormFile image = null)
        {
            var existingUser = await GetUserByIdAsync(id);

            try
            {
                existingUser.Username = user.Username;
                if (image != null)
                {
                    existingUser.ProfileImageFilePath = await SaveProfileImage(id, image);
                }

                this._messengerContext.Entry(existingUser).State = EntityState.Modified;
                await this._messengerContext.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                return null;
            }
            catch (Exception e)
            {
                
            }

            return existingUser;
        }

        public async Task<List<Chat>> GetUserChatsAsync(int id)
        {
            var chats = await this._messengerContext.Chats
                .Where(chat => chat.Users.Select(user => user.Id).FirstOrDefault() == id)
                .Include(chat => chat.Users)
                .Include(chat => chat.Messages)
                .ThenInclude(message => message.Sender)
                .AsNoTracking()
                .ToListAsync();
            
            return chats;
        }

        
        private async Task<string> SaveProfileImage(int userId, IFormFile profileImage)
        {
            var profileImageFilePath = Path.Combine(_env.ContentRootPath, "wwwroot", "Images", $"{userId}{Path.GetExtension(profileImage.FileName)}");
            await using var fileStream = new FileStream($"{profileImageFilePath}", FileMode.Create);
            await profileImage.CopyToAsync(fileStream);
            return profileImageFilePath;
        }
    }
}
