namespace FruitsWallahBackend.Services
{
    public interface ISendEmail
    {
        public Task<string> SendEmails(string email, string otpfor);
    }
}
