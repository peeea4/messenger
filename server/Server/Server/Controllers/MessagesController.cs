using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("/messages")]
    public class MessagesController : ControllerBase
    {
        private readonly MessagesService _service;

        public MessagesController(MessagesService service)
        {
            _service = service;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Chat>> GetMessageByIdAsync(int id)
        {
            var message = await this._service.GetMessageByIdAsync(id);
            return message is null 
                ? this.NotFound() 
                : this.Ok(message);
        }

        [HttpGet]
        public async Task<ActionResult<List<Chat>>> GetMessagesAsync()
        {
            var messages = await this._service.GetMessagesAsync();
            return messages is null
                ? this.NoContent()
                : this.Ok(messages);
        }
        
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateMessageAsync(int id, Message message)
        {
            if (message.Id != 0 && id != message.Id)
            {
                return this.BadRequest();
            }

            var result = await _service.UpdateMessageAsync(id, message);
            if (result is null)
            {
                return this.BadRequest();
            }

            return this.Ok(result);
        }
        
        [HttpPost]
        public async Task<ActionResult<Message>> CreateMessageAsync(Message message)
        {
            var newMessageId = await _service.CreateMessageAsync(message);
            if (newMessageId is null)
            {
                return this.BadRequest();
            }

            return this.CreatedAtAction("GetMessageById", new { id = newMessageId }, message);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            if (id <= 0)
            {
                return this.BadRequest("Invalid id.");

            }

            var result= await this._service.DeleteMessageAsync(id);
            if (!result)
            {
                return this.NotFound();
            }

            return this.Ok();
        }
    }
}