using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vehicle_configurator.Models;
using vehicle_configurator.Repository;

namespace vehicle_configurator.Services.UserRegistration
{


    public class UserRepositoryImpl : IUser
    {
        private readonly ScottDbContext _dbContext;

        public UserRepositoryImpl(ScottDbContext dbContext)
        {
            _dbContext = dbContext;
        }

       public async Task<ActionResult<User>?> createUser(User user)
        {
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            return (user);
        }

       

        

        public  async Task<ActionResult<int>> getUSerId(string username)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user != null)
            {
                return user.Userid;
            }
            return 0;
        }

        public async Task<ActionResult<bool>> validateUser(User user)
        {
            var existingUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == user.Username && u.Password == user.Password);

            if (existingUser != null)
            {
                return true;
            }

            return false;
        }
    }
}