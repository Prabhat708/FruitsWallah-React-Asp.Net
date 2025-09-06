using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FruitsWallahBackend.Data;
using FruitsWallahBackend.Models;

namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderTrackersController : ControllerBase
    {
        private readonly FruitsWallahDbContext _context;

        public OrderTrackersController(FruitsWallahDbContext context)
        {
            _context = context;
        }

        [HttpPut("{OrderId},{NewStatus}")]
        public async Task<IActionResult> PutOrderTracker(int OrderId, String NewStatus)
        {
            var OrderTracker = await _context.OrderTrackers.FirstOrDefaultAsync(t => t.OrderId==OrderId);
            if (OrderTracker == null)
            {
                return NotFound();
            }
            OrderTracker?.OrderStatus?.Add(NewStatus);
           
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
                
            }

            return Ok("Status Updated");
        }

       
    }
}
