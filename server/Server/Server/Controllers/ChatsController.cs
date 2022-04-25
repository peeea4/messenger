using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("/chats")]
    public class ChatsController : ControllerBase
    {
        private readonly ChatsService _service;

        public ChatsController(ChatsService service)
        {
            _service = service;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Chat>> GetChatByIdAsync(int id)
        {
            var chat = await this._service.GetChatByIdAsync(id);
            return chat is null 
                ? this.NotFound($"Chat with id `{id}` is not found.") 
                : this.Ok(chat);
        }

        [HttpGet("{id:int}/messages")]
        public async Task<ActionResult<List<Message>>> GetChatMessagesAsync(int id)
        {
            var chatMessages = await this._service.GetChatMessagesAsync(id);
            return chatMessages is null
                ? this.NoContent()
                : this.Ok(chatMessages);
        }

        [HttpGet]
        public async Task<ActionResult<List<Chat>>> GetChatsAsync()
        {
            var chats = await this._service.GetChatsAsync();
            return chats is null
                ? this.NoContent()
                : this.Ok(chats);
        }
        
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateChatAsync(int id, Chat chat)
        {
            if (chat.Id != 0 && id != chat.Id)
            {
                return this.BadRequest();
            }

            var result = await _service.UpdateChatAsync(id, chat);
            if (result is null)
            {
                return this.BadRequest();
            }

            return this.Ok(result);
        }
        
        [HttpPost]
        public async Task<ActionResult<User>> CreateChatAsync(Chat chat)
        {
            var newChatId = await _service.CreateChatAsync(chat);
            if (newChatId <= 0)
            {
                return this.BadRequest();
            }

            return this.CreatedAtAction("GetChatById", new { id = newChatId }, chat);
        }

        
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteChat(int id)
        {
            if (id <= 0)
            {
                return this.BadRequest("Invalid id.");

            }

            var result= await this._service.DeleteChatAsync(id);
            if (!result)
            {
                return this.NotFound();
            }

            return this.Ok();
        }

        [HttpPatch("{chatId:int}")]
        public async Task<IActionResult> AddMessagesToChat(int chatId, List<Message> messages)
        {
            var result = await this._service.AddMessagesToChat(chatId, messages);
            if (!result)
            {
                return this.Problem("Error occurred while saving.");
            }

            return this.Ok();
        }
    }
}
