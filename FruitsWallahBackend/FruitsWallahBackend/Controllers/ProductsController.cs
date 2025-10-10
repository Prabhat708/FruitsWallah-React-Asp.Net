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
using Microsoft.AspNetCore.Authorization;


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
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> PutProducts(int id, [FromForm] ProductDTO products)
        {


            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
                return NotFound("Product not found.");

            // Update basic fields
            existingProduct.ProductName = products.ProductName;
            existingProduct.ProductCatagory = products.ProductCatagory;
            existingProduct.ProductDescription = products.ProductDescription;
            existingProduct.ProductPrice = products.ProductPrice;
            existingProduct.ProductStock = products.ProductStock;
            existingProduct.IsActive = true;

            // Handle new image upload if provided
            if (products.ProductImg != null && products.ProductImg.Length > 0)
            {
                var uploadsFolder = Path.Combine("wwwroot", "ProductImages");
                Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = Path.GetFileNameWithoutExtension(products.ProductImg.FileName)
                                     + DateTime.Now.ToString("yyyyMMdd_HHmmss")
                                     + Path.GetExtension(products.ProductImg.FileName);
                var imagePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    await products.ProductImg.CopyToAsync(fileStream);
                }

                // Optional: Delete the old image
                if (!string.IsNullOrEmpty(existingProduct.ProductImg))
                {
                    var oldImagePath = Path.Combine("wwwroot", existingProduct.ProductImg.TrimStart('/'));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }

                // Save relative path
                existingProduct.ProductImg = Path.Combine("ProductImages", uniqueFileName).Replace("\\", "/");
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Products.Any(p => p.ProductId == id))
                    return NotFound();

                throw;
            }

            return NoContent();
        }


        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<Products>> PostProducts([FromForm] ProductDTO products)
        {

            string? ImagePath = null;
            if (products.ProductImg != null && products.ProductImg.Length > 0)
            {
                var uploadsFolder = Combine("wwwroot", "ProductImages");
                Directory.CreateDirectory(uploadsFolder);
                var FileName = Combine(products.ProductImg.FileName.Replace(GetExtension(products.ProductImg.FileName), "") + DateTime.Now.ToString("yyyyMMdd_HHmmss") + GetExtension(products.ProductImg.FileName));
                ImagePath = Combine(uploadsFolder, FileName);
                using (var fileStream = new FileStream(ImagePath, FileMode.Create))
                {
                    await products.ProductImg.CopyToAsync(fileStream);
                }
            }
            var product = new Products()
            {
                ProductName = products.ProductName,
                ProductCatagory = products.ProductCatagory,
                ProductDescription = products.ProductDescription,
                ProductPrice = products.ProductPrice,
                ProductStock = products.ProductStock,
                ProductImg = ImagePath?.Replace("wwwroot", ""),
                IsActive = true
            };

            _context.Add(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }

        // DELETE: api/Products/5
        [Authorize]
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

            return Ok("Product deleted successfully but for my reference We store the product details");
        }

        [HttpGet("bestProducts")]
        public async Task<IActionResult> GetBestProducts()
        {
            var topProductIds = await _context.OrderItems
                .GroupBy(oi => oi.ProductId)
                .OrderByDescending(g => g.Count())
                .Select(g => g.Key)
                .ToListAsync();

            var topProducts = await _context.Products
                .Where(p => topProductIds.Contains(p.ProductId) && p.ProductStock > 0 && p.IsActive == true).Take(9)
                .ToListAsync();

            return Ok(topProducts);

        }
        private bool ProductsExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
