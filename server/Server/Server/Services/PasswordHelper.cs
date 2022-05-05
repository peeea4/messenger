using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Server.Services
{
    public static class PasswordHelper
    {
        public static string GetHash(this string password)
        {
            var hashedPassword = SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(password));
            return string.Concat(hashedPassword.Select(item => item.ToString("x2")));
        }

        public static bool CompareWithHashed(this string first, string hashed)
        {
            return string.Equals(first.GetHash(), hashed);
        }
    }
}
