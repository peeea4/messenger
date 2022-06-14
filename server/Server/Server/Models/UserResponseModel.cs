using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class UserResponseModel
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }
        
        public string ProfileImageFilePath { get; set; }

        public bool IsCurrentlyOnline { get; set; }

        public DateTime? LastOnline { get; set; }

        public byte Age { get; set; }

        public string About { get; set; }

        public List<Chat> Chats { get; set; } = new List<Chat>();

        public List<Message> Messages { get; set; } = new List<Message>();
    }
}