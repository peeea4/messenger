using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthorizationController : Controller
    {
        private readonly UsersService _service;
        private readonly IMapper _mapper;

        public AuthorizationController(UsersService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }
        
        [Route("signIn")]
        public async Task<ActionResult<AuthenticateResponse>> SignIn(User user)
        {
            var userFromDb = await _service.GetUserByEmailAsync(user.Email);
            if (userFromDb is null)
            {
                return BadRequest($"User with email '{user.Email}' does not exist.");
            }

            if (!user.Password.CompareWithHashed(userFromDb.Password))
            {
                return BadRequest($"Incorrect password.");
            }

            var response = GetAuthenticateResponse(userFromDb);

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthenticateResponse>> Register(User user, [FromForm] IFormFile image)
        {
            var newUser = await this._service.CreateUserAsync(user, image);

            var response = GetAuthenticateResponse(newUser);

            return this.Ok(response);
        }

        private AuthenticateResponse GetAuthenticateResponse(User user)
        {
            var identity = GetIdentity(user);
            var token = new JwtSecurityToken(
                issuer: JwtTokenCreationSettings.Issuer,
                audience: JwtTokenCreationSettings.Audience,
                notBefore: DateTime.Now,
                claims: identity.Claims,
                expires: JwtTokenCreationSettings.Expires,
                signingCredentials: JwtTokenCreationSettings.SigningCredentials);
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(token);
            var response = new AuthenticateResponse
            {
                User = _mapper.Map<User, UserResponseModel>(user),
                AccessToken = encodedJwt
            };

            return response;
        }

        private ClaimsIdentity GetIdentity(User user)
        {
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Id.ToString()),
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
