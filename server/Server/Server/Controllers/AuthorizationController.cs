﻿using System;
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
                return BadRequest($"User with email '{user.Email}' does not exist.");
            }

            var response = GetAuthenticateResponse(user);

            return Ok();
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthenticateResponse>> Register(User user)
        {
            var newUser = await this._service.CreateUserAsync(user);

            var response = GetAuthenticateResponse(newUser);

            return this.Ok(response);
        }

        private AuthenticateResponse GetAuthenticateResponse(User user)
        {
            var identity = GetIdentity(user);
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