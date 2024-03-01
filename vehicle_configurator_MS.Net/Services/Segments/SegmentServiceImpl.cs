//using Dothenet_Project.DbRepos;
using System;
using Microsoft.EntityFrameworkCore;
//using VCA.Models;
//using Dothenet_Project.Repositories;
using vehicle_configurator.Models;
using vehicle_configurator.Repository;
using vehicle_configurator.Services.Segments;

namespace vehicle_configurator.Services.Segments
{
    public class SegmentServiceImpl : ISegmentService
    {
        private readonly ScottDbContext _context;// DI

        public SegmentServiceImpl(ScottDbContext context)
        {
            _context = context;
        }


        public async Task<List<Segment>> GetAllSegments()
        {
            return await  _context.Segments.ToListAsync();
        }

    }
}