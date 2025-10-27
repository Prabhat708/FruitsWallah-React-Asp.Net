using FruitsWallahBackend.Models.DTOModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController(IConfiguration configuration) : ControllerBase
    {
        private readonly IConfiguration _configuration = configuration;

        [Authorize]
        [HttpPost("create-order")]
        public async Task<ActionResult<PaymentDTO>> PostPayment(PaymentDTO request)

        {
            var paymentSettings = _configuration.GetSection("Razorpay");
            var result = await Task.Run(() =>
            {
                RazorpayClient client = new(paymentSettings["Key"], paymentSettings["Secret"]);
                Dictionary<string, object> options = new()
                {
                    { "amount", request.Amount*100 },  // in paise
                    { "currency", "INR" },
                    { "receipt", Guid.NewGuid().ToString() },
                    { "payment_capture", 1 } // auto capture
                };
                Order order = client.Order.Create(options);
                var orderId = order.Attributes["id"].ToString();
                var amount = Convert.ToInt32(order.Attributes["amount"]);
                var currency = order.Attributes["currency"].ToString();
                return new
                {
                    orderId,
                    amount,
                    currency
                };
            });
            return Ok(result);
        }
        [Authorize]
        [HttpPost("verify-payment")]
        public async Task<IActionResult> VerifyPayment([FromBody] VerifyData paymentData)
        {
            try
            {
                if (paymentData.Razorpay_order_id != null &&
                    paymentData.Razorpay_payment_id != null &&
                    paymentData.Razorpay_signature != null)
                {
                    string razorpayOrderId = paymentData.Razorpay_order_id;
                    string razorpayPaymentId = paymentData.Razorpay_payment_id;
                    string razorpaySignature = paymentData.Razorpay_signature;

                    string payload = $"{razorpayOrderId}|{razorpayPaymentId}";
                    var paymentSettings = _configuration.GetSection("Razorpay");

                    string generatedSignature = GenerateSignature(payload, paymentSettings["Secret"]);

                    if (generatedSignature == razorpaySignature)
                    {

                        using var client = new HttpClient();
                        var authToken = Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{paymentSettings["Key"]}:{paymentSettings["Secret"]}"));
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authToken);

                        var response = await client.GetAsync($"https://api.razorpay.com/v1/payments/{razorpayPaymentId}");
                        response.EnsureSuccessStatusCode();

                        var json = await response.Content.ReadAsStringAsync();
                        using JsonDocument doc = JsonDocument.Parse(json);
                        var root = doc.RootElement;
                        string method = root.GetProperty("method").GetString();
                        Console.WriteLine($"Payment Method: {method}");



                        return Ok(new
                        {
                            success = true,
                            message = "Payment verified successfully.",
                            method
                        });
                    }
                    else
                    {
                        return BadRequest(new
                        {
                            success = false,
                            message = "Invalid signature. Payment verification failed."
                        });
                    }
                }
                else
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Missing required payment data."
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("❌ Error in VerifyPayment: " + ex.Message);
                return StatusCode(500, new
                {
                    success = false,
                    message = "Internal server error",
                    error = ex.Message
                });
            }
        }

        private static string GenerateSignature(string payload, string secret)
        {
            byte[] secretBytes = Encoding.UTF8.GetBytes(secret);
            using var hmac = new HMACSHA256(secretBytes);
            byte[] payloadBytes = Encoding.UTF8.GetBytes(payload);
            byte[] hash = hmac.ComputeHash(payloadBytes);
            return BitConverter.ToString(hash).Replace("-", "").ToLower();
        }
        public class VerifyData
        {
            public string? Razorpay_order_id { get; set; }
            public string? Razorpay_payment_id { get; set; }
            public string? Razorpay_signature { get; set; }

        }
    }
}
