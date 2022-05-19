using System;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Server.Services.Helpers
{
    public static class JwtTokenCreationSettings
    {
        public static string Issuer => "ISSUER";

        public static string Audience => "AUDIENCE";

        public static DateTime? Expires => DateTime.Now.AddMinutes(60);
        
        public static SymmetricSecurityKey SymmetricSecurityKey => new SymmetricSecurityKey(Encoding.ASCII.GetBytes("mysupersecret_secretkey!123"));
    }
}