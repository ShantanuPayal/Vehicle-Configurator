using Microsoft.EntityFrameworkCore;
using vehicle_configurator.Repository;

namespace vehicle_configurator.Services.Vehicle
{
    public class VehicleRepositoryImpl : IVehicleRepository
    {
        private readonly ScottDbContext _Dbcontext;
        public VehicleRepositoryImpl(ScottDbContext context)
        {
            _Dbcontext = context;
        }
        public async Task<List<Dictionary<string, object>>> getCompByModelID(long id, String CompType)
        {
            return await (
                 from v in _Dbcontext.Set<Models.Vehicle>()
                 join c in _Dbcontext.Set<Models.Component>() on v.CompId equals c.Id
                 where v.ModId == id && v.CompType == CompType
                 select new Dictionary<string, object>
                 {
                    { "Vehicle", v },
                    { "Component", c }
                 }
             ).ToListAsync();
        }

        public async Task<List<Dictionary<string, object>>> getConfugrableComponents(long id, string isConfigurable)
        {
            return await (
                from v in _Dbcontext.Set<Models.Vehicle>()
                join c in _Dbcontext.Set<Models.Component>() on v.CompId equals c.Id
                where v.ModId == id && v.IsConfigurable == isConfigurable
                select new Dictionary<string, object>
                {
                    { "Vehicle", v },
                    { "Component", c }
                }
            ).ToListAsync();
        }
    }
}
