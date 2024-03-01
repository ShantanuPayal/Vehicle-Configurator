using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vehicle_configurator.Models;
using vehicle_configurator.Repository;

namespace vehicle_configurator.Services.Varient
{
    public class ModelRepositoryImpl : IModelRepository
    {
        private readonly ScottDbContext _dbContext;

        public ModelRepositoryImpl(ScottDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Model>>GetAllModelsAsync()
        {
            // Using LINQ query to retrieve all models asynchronously
        return await Task.Run(() =>
        {
            return _dbContext.Models.ToList();
        });
        }

        public async Task<List<Model>>GetAllModelsByManuIdAndSegIdAsync(long segId, long manuId)
        {
            // Using LINQ query to retrieve models based on segment id and manufacturer id asynchronously
            return await _dbContext.Models
                .Where(m => m.SegId == segId && m.ManuId == manuId)
                .ToListAsync();
        }

        public async Task<Model> GetModelByIdAsync(long id)
        {
            // Assuming you have a DbSet<Model> in your AppDbContext called "Models"
            // You can use Entity Framework's FindAsync method to retrieve a model by its ID
            var model = await _dbContext.Models.FindAsync(id);

            return model;
        }
    }
}
