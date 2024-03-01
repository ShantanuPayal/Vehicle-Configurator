using Microsoft.AspNetCore.Mvc;
using vehicle_configurator.Models;


namespace vehicle_configurator.Services.UserRegistration
{
    public interface IUser
    {
        Task<ActionResult<User>?> createUser(User user);
        Task<ActionResult<Boolean>> validateUser(User user);
        Task<ActionResult<int> > getUSerId(String username); 
        
    }
}