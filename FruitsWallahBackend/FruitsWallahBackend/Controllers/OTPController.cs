using FruitsWallahBackend.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OTPController : ControllerBase

    {
        public readonly ISendEmail sendEmail;
        public OTPController(ISendEmail sendEmail)
        {
            this.sendEmail = sendEmail;
        }
        [HttpPost]
        public async Task<IActionResult> SendOTP(OtpGen Email)
        {
            if (Email.email == null)
            {
                return BadRequest("Email Required");
            }
            var OTP = await sendEmail.SendEmails(Email.email);

            return Ok(OTP);
        }
    }
    public class OtpGen
    {
        public string email { get; set; }
    }
}
