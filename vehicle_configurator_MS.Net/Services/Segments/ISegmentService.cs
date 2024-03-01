using vehicle_configurator.Models;
//using vehicle_configurator.DbRepos;

namespace vehicle_configurator.Services.Segments
{
    public interface ISegmentService
    {
       Task<List<Segment>> GetAllSegments();
    }
}