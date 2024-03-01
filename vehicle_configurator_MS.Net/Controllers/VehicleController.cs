using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vehicle_config.Repositories;
using vehicle_configurator.Services.Vehicle;

namespace vehicle_configurator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleRepository _vehicleRepository;
        public VehicleController(IVehicleRepository vehicleRepository) 
        {
            this._vehicleRepository= vehicleRepository;
        }
        [HttpGet("components/{modelId}/{compType}")]
        public async Task<IActionResult> FindCompByModelId(long modelId, String compType)
        {
            try
            {
                var components = await _vehicleRepository.getCompByModelID(modelId, compType);
                return Ok(components);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet("configurable/{modelId}/{isConfigurable}")]
        public async Task<IActionResult> FindConfigurableComponents(long modelId, string isConfigurable)
        {
            try
            {
                var components = await _vehicleRepository.getConfugrableComponents(modelId, isConfigurable);
                return Ok(components);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}

