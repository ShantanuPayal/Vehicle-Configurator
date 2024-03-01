namespace vehicle_configurator.Services.Vehicle
{
    public interface IVehicleRepository
    {
        public Task<List<Dictionary<string, object>>> getCompByModelID(long id, String CompType);
        public Task<List<Dictionary<string, object>>> getConfugrableComponents(long id, string isConfigurable);
    }
}
