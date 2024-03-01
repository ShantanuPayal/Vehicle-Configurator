
using vehicle_configurator.Models;

namespace vehicle_config.Repositories
{
    public interface IAlternateComponentRepository
    { 
        Task<List<Dictionary<string, object>>> FindByModelIdAndAlternateCompId(int modId, int altCompId);
        Task<AlternateComponent> FindByModelIdAndCompId(int modId, int compId);
    }
}
