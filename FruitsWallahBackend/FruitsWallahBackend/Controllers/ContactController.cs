using Azure.Core;
using FruitsWallahBackend.Models.DTOModels;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ContactController(IConfiguration config) : ControllerBase
    {
        //private readonly string _PhoneNumber = "916389285501";
        //private readonly string _APPid = "806926842502790";
        //private readonly string _AccessToken = "dZCvxf3rKpbf5TH96ZBSuroioRZB8TyElqxmbsmXNU654z2kneNal9uljg7RUmXgf0FUcfsn7FqBgUVKgZACmpEJx206S1eWMq12lhBULtErd0U11pckVFSVrL11xuYHSeiLi7S6UA6tRXOrUPbtZC6Oh7vBErpBj4ZD";

        //private readonly HttpClient _httpClient;

        //public ContactController(HttpClient httpClient)
        //{
        //    _httpClient = httpClient;
        //}
        private readonly IConfiguration _config = config;

        [HttpPost]
        public async Task<ActionResult> ContactFrom(ContactDTO contact)
        {
            //using var httpClient = new HttpClient();
            //httpClient.DefaultRequestHeaders.Authorization =
            //    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _AccessToken);

            //var payload = new
            //{
            //    messaging_product = "whatsapp",
            //    to = _PhoneNumber, // e.g. "91XXXXXXXXXX"
            //    type = "template",
            //    template = new
            //    {
            //        name = "hello_world",
            //        language = new { code = "en_US" },
            //        body = $"New Contact Form Submission:%0A👤 Name: {contact.Name}%0A📧 Email: {contact.Email}%0A💬 phone: {contact.PhoneNumber} %0A Order No.: {contact.OrderNumber}%0A Subject: {contact.Subject}%0A Description : {contact.Desc}"
            //    }
            //};

            //var response = await httpClient.PostAsJsonAsync(
            //    $"https://graph.facebook.com/v22.0/{_APPid}/messages", payload);

            //string result = await response.Content.ReadAsStringAsync();
            //if (response.IsSuccessStatusCode)
            //{
            //    return Ok(new { success = true, message = "Message sent to WhatsApp!" });
            //}
            //else
            //{
            //    var error = await response.Content.ReadAsStringAsync();
            //    return BadRequest(new { success = false, error });
            //}
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

