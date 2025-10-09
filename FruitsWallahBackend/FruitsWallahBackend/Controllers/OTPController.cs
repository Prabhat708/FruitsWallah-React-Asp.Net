using FruitsWallahBackend.Data;
using FruitsWallahBackend.Services.Iservices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OTPController(ISendEmail sendEmail, FruitsWallahDbContext context, IEncryption encryption) : ControllerBase

    {
        public readonly ISendEmail sendEmail = sendEmail;
        private readonly FruitsWallahDbContext _context = context;
        private readonly IEncryption encryption = encryption;

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
                if (userEmail.IsDeleted)
                {
                    return BadRequest("Your Accound Deleted Prevoiusly Please SignUp with diffrent email");
                }
                return BadRequest("User Alredy Exists. Please! Login");
            }
            var otp = OTP();
            var subject = "OTP for Registration at fruitsWallah";
            var body = $"<h2> This email is for Registration at FruitsWallah. Please don't share the otp with anyone.<br/> Your OTP is :{otp}<h2/>";
            try
            {
                await sendEmail.SendEmails(Email.Email, subject,body);
                var encryptedOtp= encryption.EncryptOTP(otp);
                return Ok(encryptedOtp);
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
            var otp = OTP();
            var subject = "OTP for Reset Password at fruitsWallah";
            var body = $"<h2> This email is for Reset Password at FruitsWallah. Please don't share the otp with anyone.<br/> Your OTP is :{otp}<h2/>";
            try
            {
                await sendEmail.SendEmails(Email.Email, subject, body);
                var encryptedOtp = encryption.EncryptOTP(otp);
                return Ok(encryptedOtp);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        private string OTP()
        {
            Random random = new Random();
            string otp = random.Next(0, 1000000).ToString("D6");
            return otp;
        }
    }
    public class OtpGen
    {
        public string? Email { get; set; }
    }


}
