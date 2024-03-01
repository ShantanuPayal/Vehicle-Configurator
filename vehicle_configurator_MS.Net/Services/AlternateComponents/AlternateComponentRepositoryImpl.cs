using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vehicle_configurator.Models;
using vehicle_configurator.Repository;

namespace vehicle_config.Repositories
{
    public class AlternateComponentRepositoryImpl : IAlternateComponentRepository
    {
        private readonly ScottDbContext _Dbcontext;

        public AlternateComponentRepositoryImpl(ScottDbContext context)
        {
            _Dbcontext = context;
        }

        public async Task<List<Dictionary<string, object>>> FindByModelIdAndAlternateCompId(int modId, int altCompId)
        {
            var data = await (
                from ac in _Dbcontext.AlternateComponents
                join c in _Dbcontext.Components on ac.CompId equals c.Id
                where ac.ModId == modId && ac.AltCompId == altCompId
                select new Dictionary<string, object>
                {
                    { "Id", ac.Id },
                    { "CompName", c.CompName },
                    { "DeltaPrice", ac.DeltaPrice },
                    { "CompId",ac.CompId}
                }
            ).ToListAsync();

            return data;
        }

        public async Task<AlternateComponent> FindByModelIdAndCompId(int modId, int compId)
        {
            var component = await _Dbcontext.AlternateComponents
                .Where(ac => ac.ModId == modId && ac.CompId == compId)
                .FirstOrDefaultAsync();

            return component;
        }
    }
}

