using System.Collections.Generic;

namespace Server.Models
{
    public class ChatResponseModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<Message> Messages { get; set; } = new List<Message>();

        public List<UserResponseModel> Users { get; set; } = new List<UserResponseModel>();
    }
}
