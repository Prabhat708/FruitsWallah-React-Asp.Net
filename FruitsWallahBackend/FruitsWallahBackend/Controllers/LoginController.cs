using DocumentFormat.OpenXml.Spreadsheet;
using FruitsWallahBackend.Data;
using FruitsWallahBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly FruitsWallahDbContext _context;

        public LoginController(FruitsWallahDbContext context)
        {
            _context = context;
        }

        // GET: api/Login/
        [HttpGet("{Email}/{Password}")]
        public async Task<ActionResult<UserAuth>> GetUserAuth(string Email,string Password)
        {
            Console.WriteLine("Backend Working"+Email+" "+ Password);
            var user = await (from u in _context.Users where u.Email == Email select u).FirstOrDefaultAsync();
            if (user == null)
            {
                return Ok("No User Found");
            }
            var UserAuth = await (from UA in _context.UsersAuth where UA.UserID== user.UserId select new {UA.HashPassword}).FirstOrDefaultAsync();
            if (MatchPassword(Password, HashedPassword: UserAuth.HashPassword))
            {
                return Ok(new
                {
                    user.UserId,
                    user.Name,
                    user.Email,
                    user.PhoneNumber,
                    user.IsAdmin,
                });
            }
            else
            {
                return Ok("Wrong Password");
            }
        }

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
