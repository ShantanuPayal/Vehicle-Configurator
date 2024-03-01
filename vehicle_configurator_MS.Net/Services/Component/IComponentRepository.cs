using vehicle_configurator.Models;

namespace vehicle_configurator.Services.Components
{
    public interface IComponentRepository 
    {
        Task<List<Component>> GetAllComponentsAsync();
        Task<Component> GetComponentByIdAsync(long id);

    }
}