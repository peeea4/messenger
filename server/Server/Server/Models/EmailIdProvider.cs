using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

namespace Server.Models
{
    public class EmailIdProvider : IUserIdProvider
    {
        public string? GetUserId(HubConnectionContext connection)
        {
            return connection?.User?.FindFirst(ClaimTypes.Name)?.Value!;
        }
    }
}