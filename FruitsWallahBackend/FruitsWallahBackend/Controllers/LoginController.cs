using DocumentFormat.OpenXml.Spreadsheet;
using FruitsWallahBackend.Data;
using FruitsWallahBackend.Models;
using FruitsWallahBackend.Services.Iservices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Operations;
using Microsoft.EntityFrameworkCore;


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

        
        [HttpPost]
        public async Task<ActionResult<UserAuth>> GetUserAuth(LoginDTO loginDTO)
        {
            var user = await (from u in _context.Users where u.Email == loginDTO.Email select u).FirstOrDefaultAsync();
            if (user == null)
            {
                return BadRequest("No User Found");
            }
            var UserAuth = await (from UA in _context.UsersAuth where UA.UserID== user.UserId select new {UA.HashPassword}).FirstOrDefaultAsync();
            if (MatchPassword(loginDTO.Password, HashedPassword: UserAuth?.HashPassword))
            {
                var token = _jwtService.GenerateToken(user.UserId, user.Name, user.IsAdmin);
                return Ok(token);
               
            }
            else
            {
                return BadRequest("Wrong Password");
            }
        }

        //Controller for password change 
        [Authorize]
        [HttpPut("{UserId},{Password},{newPassword}")]
        public async Task<IActionResult> PutUserAuth(int UserId,string Password,string newPassword)
        {
            var UserAuth = await _context.UsersAuth.FirstOrDefaultAsync(u=>u.UserID==UserId);
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

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ResetPassword(ResetData resetData)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == resetData.Email);
            if (user == null)
            {
                return BadRequest("No user Found");
            }
            var UserAuth = await _context.UsersAuth.FirstOrDefaultAsync(u => u.UserID == user.UserId);
            if (UserAuth == null)
            {
                return NotFound();
            }
            UserAuth.HashPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(resetData.Password, 13);
            try
            {
                await _context.SaveChangesAsync();

                return Ok("Password Reset successfully now you can login");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }

        public class ResetData
        {
            public string? Email { get; set; }
            public string? Password { get; set; }
        }
        private static bool MatchPassword(string Password, string HashedPassword)
        {
            return BCrypt.Net.BCrypt.EnhancedVerify(Password, HashedPassword);
        }

        public class LoginDTO
        {
            public string? Email { get; set; }
            public string? Password { get; set; }
        }
    }
}
