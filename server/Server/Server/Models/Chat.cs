using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Chat
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public List<Message> Messages { get; set; } = new List<Message>();

        public List<User> Users { get; set; } = new List<User>();
    }
}
