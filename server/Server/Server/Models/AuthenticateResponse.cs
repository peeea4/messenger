namespace Server.Models
{
    public class AuthenticateResponse
    {
        public User User { get; set; }

        public string AccessToken { get; set; }
    }
}
