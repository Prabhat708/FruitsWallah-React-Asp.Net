using FruitsWallahBackend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController(FruitsWallahDbContext context) : ControllerBase
    {
        private readonly FruitsWallahDbContext _context = context ;
        [Authorize(Roles ="Admin")]
        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var ordercount = await _context.Orders.CountAsync();
            var returnedOrder= await _context.Orders.CountAsync(r=>r.IsReturned);
            var activeOrder= await _context.OrderTrackers.ToListAsync();
            var codOrders = await _context.OrderTransactions.CountAsync(tt=>tt.TransactionType=="COD");
            var prepaidOrders= await _context.OrderTransactions.CountAsync()-codOrders;
            var undeliveredOrders = activeOrder.Where(o => o.OrderStatus == null || o.OrderStatus.Last() != "Delivered").ToList();

            int undeliveredCount = undeliveredOrders.Count;
            var deliveredorder = activeOrder.Count - undeliveredCount;

            var totalProduct= await _context.Products.CountAsync();
            var deletedproducts = await _context.Products.CountAsync(d=> d.IsActive==false);
            var activeProducts = totalProduct-deletedproducts;
            var outofstockProducts = await _context.Products.CountAsync(o => o.ProductStock == 0);

            var totalUsers = await _context.Users.CountAsync();
            var deletedUsers = await _context.Users.CountAsync(D => D.IsDeleted);
            var InactiveUsers = await _context.Users.CountAsync(I=>I.IsActive==false)-deletedUsers;
            var totalAdmins = await _context.Users.CountAsync(A=> A.IsAdmin);
            var ActiveUsers= totalUsers- InactiveUsers-deletedUsers;

            var TotalTransactions = await _context.OrderTransactions.ToListAsync();
            var totalRevenue = 0;
            var pendingPayment = 0;
            TotalTransactions.ForEach(item =>
            { if (item.TransactionStatus == "PENDING")
                {
                    pendingPayment+= item.Amount;
                }
                totalRevenue += item.Amount;
            });

            return Ok(new
            {
                ordercount,
                returnedOrder,
                undeliveredCount,
                deliveredorder,
                prepaidOrders,
                codOrders,
                totalProduct,
                deletedproducts,
                activeProducts,
                outofstockProducts,
                totalUsers,
                ActiveUsers,
                InactiveUsers,
                deletedUsers,
                totalAdmins,
                totalRevenue,
                pendingPayment,
            });
        }
        [HttpGet("Revenue")]
        public async Task<IActionResult> GetRevenue()
        {
            var allTransaction= await _context.OrderTransactions.ToListAsync();
            List<int> Collections = [0, 0, 0, 0, 0,0,0,0,0,0,0,0];
            foreach (var item in allTransaction)
            {
                switch (item.TransactionTime.Month)
                {
                    case 1:
                        Collections[0] += item.Amount;
                        break;
                    case 2:
                        Collections[1] += item.Amount;
                        break;
                    case 3:
                        Collections[2] += item.Amount;
                        break;
                    case 4:
                        Collections[3] += item.Amount;
                        break;
                    case 5:
                        Collections[4] += item.Amount;
                        break;
                    case 6:
                        Collections[5] += item.Amount;
                        break;
                    case 7:
                        Collections[6] += item.Amount;
                        break;
                    case 8:
                        Collections[7] += item.Amount;
                        break;
                    case 9:
                        Collections[8] += item.Amount;
                        break;
                    case 10:
                        Collections[9] += item.Amount;
                        break;
                    case 11:
                        Collections[10] += item.Amount;
                        break;
                    case 12:
                        Collections[11] += item.Amount;
                        break;
                      
                }
            }
            return Ok(Collections);
        }
    }
}
