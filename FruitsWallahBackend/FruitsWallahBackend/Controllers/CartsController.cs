using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FruitsWallahBackend.Data;
using FruitsWallahBackend.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController(FruitsWallahDbContext context) : ControllerBase
    {
        private readonly FruitsWallahDbContext _context = context;

       

        // GET: api/Carts/5
        [HttpGet("{UserId}")]
        public async Task<ActionResult<Carts>> GetCarts(int UserId)
        {
            if (UserId>0)
            {
                try
                {
                    var cartItems = await (from c in _context.Carts where c.UserId == UserId join p in _context.Products on c.ProductId equals p.ProductId select new { p.ProductImg, p.ProductName, p.ProductPrice, c.ProductQuantity }).ToListAsync(); ;

                    if (cartItems.Count == 0)
                    {
                        return NotFound("No data Found");
                    }
                    return Ok(cartItems);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return BadRequest();
               
        }

        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id},{ProductQty}")]
        public async Task<IActionResult> PutCarts(int id, int ProductQty)
        {
            var carts=await _context.Carts.FindAsync(id);
           ;
            if (id != carts?.CartId)
            {
                return BadRequest();
            }

            carts.ProductQuantity = ProductQty;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartsExists(id))
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

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Carts>> PostCarts(Carts carts)
        {
            if (carts == null)
            {
                return NoContent();
            }
            
            _context.Carts.Add(carts);
            await _context.SaveChangesAsync();

            return Ok(carts);
        }

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarts(int id)
        {
            var carts = await _context.Carts.FindAsync(id);
            if (carts == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(carts);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartsExists(int id)
        {
            return _context.Carts.Any(e => e.CartId == id);
        }
    }
}
