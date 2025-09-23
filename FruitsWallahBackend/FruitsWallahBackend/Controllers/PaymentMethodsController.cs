using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FruitsWallahBackend.Data;
using FruitsWallahBackend.Models;
using Microsoft.AspNetCore.Authorization;

namespace FruitsWallahBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentMethodsController : ControllerBase
    {
        private readonly FruitsWallahDbContext _context;

        public PaymentMethodsController(FruitsWallahDbContext context)
        {
            _context = context;
        }

        // GET: api/PaymentMethods
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentMethod>>> GetPaymentMethods()
        {
            var payment= await _context.PaymentMethods.ToListAsync();
            return Ok(payment);
        }

        // GET: api/PaymentMethods/5
        [HttpGet("{UserId}")]
        public async Task<ActionResult<PaymentMethod>> GetPaymentMethod(int UserId)
        {
       
            var paymentMethod = await _context.PaymentMethods.FirstOrDefaultAsync(p=>p.UserId==UserId);

            if (paymentMethod == null)
            {
                return Ok();
            }

            return paymentMethod;
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentMethod(int id, PaymentMethod paymentMethod)
        {
            if (id != paymentMethod.PaymentMethodId)
            {
                return BadRequest();
            }

            _context.Entry(paymentMethod).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentMethodExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PaymentMethods
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PaymentMethod>> PostPaymentMethod(PaymentMethod paymentMethod)
        {
            var PaymentMethod= await _context.PaymentMethods.FirstOrDefaultAsync(m=>m.UserId== paymentMethod.UserId);
            if (PaymentMethod != null)
            {
                _context.PaymentMethods.Remove(PaymentMethod);
            }
            _context.PaymentMethods.Add(paymentMethod);
            await _context.SaveChangesAsync();

            return Ok("");
        }

        // DELETE: api/PaymentMethods/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentMethod(int id)
        {
            var paymentMethod = await _context.PaymentMethods.FindAsync(id);
            if (paymentMethod == null)
            {
                return NotFound();
            }

            _context.PaymentMethods.Remove(paymentMethod);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaymentMethodExists(int id)
        {
            return _context.PaymentMethods.Any(e => e.PaymentMethodId == id);
        }
    }
}
