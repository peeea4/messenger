using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Server.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
        
        public string Username { get; set; }
        
        public string ProfileImageFilePath { get; set; }

        public bool IsCurrentlyOnline { get; set; }

        public DateTime? LastOnline { get; set; }

        public List<Chat> Chats { get; set; } = new List<Chat>();

        public List<Message> Messages { get; set; } = new List<Message>();
    }
}
