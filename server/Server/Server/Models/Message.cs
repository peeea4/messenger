using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO.Compression;

namespace Server.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        
        public string Text { get; set; }

        public User Sender { get; set; } = new User();

        public string TimeSent { get; set; }

        [ForeignKey("ChatId")]
        public Chat Chat { get; set; } = new Chat();

        public bool IsEdited { get; set; }

        // public List<Emotion> Emotions { get; set; } = new List<Emotion>();
    }
}
