using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Context
{
    public class MessengerContext : DbContext
    {
        public MessengerContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Chat> Chats { get; set; }

        public DbSet<Message> Messages { get; set; }
    }
}
