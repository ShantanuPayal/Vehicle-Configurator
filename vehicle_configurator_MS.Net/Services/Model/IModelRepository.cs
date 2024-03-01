using Microsoft.AspNetCore.Mvc;

using vehicle_configurator.Models;
namespace vehicle_configurator.Services.Varient
{
    public interface IModelRepository
    {
        Task <List<Model>> GetAllModelsByManuIdAndSegIdAsync(long segId, long manuId);
        Task<List<Model>> GetAllModelsAsync();
        Task <Model> GetModelByIdAsync(long id);
    }
}
