using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models
{
    public class Chat
    {
        [Key]
        [ForeignKey("Id")]
        public int Id { get; set; }

        public string Name { get; set; }

        public List<Message> Messages { get; set; } = new List<Message>();

        public List<User> Users { get; set; } = new List<User>();
    }
}
