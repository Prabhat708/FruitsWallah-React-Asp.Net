
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
        
        public async Task<string> SendEmails(string email,string otpfor)
        {
            var otp = OTP();
            string subject = $"Otp for {otpfor} at fruitswallah";
            string body = $"<h2> This email is for {otpfor} at FruitsWallah. Please don't share the otp with anyone.<br/> Your OTP is :{otp}<h2/>";
            
            var encryptOtp= EncryptOtp(otp);
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
            return encryptOtp;
           
        }

        public string OTP()
        {
            Random random = new Random();
            string otp = random.Next(0, 1000000).ToString("D6");
            return otp;
        }
       

        public string EncryptOtp(string otp)
        {
        
            var EncySet = _configuration.GetSection("Encryption");
            using var aes = Aes.Create();
            aes.Key = Encoding.UTF8.GetBytes(EncySet["SecretKey"]);
            aes.IV = Encoding.UTF8.GetBytes(EncySet["IV"]);
            var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
            using var ms = new MemoryStream();
            using var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write);
            using (var sw = new StreamWriter(cs))
            {
                sw.Write(otp);
                sw.Flush();       
                cs.FlushFinalBlock(); 
            }
            var EncryptOtp = Convert.ToBase64String(ms.ToArray());
            return EncryptOtp;
        }
    }
}
