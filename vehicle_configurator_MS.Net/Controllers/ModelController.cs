using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using vehicle_configurator.Models;
using vehicle_configurator.Services.Varient; // Adjust namespace as per your project structure

namespace vehicle_configurator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModelController : ControllerBase
    {
        private readonly IModelRepository _modelRepository;

        public ModelController(IModelRepository modelRepository)
        {
            _modelRepository = modelRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Model>>> GetAllModelsAsync()
        {
            try
            {
                var models = await _modelRepository.GetAllModelsAsync();
                return Ok(models);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("manuId={manuId}&segId={segId}")]
        public async Task<ActionResult<List<Model>>> GetAllModelsByManuIdAndSegIdAsync(long segId, long manuId)
        {
            try
            {
                var models = await _modelRepository.GetAllModelsByManuIdAndSegIdAsync(segId, manuId);
                return Ok(models);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Model>> GetModelByIdAsync(long id)
        {
            try
            {
                var model = await _modelRepository.GetModelByIdAsync(id);
                if (model == null)
                {
                    return NotFound($"Model with id {id} not found");
                }
                return Ok(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
