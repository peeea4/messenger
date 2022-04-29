using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthorizationController : Controller
    {
        private readonly UsersService _service;

        public AuthorizationController(UsersService service)
        {
            _service = service;
        }

        [Authorize]
        [Route("signIn")]
        public async Task<ActionResult<AuthenticateResponse>> SignIn()
        {
            var t = User.Identity.Name;
            return null;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthenticateResponse>> Register(User user)
        {
            await this._service.CreateUserAsync(user);

            var identity = await GetIdentity(user);
            var token = new JwtSecurityToken(
                issuer: "ISSUER",
                audience: "AUDIENCE",
                notBefore: DateTime.Now,
                claims: identity.Claims,
                expires: DateTime.Now.Add(TimeSpan.FromMinutes(60)),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes("mysupersecret_secretkey!123")), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(token);
            var response = new AuthenticateResponse
            {
                User = user,
                AccessToken = encodedJwt
            };

            return this.Ok(response);
        }

        private async Task<ClaimsIdentity> GetIdentity(User user)
        {
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                };
                ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                        ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }
            
            return null;
        }
    }
}
