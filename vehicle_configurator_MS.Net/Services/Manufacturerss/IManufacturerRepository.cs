using vehicle_configurator.Models;

namespace vehicle_configurator.Services.Manufacturerss
{
    public interface IManufacturerRepository
    {
        Task<List<Manufacturer>> GetManufacturersBySegmentIdAsync(int segId);

    }
}
