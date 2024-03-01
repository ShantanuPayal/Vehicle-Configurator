using Microsoft.AspNetCore.Mvc;
using vehicle_config.Repositories;
using System;
using System.Threading.Tasks;

namespace vehicle_config.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class AlternateComponentController : ControllerBase
    {
        private readonly IAlternateComponentRepository alternateComponentRepository;

        public AlternateComponentController(IAlternateComponentRepository service)
        {
            alternateComponentRepository = service;
        }

        [HttpGet("{modId}/{altcompId}")]
        public async Task<IActionResult> ShowStdComponents(int modId, int altcompId)
        {
            try
            {
                var alternateComponents = await alternateComponentRepository.FindByModelIdAndAlternateCompId(modId, altcompId);
                return Ok(alternateComponents);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet("alt/{modId}/{compId}")]
        public async Task<IActionResult> ShowAltenatedComponents(int modId, int compId)
        {
            try
            {
                var alternateComponent = await alternateComponentRepository.FindByModelIdAndCompId(modId, compId);
                return Ok(alternateComponent);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
