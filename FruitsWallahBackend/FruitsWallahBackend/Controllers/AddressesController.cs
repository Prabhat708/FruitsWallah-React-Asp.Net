using DocumentFormat.OpenXml.Wordprocessing;
using FruitsWallahBackend.Data;
using FruitsWallahBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private readonly FruitsWallahDbContext _context;

        public AddressesController(FruitsWallahDbContext context)
        {
            _context = context;
        }
    

        // GET: api/Addresses/5
        [HttpGet("{UserId}")]
        public async Task<ActionResult<Addresses>> GetAddresses(int UserId)
        {
            var addresses = await (from A in _context.Addresses where A.UserId==UserId orderby A.IsPrimary descending select A ).ToListAsync();

            if (addresses == null)
            {
                return NotFound();
            }

            return Ok(addresses);
        }

        // PUT: api/Addresses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddresses(int id, Addresses addresses)
        {
            if (id != addresses.AddId)
            {
                return BadRequest();
            }

           
            var address=await (from a in _context.Addresses where a.UserId== addresses.UserId && a.IsPrimary select a).ToListAsync();
            foreach (var add in address)
            {
                if (address.Count > 0)
                {
                    add.IsPrimary = false;
                }

            }
            await _context.SaveChangesAsync();
            _context.Entry(addresses).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddressesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            
            return Ok("Updated");
        }

        // POST: api/Addresses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Addresses>> PostAddresses(Addresses addresses)
        {
            try
            {
                var address = await (from a in _context.Addresses where a.UserId == addresses.UserId && a.IsPrimary select a).ToListAsync();
                foreach (var add in address)
                {
                    if (address.Count > 0)
                    {
                        add.IsPrimary = false;
                    }

                }
                await _context.SaveChangesAsync();
                var userAdddress = await (from A in _context.Addresses where A.UserId == addresses.UserId select A).ToListAsync();
                if (userAdddress.Count == 5) { return Ok("You can't add more than 5 Address"); }

                _context.Addresses.Add(addresses);
                await _context.SaveChangesAsync();

                return Ok("Address Added successfully!");
            }
            catch
            {
                return BadRequest("Something Went Wrong");
            }
        }

        // DELETE: api/Addresses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddresses(int id)
        {
            try
            {
                var addresses = await _context.Addresses.FindAsync(id);
                

                _context.Addresses.Remove(addresses);
                await _context.SaveChangesAsync();

                return Ok("Address Deleted Successful");
            }
            catch
            {
                return BadRequest("Something Went Wrong");
            }
        }

        private bool AddressesExists(int id)
        {
            return _context.Addresses.Any(e => e.AddId == id);
        }
    }
}
