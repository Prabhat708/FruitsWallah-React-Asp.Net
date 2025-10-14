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
    public class UnreadMessagesController : ControllerBase
    {
        private readonly FruitsWallahDbContext _context;

        public UnreadMessagesController(FruitsWallahDbContext context)
        {
            _context = context;
        }

        // GET: ai/UnreadMessages
        [HttpGet("Admin/{UserId}")]
        public async Task<ActionResult<IEnumerable<UnreadMessages>>> GetAllUnreadMessages(int UserId)
        {
            return await _context.UnreadMessages.Where(u=>u.ReciverId == UserId).ToListAsync();
        }

        // GET: api/UnreadMessages/5
        [HttpGet("{UserId}")]
        public async Task<ActionResult<UnreadMessages>> GetUnreadMessages(int UserId)
        {
            var unreadCount= await _context.UnreadMessages.Where(u=>u.ReciverId == UserId).Select(u=>u.UnreadCount).ToListAsync();
            if (unreadCount.Count <= 0)
            {
                return Ok(0);
            }
            return Ok(unreadCount[0]);
        }


        // POST: api/UnreadMessages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UnreadMessages>> PostUnreadMessages(UserUnread unreadMessages)
        {

            var ReciverId = await _context.Users.Where(s => s.IsAdmin).Select(u => u.UserId).FirstOrDefaultAsync();
            var AllIds = await _context.UnreadMessages.Select(c =>new {c.SenderId, c.ReciverId}).ToListAsync();
           
            if (AllIds.Contains(new { unreadMessages.SenderId, ReciverId }))
            {
                var unread = await _context.UnreadMessages.Where(u => u.SenderId == unreadMessages.SenderId && u.ReciverId == ReciverId).FirstOrDefaultAsync();
                if (unread != null)
                unread.UnreadCount = unreadMessages.UnreadCount;
                await _context.SaveChangesAsync();
                return Ok("done");
            }
            var newunreadChat = new UnreadMessages()
            {
                SenderId = unreadMessages.SenderId,
                UnreadCount = unreadMessages.UnreadCount,
                ReciverId = ReciverId,
            };
            _context.UnreadMessages.Add(newunreadChat);
            await _context.SaveChangesAsync();

            return Ok("updated");
        }

        

        [HttpPost("User")]
        public async Task<ActionResult<UserUnread>>PostUserUnreadCount(UserUnread unreadUser)
        {
            var AllIds = await _context.UnreadMessages.Select(c=>c.ReciverId).ToListAsync();
            
            if (AllIds.Contains(unreadUser.SenderId))
            {
                var unreadcounts = await _context.UnreadMessages.FirstOrDefaultAsync(s=>s.ReciverId == unreadUser.SenderId);
                if (unreadcounts == null)
                {  return NotFound(); }
                unreadcounts.UnreadCount= unreadUser.UnreadCount;
                await _context.SaveChangesAsync();
                return Ok(unreadcounts);
            }
            var newunreadChat = new UnreadMessages()
            {
                SenderId = await _context.Users.Where(s => s.IsAdmin).Select(u => u.UserId).FirstOrDefaultAsync(),
                UnreadCount = unreadUser.UnreadCount,
                ReciverId = unreadUser.SenderId
            };
            
             _context.UnreadMessages.Add(newunreadChat);
            await _context.SaveChangesAsync();
          
            return Ok(unreadUser);
        }
        private bool UnreadMessagesExists(int id)
        {
            return _context.UnreadMessages.Any(e => e.Id == id);
        }

        public class UserUnread
        {
            public int SenderId { get; set; }
            public int UnreadCount { get; set; }
        }
    }
}
