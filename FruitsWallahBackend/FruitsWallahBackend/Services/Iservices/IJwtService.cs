namespace FruitsWallahBackend.Services.Iservices
{
    public interface IJwtService
    {
        string GenerateToken(int userId, string userName, bool isAdmin,bool isActive);
    }
}
