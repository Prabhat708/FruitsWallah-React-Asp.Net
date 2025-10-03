using FruitsWallahBackend.Services.Iservices;
using System.Security.Cryptography;
using System.Text;

namespace FruitsWallahBackend.Services
{
    public class Encryption(IConfiguration configuration):IEncryption
    {
        private readonly IConfiguration? _configuration = configuration;
        public string EncryptOTP(string otp)
        {

            var EncySet = _configuration?.GetSection("Encryptions");
            if (EncySet == null)
            {
                return "bad request";
            }
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
