
using MimeKit;
using MailKit.Net.Smtp;
using MySqlX.XDevAPI;
using MailKit.Security;
using System.Threading.Tasks;


namespace FruitsWallahBackend.Services
{
    public class SendEmail(IConfiguration configuration) :ISendEmail
    {
        private readonly IConfiguration _configuration = configuration;

        public async Task<string> SendEmails(string email)
        {
            var otp = OTPS();
            var emails = new MimeMessage();
            var emailSettings = _configuration.GetSection("EmailSettings");
            emails.Sender = MailboxAddress.Parse(emailSettings["From"]);
            emails.To.Add(MailboxAddress.Parse(email));
            emails.Subject = "Otp for Registraion at fruitswallah";
            var builder=new BodyBuilder();
            builder.HtmlBody = $"<h2> This email is for registration at FruitsWallah. Please don't share the otp with anyone.<br/> Your OTP is :{otp}<h2/>" ;
            emails.Body=builder.ToMessageBody();

            var smtpServer = emailSettings["SmtpServer"];
            var port = int.Parse(emailSettings["Port"]);
            var password = emailSettings["Password"];
            using var smptp = new SmtpClient();
            smptp.Connect(smtpServer, port,SecureSocketOptions.StartTls);
            smptp.Authenticate(emailSettings["From"], password);
            await smptp.SendAsync(emails);
            smptp.Disconnect(true);
            return otp;
           
        }

        public string OTPS()
        {
            Random random = new Random();
            string otp = random.Next(0, 1000000).ToString("D6");
            return otp;
        }
    }
}
