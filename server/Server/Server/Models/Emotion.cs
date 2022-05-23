using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Emotion
    {
        [Key]
        public int Id { get; set; }

        public User User { get; set; }

        public string Symbol { get; set; }

        public int Count { get; set; }
    }
}
