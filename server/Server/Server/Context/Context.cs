using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Context
{
    public class Context : DbContext
    {
        public Context(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Chat> Chats { get; set; }

        public DbSet<Message> Messages { get; set; }
    }
}
