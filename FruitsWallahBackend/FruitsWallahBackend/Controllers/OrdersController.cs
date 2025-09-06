using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FruitsWallahBackend.Data;
using FruitsWallahBackend.Models;
using FruitsWallahBackend.Models.DTOModels;
using System.Threading.Tasks.Dataflow;

namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly FruitsWallahDbContext _context;

        public OrdersController(FruitsWallahDbContext context)
        {
            _context = context;
        }
        // GET: api/Orders/5
        [HttpGet("{UserId}")]
        public async Task<ActionResult<Orders>> GetOrders(int UserId)
        {
            var orders = await (from o in _context.Orders where o.CustomerId==UserId join p in _context.Products on o.ProductID equals p.ProductId join ot in _context.OrderTrackers on o.OrderId equals ot.OrderId join a in _context.Addresses on o.AddId equals a.AddId select new {o.OrderId,p.ProductName,o.OrderDate,o.IsPaid,o.ProductQty,p.ProductPrice,p.ProductImg,ot.OrderStatus,ot.DeliveredOn,a.UserName,a.AddressType,a.HouseNo,a.Locality,a.Address,a.City,a.PostalCode,a.State,a.LandMark}).ToListAsync();

            if (orders == null)
            {
                return NotFound();
            }
            return Ok(orders);
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Orders>> PostOrders(OrderDTO orders)
        {
            if (orders == null)
            {
                return BadRequest();
            }
            var carts= await (from c in _context.Carts where c.UserId==orders.UserID select c).ToListAsync();
            var addresss= await _context.Addresses.FirstOrDefaultAsync(t=>t.UserId==orders.UserID && t.IsPrimary);
            
            if (addresss==null)
            {
                return BadRequest("Address Not Found");
            }else if (carts.Count == 0)
            {
                return BadRequest("No Cart Items");
            }
            else
            {
                foreach (var cart in carts)
                {
                    _context.Carts.Remove(cart);
                    await _context.SaveChangesAsync();

                    var order = new Orders()
                    {
                        CustomerId = cart.UserId,
                        ProductID = cart.ProductId,
                        ProductQty = cart.ProductQuantity,
                        IsPaid = orders.IsPaid,
                        AddId= addresss.AddId,
                    };

                    _context.Add(order);
                    await _context.SaveChangesAsync();
                    var OrderTracker = new OrderTracker()
                    {
                        OrderId = order.OrderId,
                        OrderStatus = orders.OrderStatus,
                        DeliveredOn = DateTime.Now.AddDays(1),
                    };
                    _context.Add(OrderTracker);
                    await _context.SaveChangesAsync();
                }
            }
            return Ok("Ordered Successfully");
        }
       
        private bool OrdersExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
