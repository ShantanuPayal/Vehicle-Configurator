using vehicle_configurator.Models;
using vehicle_configurator.Repository;
using Microsoft.EntityFrameworkCore;
using System;




namespace vehicle_configurator.Services.Manufacturerss
{
    public class ManufacturerRepository : IManufacturerRepository
    {
        private readonly ScottDbContext _dbContext;

        public ManufacturerRepository(ScottDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Manufacturer>> GetManufacturersBySegmentIdAsync(int segId)
        {
            return await _dbContext.Manufacturers
                .Where(m => m.SegId == segId)
                .ToListAsync();
        }
    }
}
