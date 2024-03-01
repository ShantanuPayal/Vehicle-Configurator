using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vehicle_configurator.Models;
using vehicle_configurator.Services.Invoice;
using vehicle_configurator.Services.Vehicle;

namespace vehicle_configurator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceRepository _invoiceRepository;
        public InvoiceController(IInvoiceRepository invoiceRepository)
        {
            this._invoiceRepository = invoiceRepository;
        }
        [HttpPost("/")]
        public async Task<IActionResult> AddToCart([FromBody] Invoice c)
        {
            try
            {
                await _invoiceRepository.saveCart(c);
                return Ok();
            }
            catch (Exception e)
            {
               // Console.WriteLine(e);
                return BadRequest(e);
            }
        }

        [HttpGet("/")]
        public async Task<IActionResult> GetAllInvoice()
        {
            try
            {
                var invoices = await _invoiceRepository.getAllInvoice();
                return Ok(invoices);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest();
            }
        }
    }
}
