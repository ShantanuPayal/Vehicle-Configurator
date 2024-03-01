using vehicle_configurator.Models;

namespace vehicle_configurator.Services 
{
    public interface IMailService
    {
        public Task SendEmailAsync(MailRequest mailrequest);
    }
}
