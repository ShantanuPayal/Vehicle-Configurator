// SendMailController.cs

using vehicle_configurator.Services;
using vehicle_configurator.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace vehicle_configurator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendMailController : ControllerBase
    {
        private readonly IMailService _mailService;

        public SendMailController(IMailService mailService)
        {
            _mailService = mailService;
        }


        [HttpPost]
        public async Task<IActionResult> SendEmail([FromForm] MailRequest request)
        {
            try
            {
                await _mailService.SendEmailAsync(request);
                return Ok("Sent Successfully");
            }
            catch (Exception ex)
            {
                // Handle exception appropriately (log, return error response, etc.)
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
