namespace FruitsWallahBackend.Services
{
    public interface IJwtService
    {
        string GenerateToken(int userId, string userName, bool isAdmin);
    }
}
