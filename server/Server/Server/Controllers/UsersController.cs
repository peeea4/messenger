using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("/users")]
    public class UsersController : ControllerBase
    {
        private readonly UsersService _service;
        private readonly IMapper _mapper;

        public UsersController(UsersService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet("{id:int}/chats")]
        public async Task<ActionResult<List<Chat>>> GetUserChats(int id)
        {
            var chats = await this._service.GetUserChatsAsync(id);
            if (chats is null)
            {
                return this.NoContent();
            }

            return this.Ok(chats);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> GetUserByIdAsync(int id)
        {
            var user = await _service.GetUserByIdAsync(id);
            if (user is null)
            {
                return this.NotFound($"User with id '{id}' is not found.");
            }

            return this.Ok(_mapper.Map<User, UserResponseModel>(user));
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsersAsync()
        {
            var users = await _service.GetUsersAsync();
            if (users is null)
            {
                return this.NoContent();
            }

            return this.Ok(users.Select(user => _mapper.Map<User, UserResponseModel>(user)));
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUserAsync(User user)
        {
            var newUserId = await _service.CreateUserAsync(user);
            if (newUserId is null)
            {
                return this.BadRequest();
            }

            return this.CreatedAtAction("GetUserById", new { id = newUserId.Id }, user);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateUserAsync(int id, [FromForm] User user, [FromForm] IFormFile image)
        {
            var requestForm = HttpContext.Request.Form;
            if (requestForm.TryGetValue("chats", out StringValues chatsStringValues))
            {
                user.Chats = JsonConvert.DeserializeObject<List<Chat>>(chatsStringValues);
            }

            if (HttpContext.Request.Form.TryGetValue("messages", out StringValues messagesStringValues))
            {
                user.Messages = JsonConvert.DeserializeObject<List<Message>>(messagesStringValues);
            }

            if (user.Id != 0 && id != user.Id)
            {
                return this.BadRequest();
            }

            var result = await _service.UpdateUserAsync(id, user, image);
            if (result is null)
            {
                return this.BadRequest();
            }

            var mapped = _mapper.Map<User, UserResponseModel>(result);
            return this.Ok(_mapper.Map<User, UserResponseModel>(result));
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (id <= 0)
            {
                return this.BadRequest("Invalid id.");
            }

            var result= await this._service.DeleteUserAsync(id);
            if (!result)
            {
                return this.NotFound();
            }

            return this.Ok();
        }
    }
}
