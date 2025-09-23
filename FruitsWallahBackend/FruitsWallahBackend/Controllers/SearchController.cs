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
    public class SearchController : ControllerBase
    {
        private readonly FruitsWallahDbContext _context;

        public SearchController(FruitsWallahDbContext context)
        {
            _context = context;
        }

        [HttpGet("{search}")]
        public async Task<ActionResult<Products>> Search(string search)
        {
            var product = await _context.Products.Where(p => p.ProductName.Contains(search) || p.ProductCatagory.Contains(search) ||p.ProductDescription.Contains(search) || p.ProductPrice.ToString().Contains(search) ).ToListAsync();


            return Ok(product);
        }

        

        private bool ProductsExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
