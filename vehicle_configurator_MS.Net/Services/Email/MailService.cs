// MailService.cs

using vehicle_configurator.Services;
using vehicle_configurator.Models;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace vehicle_configurator.Services
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;

        public MailService(IOptions<MailSettings> mailsettings)
        {
            _mailSettings = mailsettings.Value;
        }

        public async Task SendEmailAsync(MailRequest mailrequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            email.To.Add(MailboxAddress.Parse(mailrequest.ToEmail)) ;

            // Use the same format for subject and body
           var content = "vehicle_configurator";

            email.Subject = content;

            var builder = new BodyBuilder();
            if (mailrequest.Attachments != null)
            {
                byte[] filebytes;
                foreach (var file in mailrequest.Attachments)
                {
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            await file.CopyToAsync(ms);
                            filebytes = ms.ToArray();
                        }
                        builder.Attachments.Add(file.Name, filebytes, ContentType.Parse(file.ContentType));
                    }
                }
            }

            // Include  the user's message
            builder.HtmlBody = $" Enquiry Of: {mailrequest.Body}";

            email.Body = builder.ToMessageBody();

            using (var smtp = new SmtpClient())
            {
                try
                {
                    await smtp.ConnectAsync(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
                    await smtp.AuthenticateAsync(_mailSettings.Mail, _mailSettings.Password);
                    await smtp.SendAsync(email);
                }
                catch (Exception ex)
                {
                    
                    throw ex;
                }
                finally
                {
                    await smtp.DisconnectAsync(true);
                }
            }
        }
    }
}
