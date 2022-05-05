using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
        
        public string Username { get; set; }
        
        public List<Chat> Chats { get; set; } = new List<Chat>();
    }
}
