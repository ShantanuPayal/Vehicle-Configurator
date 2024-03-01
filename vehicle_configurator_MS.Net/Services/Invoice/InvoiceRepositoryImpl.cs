using Microsoft.EntityFrameworkCore;
using vehicle_configurator.Repository;

namespace vehicle_configurator.Services.Invoice
{
    public class InvoiceRepositoryImpl : IInvoiceRepository
    {
        private readonly ScottDbContext _DbContext;
         public InvoiceRepositoryImpl(ScottDbContext DbContext)
        {
            _DbContext = DbContext;
        }
        public async Task<List<Models.Invoice>> getAllInvoice()
        {
            return await _DbContext.Invoices.ToListAsync();
        }

        public async Task<Models.Invoice> saveCart(Models.Invoice obj)
        {
            _DbContext.Invoices.Add(obj);
            await _DbContext.SaveChangesAsync();
            return obj;
        }
    }
}
