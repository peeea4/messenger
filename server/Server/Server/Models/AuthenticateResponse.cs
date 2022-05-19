namespace Server.Models
{
    public class AuthenticateResponse
    {
        public UserResponseModel User { get; set; }

        public string AccessToken { get; set; }
    }
}
