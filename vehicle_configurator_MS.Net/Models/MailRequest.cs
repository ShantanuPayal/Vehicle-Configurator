// MailRequest.cs

namespace vehicle_configurator.Models
{
    public class MailRequest
    {
        public string ToEmail { get; set; }
       // public string Name { get; set; }
       // public string Email { get; set; }
       
        public string Body { get; set; }
        public List<IFormFile>? Attachments { get; set; }
    }
}
