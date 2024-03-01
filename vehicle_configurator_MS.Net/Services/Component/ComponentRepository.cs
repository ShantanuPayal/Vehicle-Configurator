using Microsoft.EntityFrameworkCore;
using vehicle_configurator.Models;
using vehicle_configurator.Repository;

namespace vehicle_configurator.Services.Components
{
    public class ComponentRepository : IComponentRepository
    {
        private readonly ScottDbContext _dbContext;

        public ComponentRepository(ScottDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Models.Component>> GetAllComponentsAsync()
        {
            return await _dbContext.Components.ToListAsync();
        }

        public async  Task<Component> GetComponentByIdAsync(long id)
        {
            return await _dbContext.Components.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
