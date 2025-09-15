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
using static System.IO.Path;


namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(FruitsWallahDbContext context) : ControllerBase
    {
        private readonly FruitsWallahDbContext _context = context;

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Products>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProducts(int id)
        {
            var products = await _context.Products.FindAsync(id);

            if (products == null)
            {
                return NotFound();
            }

            return products;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducts(int id, Products products)
        {
            if (id != products.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(products).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<Products>> PostProducts([FromForm] ProductDTO products)
        {
           
            string? ImagePath = null;
            if (products.ProductImg != null && products.ProductImg.Length > 0)
            {
                var uploadsFolder = Combine("wwwroot", "ProductImages");
                Directory.CreateDirectory(uploadsFolder);
                var FileName = Combine(products.ProductImg.FileName.Replace(GetExtension(products.ProductImg.FileName), "")+DateTime.Now.ToString("yyyyMMdd_HHmmss") + GetExtension(products.ProductImg.FileName));
                ImagePath = Combine(uploadsFolder, FileName);
                using (var fileStream = new FileStream(ImagePath, FileMode.Create))
                {
                    await products.ProductImg.CopyToAsync(fileStream);
                }
            }
            var product=new Products()
            {
                ProductName = products.ProductName,
                ProductCatagory = products.ProductCatagory,
                ProductDescription = products.ProductDescription,
                ProductPrice = products.ProductPrice,
                ProductStock = products.ProductStock,
                ProductImg=ImagePath?.Replace("wwwroot",""),
                IsActive=true
            };

            _context.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducts(int id)
        {
            var products = await _context.Products.FindAsync(id);
            if (products == null)
            {
                return NotFound();
            }

            products.IsActive = false;
            await _context.SaveChangesAsync();

            return Ok("Product deleted successfully but for my reference i store the product details");
        }

        private bool ProductsExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
