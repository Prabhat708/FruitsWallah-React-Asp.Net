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
                return Ok(await sendEmail.SendEmails(Email.Email, "Registraion"));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("forgetPassword")]
        public async Task<IActionResult> ValidateUser(OtpGen Email)
        {
            if (Email.Email == null)
            {
                return BadRequest("Email Required");
            }
            var user= await _context.Users.FirstOrDefaultAsync(u => u.Email == Email.Email);
            if (user == null)
            {
                return BadRequest("No User Found With this mail");
            }
            try
            {
                var encryptotp = await sendEmail.SendEmails(Email.Email,"Reset Password");
                if (encryptotp == null)
                {
                    return BadRequest("encrypted otp is null");
                }
              
                return Ok(encryptotp);
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
