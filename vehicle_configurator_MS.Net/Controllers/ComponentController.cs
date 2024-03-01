using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vehicle_configurator.Services.Components;

namespace vehicle_configurator.Controllers
{
    [ApiController]
    [Route("api/components")]
    public class ComponentController : ControllerBase
    {
        private readonly IComponentRepository _componentRepository;

        public ComponentController(IComponentRepository componentRepository)
        {
            _componentRepository = componentRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllComponents()
        {
            try
            {
                var components = await _componentRepository.GetAllComponentsAsync();
                return Ok(components);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetComponentById(long id)
        {
            try
            {
                var component = await _componentRepository.GetComponentByIdAsync(id);
                if (component == null)
                {
                    return NotFound();
                }
                return Ok(component);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}