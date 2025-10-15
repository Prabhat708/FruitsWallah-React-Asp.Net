using FruitsWallahBackend.Models.DTOModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Razorpay.Api;
using System.Security.Cryptography;
using System.Text;

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

        [HttpPost("verify-payment")]
        public IActionResult VerifyPayment(VerifyData paymentData)
        {
            try
            {
                if (paymentData.Razorpay_order_id != null && paymentData.Razorpay_payment_id != null && paymentData.Razorpay_signature !=null)
                {

                    // Extract fields sent from frontend
                    string razorpayOrderId = paymentData.Razorpay_order_id;
                    string razorpayPaymentId = paymentData.Razorpay_payment_id;
                    string razorpaySignature = paymentData.Razorpay_signature;

                    // Combine order_id and payment_id exactly in this order
                    string payload = $"{razorpayOrderId}|{razorpayPaymentId}";
                    var paymentSettings = _configuration.GetSection("Razorpay");
                    // Generate signature using HMAC SHA256
                    string generatedSignature = GenerateSignature(payload, paymentSettings["Secret"]);

                    
                    if (generatedSignature == razorpaySignature)
                    {
                        
                        return Ok(new
                        {
                            success = true,
                            message = "Payment verified successfully."
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
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Server error during payment verification.",
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
