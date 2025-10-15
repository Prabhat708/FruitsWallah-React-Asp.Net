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
using BCrypt.Net;
using Mysqlx;
using FruitsWallahBackend.Services.Iservices;
using Microsoft.AspNetCore.Authorization;
using Org.BouncyCastle.Asn1;

namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly FruitsWallahDbContext _context;
        private readonly IJwtService _jwtService;
        private readonly ISendEmail _sendEmail;

        public UsersController(FruitsWallahDbContext context, IJwtService jwtService, ISendEmail sendEmail)
        {
            _context = context;
            _jwtService = jwtService;
            _sendEmail = sendEmail;
        }

        // GET: api/Users
        [Authorize(Roles ="Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {

            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(UserDTO user)
        {

            var HashedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password, 13);
            if (user.Email == null)
            {
                return BadRequest("Email required");
            }
            var userEmail = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (userEmail != null)
            {
                if (userEmail.IsDeleted)
                {
                    return BadRequest("Your Accound Deleted Prevoiusly Please SignUp with diffrent email");
                }
                return BadRequest("User Alredy Exists");
            }
            if (user.Password != null)
            {
                var user1 = new User()
                {
                    Name = user.Username,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                };

                _context.Add(user1);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch
                {
                    return NotFound("User Alredy Exists");
                }
                var userAuth = new UserAuth()
                {
                    UserID = user1.UserId,
                    HashPassword = HashedPassword,
                };
                _context.Add(userAuth);

                try
                {
                    await _context.SaveChangesAsync();
                    var token = _jwtService.GenerateToken(user1.UserId, user1.Name, user1.IsAdmin,user1.IsActive);
                    if (token == null)
                    {
                        return BadRequest();
                    }
                    var subject = $"Welcome to Fruitswallah!";

                    var body = $@"
                        <html>
                            <body style='font-family: Arial, sans-serif; color: #333;'>
                                <h1>Welcome, {user1.Name}!</h1>
                                <h2>Thank you for registering with Fruitswallah.</h2>
                                <p>We're excited to have you with us. Enjoy a fresh and delightful shopping experience with a wide range of fruits delivered right to your doorstep.</p>
                                <p>Happy shopping!</p>
                                <br/>
                                <p>– The Fruitswallah Team</p>
                            </body>
                        </html>";
                    await _sendEmail.SendEmails(user1.Email, subject, body);

                    return Ok(token);

                }
                catch (DbUpdateConcurrencyException)
                {
                    return NoContent();
                }
            }
            else
            {
                return BadRequest();
            }


        }

        // DELETE: api/Users/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            if (user.Email == "fruitswallah.in@gmail.com")
            {
                return BadRequest("Super Admins Can't delete there account");
            }
            user.IsAdmin = false;
            user.IsDeleted = true;
            user.IsActive = false;
            await _context.SaveChangesAsync();

            return Ok("Your Acoount Deleted Successfully");
        }

        [Authorize(Roles ="Admin")]
        [HttpPut("Role/{email}/{role}")]
        public async Task<IActionResult> ChangeRole(string email,string role)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return NotFound("No User Found");
            user.IsAdmin = (role == "Admin");
            await _context.SaveChangesAsync();
            return Ok("Role Updated");
        }
        [Authorize]
        [HttpPut("Activate/{UserId}")]
        public async Task<IActionResult> ActivateAccount(int UserId)
        {
            if (UserId < 0)
            {
                return BadRequest("Invalid UserID");
            }
            if (UserExists(UserId))
            {
                var user = await _context.Users.FindAsync(UserId);
                if (user == null)
                {
                    return NotFound("No User Found");
                }
                user.IsActive = true;
                await _context.SaveChangesAsync();

                return Ok("Account Activated");
            }
            return BadRequest("Something Went Wrong");
        }
        [Authorize]
        [HttpPut("InActivate/{UserId}")]
        public async Task<IActionResult> InActivateAccount(int UserId)
        {
            if (UserId < 0)
            {
                return BadRequest("Invalid UserID");
            }
            if (UserExists(UserId))
            {
                var user = await _context.Users.FindAsync(UserId);
                if (user == null)
                {
                    return NotFound("No User Found");
                }
                user.IsActive = false;
                user.IsAdmin= false;
                await _context.SaveChangesAsync();

                return Ok("Account DeActivated");
            }
            return BadRequest("Something Went Wrong");
        }
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
