using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string Username { get; set; }

        public string Room { get; set; }

        public List<Chat> Chats { get; set; } = new List<Chat>();
    }
}
