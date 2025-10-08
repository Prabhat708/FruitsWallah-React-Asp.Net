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
    public class SearchController(FruitsWallahDbContext context) : ControllerBase
    {
        private readonly FruitsWallahDbContext _context = context;

        [HttpGet("{search}")]
        public async Task<ActionResult<IEnumerable<Products>>> Search(string search)
        {
            var allProducts = await _context.Products.ToListAsync();
            var maxDistance = 3; 

            var filteredProducts = allProducts
                .Where(p =>
                    LevenshteinDistance(search.ToLower(), p.ProductName?.ToLower() ?? "") <= maxDistance ||
                    LevenshteinDistance(search.ToLower(), p.ProductCatagory?.ToLower() ?? "") <= maxDistance ||
                    LevenshteinDistance(search.ToLower(), p.ProductDescription?.ToLower() ?? "") <= maxDistance ||
                    p.ProductPrice.ToString().Contains(search)
                )
                .ToList();

            return Ok(filteredProducts);
        }

        private static int LevenshteinDistance(string s, string t)
        {
            if (string.IsNullOrEmpty(s)) return t?.Length ?? 0;
            if (string.IsNullOrEmpty(t)) return s.Length;

            var dp = new int[s.Length + 1, t.Length + 1];

            for (int i = 0; i <= s.Length; i++) dp[i, 0] = i;
            for (int j = 0; j <= t.Length; j++) dp[0, j] = j;

            for (int i = 1; i <= s.Length; i++)
            {
                for (int j = 1; j <= t.Length; j++)
                {
                    int cost = (s[i - 1] == t[j - 1]) ? 0 : 1;

                    dp[i, j] = Math.Min(
                        Math.Min(dp[i - 1, j] + 1, dp[i, j - 1] + 1),
                        dp[i - 1, j - 1] + cost
                    );
                }
            }

            return dp[s.Length, t.Length];
        }

    }
}
