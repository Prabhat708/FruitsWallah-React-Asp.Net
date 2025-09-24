using FruitsWallahBackend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FruitsWallahBackend.Services
{
    public class JwtService(IConfiguration configuration) : IJwtService
    {
        private readonly IConfiguration _configuration = configuration;

        public string GenerateToken(int userId, string userName, bool isAdmin)
        {
            var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["JwtSettings:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("UserId",userId.ToString()),
                    new Claim("UserName",userName),
                    new Claim("isAdmin",isAdmin.ToString()),
                    new Claim(ClaimTypes.Role,isAdmin?"Admin":"User")
                };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256); 
            var token = new JwtSecurityToken(
                _configuration["JwtSettings:Issuer"],
                _configuration["JwtSettings:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(14400),
                signingCredentials: signIn
                );
             return new JwtSecurityTokenHandler().WriteToken(token);
            
        }
    }
}
