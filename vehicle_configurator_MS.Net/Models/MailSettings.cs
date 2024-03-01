using Org.BouncyCastle.Utilities;

namespace vehicle_configurator.Models
{
    public class MailSettings
    {
        public string Mail { get; set; }
        //public string DisplayName { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port {  get; set; }
        
        public string FixedEmail { get; set; }

    }
}
