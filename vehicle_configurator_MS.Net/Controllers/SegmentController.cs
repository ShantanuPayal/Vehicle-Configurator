using Microsoft.AspNetCore.Mvc;
using vehicle_configurator.Services.Segments;

namespace vehicle_configurator.Controllers
{
    [ApiController]
    [Route("api")]
    public class SegmentController : ControllerBase
    {
        private readonly ISegmentService _segmentService;

        public SegmentController(ISegmentService segmentService)
        {
            _segmentService = segmentService;
        }

        [HttpGet("segments")]
        public async Task<IActionResult> GetAllSegments()
        {
            try
            {
                var data = _segmentService.GetAllSegments();
                return Ok(new
                {
                    message = "Segments retrieved successfully",
                    data
                });
            }
            catch (Exception e)
            {
                return BadRequest(new
                {
                    message = e.Message,
                    data = (object)null
                } as object);
            }

        }
    }
}