using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FruitsWallahBackend.Data;
using FruitsWallahBackend.Models;

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
        [HttpGet("{Email},{Password}")]
        public async Task<ActionResult<UserAuth>> GetUserAuth(string Email,string Password)
        {
            var user = await (from u in _context.Users where u.Email == Email select new {u.UserId}).FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound("No User Found");
            }
            var UserAuth = await (from UA in _context.UsersAuth where UA.UserID== user.UserId select new {UA.HashPassword}).FirstOrDefaultAsync();
            if (MatchPassword(Password, UserAuth.HashPassword))
            {
                return Ok("Login Successfull");
            }
            else
            {
                return BadRequest("Wrong Password");
            }
        }

        private static bool MatchPassword(string Password, string HashedPassword)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(Password, HashedPassword);
        }
    }
}
