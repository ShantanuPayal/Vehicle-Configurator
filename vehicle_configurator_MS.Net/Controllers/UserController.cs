using Microsoft.AspNetCore.Mvc;
using vehicle_configurator.Models;
using vehicle_configurator.Services.UserRegistration;

namespace vehicle_configurator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUser _userService;

        public UserController(IUser userService)
        {
            _userService = userService;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<int>> GetUserId(string username)
        {
            return await _userService.getUSerId(username);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>?> CreateUser([FromBody]User user)
        {
            try
            {
                var result = await _userService.createUser(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Conflict("Integrity constraint violation occurred");
            }



        }
        [HttpPost("login")]
        public async Task<ActionResult<bool>> ValidateUser([FromBody] User reg)
        {
            var result = await _userService.validateUser(reg);
            return result;
        }
    }
}
