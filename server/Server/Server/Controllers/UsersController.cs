using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("/users")]
    public class UsersController : ControllerBase
    {
        private readonly UsersService _service;

        public UsersController(UsersService service)
        {
            _service = service;
        }

        [HttpGet("{id:int}/chats")]
        public async Task<ActionResult<List<Chat>>> GetUserChats(int id)
        {
            var t = ControllerContext.HttpContext.Connection.Id;
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

            return this.Ok(user);
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsersAsync()
        {
            var users = await _service.GetUsersAsync();
            if (users is null)
            {
                return this.NoContent();
            }

            return this.Ok(users);
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUserAsync(User user)
        {
            var newUserId = await _service.CreateUserAsync(user);
            if (newUserId <= 0)
            {
                return this.BadRequest();
            }

            return this.CreatedAtAction("GetUserById", new { id = newUserId }, user);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateUserAsync(int id, User user)
        {
            if (user.Id != 0 && id != user.Id)
            {
                return this.BadRequest();
            }

            var result = await _service.UpdateUserAsync(id, user);
            if (result is null)
            {
                return this.BadRequest();
            }

            return this.Ok(result);
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
