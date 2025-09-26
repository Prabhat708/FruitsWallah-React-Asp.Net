using FruitsWallahBackend.Data;
using FruitsWallahBackend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OTPController : ControllerBase

    {
        public readonly ISendEmail sendEmail;
        private readonly FruitsWallahDbContext _context;
        public OTPController(ISendEmail sendEmail, FruitsWallahDbContext context)
        {
            this.sendEmail = sendEmail;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SendOTP(OtpGen Email)
        {
            if (Email.Email == null)
            {
                return BadRequest("Email Required");
            }
            var userEmail = await _context.Users.FirstOrDefaultAsync(u => u.Email == Email.Email);
            if (userEmail != null)
            {
                return BadRequest("User Alredy Exists. Please! Login");
            }
            try
            {
                return Ok(await sendEmail.SendEmails(Email.Email));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
    public class OtpGen
    {
        public string? Email { get; set; }
    }
}
