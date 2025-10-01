
using System;
using System.IO;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MySqlX.XDevAPI;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;


namespace FruitsWallahBackend.Services
{
    public class SendEmail(IConfiguration configuration) :ISendEmail
    {
        private readonly IConfiguration _configuration = configuration;
        
        public async Task<string> SendEmails(string email,string subject, string body)
        {
           
            var emails = new MimeMessage();
            var emailSettings = _configuration.GetSection("EmailSettings");
            emails.Sender = MailboxAddress.Parse(emailSettings["From"]);
            emails.To.Add(MailboxAddress.Parse(email));
            emails.Subject = subject;
            var builder=new BodyBuilder();
            builder.HtmlBody = body ;
            emails.Body=builder.ToMessageBody();

            var smtpServer = emailSettings["SmtpServer"];
            var port = int.Parse(emailSettings["Port"]);
            var password = emailSettings["Password"];
            using var smptp = new SmtpClient();
            smptp.Connect(smtpServer, port,SecureSocketOptions.StartTls);
            smptp.Authenticate(emailSettings["From"], password);
            await smptp.SendAsync(emails);
            smptp.Disconnect(true);
            return "success";
           
        }
        
    }
}
