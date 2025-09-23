using Azure.Core;
using FruitsWallahBackend.Models.DTOModels;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FruitsWallahBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class ContactController(IConfiguration config) : ControllerBase
    {
        
        private readonly IConfiguration _config = config;
        
        [HttpPost]
        public async Task<ActionResult> ContactFrom(ContactDTO contact)
        {
            try
            {
                var emailSettings = _config.GetSection("EmailSettings");
                var from = emailSettings["From"];
                var smtpServer = emailSettings["SmtpServer"];
                var port = int.Parse(emailSettings["Port"]);
                var username = emailSettings["Username"];
                var password = emailSettings["Password"];

                var subject = $"📩 New Contact Form Submission: {contact.Subject}";
                var body = $@"
                👤 Name: {contact.Name}
                📧 Email: {contact.Email}
                📞 Phone: {contact.PhoneNumber}
                🧾 Order No.: {contact.OrderNumber}
                📝 Subject: {contact.Subject}
                💬 Message: {contact.Desc}";

                var smtp = new SmtpClient(smtpServer, port)
                {
                    Credentials = new NetworkCredential(username, password),
                    EnableSsl = true
                };

                smtp.Send(from, from, subject, body);

                return Ok("Message sent successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to send email", error = ex.Message });
            }
        }
            
        }
    }

