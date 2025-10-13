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
    public class AdminChatController : ControllerBase
    {
        private readonly FruitsWallahDbContext _context;

        public AdminChatController(FruitsWallahDbContext context)
        {
            _context = context;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetCustomers()
        {
            //var senderIds= await _context.ChatBoxes.Select(s=>s.SenderId).ToListAsync();
               
            //var customers = await _context.Users
            //    .Select(u => new { u.UserId,u.Name})
            //    .ToListAsync();
            var customers = await( from s in _context.ChatBoxes join u in _context.Users on s.SenderId equals u.UserId where !u.IsAdmin group u by new { u.UserId, u.Name } into g
    select new { g.Key.UserId, g.Key.Name }).ToListAsync();
            Console.WriteLine(customers.Count);
            return Ok(customers);
        }
        [HttpGet("history/{customerId}")]
        public async Task<IActionResult> GetHistory(int customerId)
        {
            var admin= await _context.Users.FirstOrDefaultAsync(u=>u.IsAdmin || (u.Email != null && u.Email.Equals("fruitswallah.in@gmail.com")));
            var message = await _context.ChatBoxes.Where(m => (m.SenderId == customerId && admin != null && m.ReceiverId == admin.UserId) ||
                            (admin != null && m.SenderId == admin.UserId && m.ReceiverId == customerId)).OrderBy(m => m.Timestamp).Select(m => new {m.Id, m.SenderId, m.ReceiverId,m.MessageText,m.Timestamp }).ToListAsync();
            return Ok(message);
        }
        [HttpGet("UserHistroy/{UserId}")]
        public async Task<IActionResult> GetUserHistory(int UserId)
        {
            var message = await _context.ChatBoxes.Where(m=>m.SenderId== UserId|| m.ReceiverId== UserId).OrderBy(m=>m.Timestamp).Select(m=>new { m.SenderId, m.ReceiverId,m.MessageText,m.Timestamp}).ToListAsync();
           return Ok(message);
        }

    }
}
