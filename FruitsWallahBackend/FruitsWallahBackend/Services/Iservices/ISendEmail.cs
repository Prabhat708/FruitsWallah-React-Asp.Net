namespace FruitsWallahBackend.Services.Iservices
{
    public interface ISendEmail
    {
        public Task<string> SendEmails(string email, string subject,string body);
    }
}
