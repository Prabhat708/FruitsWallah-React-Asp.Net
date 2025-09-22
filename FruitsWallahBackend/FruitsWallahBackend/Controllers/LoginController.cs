using DocumentFormat.OpenXml.Spreadsheet;
using FruitsWallahBackend.Data;
using FruitsWallahBackend.Models;
using FruitsWallahBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Operations;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Pqc.Crypto.Crystals.Dilithium;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly FruitsWallahDbContext _context;
        private readonly IJwtService _jwtService;

        public LoginController(FruitsWallahDbContext context,IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        // GET: api/Login/
        [HttpGet("{Email}/{Password}")]
        public async Task<ActionResult<UserAuth>> GetUserAuth(string Email,string Password)
        {
            var user = await (from u in _context.Users where u.Email == Email select u).FirstOrDefaultAsync();
            if (user == null)
            {
                return Ok("No User Found");
            }
            var UserAuth = await (from UA in _context.UsersAuth where UA.UserID== user.UserId select new {UA.HashPassword}).FirstOrDefaultAsync();
            if (MatchPassword(Password, HashedPassword: UserAuth.HashPassword))
            {
                var token = _jwtService.GenerateToken(user.UserId, user.Name, user.IsAdmin);
                return Ok(token);
               
            }
            else
            {
                return Ok("Wrong Password");
            }
        }

        //Controller for password change 
        [HttpPut("{UserId},{Password},{newPassword}")]
        public async Task<IActionResult> PutUserAuth(int UserId,string Password,string newPassword)
        {
            var UserAuth = await _context.UsersAuth.FirstOrDefaultAsync(u=>u.UserID==UserId);
            Console.WriteLine(UserAuth.HashPassword);
            if(UserAuth == null)
            {
                return NotFound();
            }
            if (MatchPassword(Password, HashedPassword: UserAuth.HashPassword))
            {
                UserAuth.HashPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(newPassword, 13);

                try
                {
                    await _context.SaveChangesAsync();
                    return Ok("Password Updated");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            else
            {
                return Ok("Password Not Matched");
            }
            
        }

        private static bool MatchPassword(string Password, string HashedPassword)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(Password, HashedPassword);
        }
    }
}
