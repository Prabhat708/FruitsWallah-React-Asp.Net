using Azure.Core;
using FruitsWallahBackend.Models.DTOModels;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using FruitsWallahBackend.Services.Iservices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FruitsWallahBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class ContactController(ISendEmail sendEmail) : ControllerBase
    {
       
        private readonly ISendEmail _sendEmail = sendEmail;
        
        [HttpPost]
        public async Task<ActionResult> ContactFrom(ContactDTO contact)
        {
            try
            {
               

                var subject = $"📩 New Contact Form Submission: {contact.Subject}";
                var body = $"<h2><br/>👤 Name: {contact.Name}<br/>📧 Email: {contact.Email}<br/>📞 Phone: {contact.PhoneNumber}<br/>🧾 Order No.: {contact.OrderNumber}<br/>📝 Subject: {contact.Subject}<br/>💬 Message: {contact.Desc}<h2/>";

                await _sendEmail.SendEmails("fruitswallah.in@gmail.com", subject, body);

                return Ok("Message sent successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Failed to send email", error = ex.Message });
            }
        }
            
        }
    }

