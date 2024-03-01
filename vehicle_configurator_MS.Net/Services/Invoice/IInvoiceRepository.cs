namespace vehicle_configurator.Services.Invoice
{
    public interface IInvoiceRepository
    {
        public Task<Models.Invoice> saveCart(Models.Invoice obj);
        public Task<List<Models.Invoice>> getAllInvoice();
    }
}
