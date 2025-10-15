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
        private readonly FruitsWallahDbContext _context = context;
        [Authorize(Roles = "Admin")]
        [HttpGet("{datefilter}")]
        public async Task<IActionResult> GetDashboard(int datefilter)
        {
            var ordercount = 0;
            if (datefilter > 0)
            {
                ordercount = await _context.Orders.CountAsync(o => o.OrderDate.Date >= DateTime.Now.Date.AddDays(1-datefilter));
            }
            else
            {
                ordercount = await _context.Orders.CountAsync();
            }
            var returnedOrder = await _context.Orders.CountAsync(r => r.IsReturned);
            var activeOrder = await _context.OrderTrackers.ToListAsync();
            var codOrders = await _context.OrderTransactions.CountAsync(tt => tt.TransactionType == "COD");
            var prepaidOrders = await _context.OrderTransactions.CountAsync() - codOrders;
            var undeliveredOrders = activeOrder.Where(o => o.OrderStatus == null || o.OrderStatus.Last() != "Delivered" && o.OrderStatus.Last() != "Cancelled").ToList();

            int undeliveredCount = undeliveredOrders.Count;
            var deliveredorder = activeOrder.Count - undeliveredCount-returnedOrder;

            var totalProduct = await _context.Products.CountAsync();
            var deletedproducts = await _context.Products.CountAsync(d => d.IsActive == false);
            var activeProducts = totalProduct - deletedproducts;
            var outofstockProducts = await _context.Products.CountAsync(o => o.ProductStock == 0);

            var totalUsers = await _context.Users.CountAsync();
            var deletedUsers = await _context.Users.CountAsync(D => D.IsDeleted);
            var InactiveUsers = await _context.Users.CountAsync(I => I.IsActive == false) - deletedUsers;
            var totalAdmins = await _context.Users.CountAsync(A => A.IsAdmin);
            var ActiveUsers = totalUsers - InactiveUsers - deletedUsers;

            var totalTransactions = await _context.OrderTransactions.ToListAsync();
            var totalRevenue = 0;
            var pendingPayment = 0;

            var seenTransactionOrderIds = new HashSet<string>(); 

            foreach (var item in totalTransactions)
            {
                var order = await _context.Orders.FindAsync(item.OrderID);
                if (order != null && order.IsReturned)
                {
                    continue;
                }
                    // Skip if this TransactionOrderID has already been processed
                    if (!seenTransactionOrderIds.Add(item.TransactionOrderID) )
                {
        
                    continue;
                }

                // Only process unique TransactionOrderID
                if (item.TransactionStatus == "PENDING")
                {
                    pendingPayment += item.Amount;
                }
                else if (datefilter > 0 && item.TransactionTime.Date >= DateTime.Now.Date.AddDays(1 - datefilter))
                {
                    totalRevenue += item.Amount;
                }
                else if (datefilter == 0)
                {
                    totalRevenue += item.Amount;
                }
            }


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
        [Authorize(Roles ="Admin")]
        [HttpGet("Revenue")]
        public async Task<IActionResult> GetRevenue()
        {
            var allTransactions = await _context.OrderTransactions.ToListAsync();

            var seenTransactionOrderIds = new HashSet<string>();

            // Initialize with 12 zeros for 12 months
            var collections = new int[12];

            foreach (var item in allTransactions)
            {
                var order = await _context.Orders.FindAsync(item.OrderID);
                if (order != null && order.IsReturned)
                {
                    continue;
                }
                    // Skip duplicate TransactionOrderIDs
                    if (string.IsNullOrEmpty(item.TransactionOrderID) || !seenTransactionOrderIds.Add(item.TransactionOrderID))
                {
                    continue;
                }

                int monthIndex = item.TransactionTime.Month - 1; // month is 1-based

                if (monthIndex >= 0 && monthIndex < 12)
                {
                    collections[monthIndex] += item.Amount;
                }
            }

            return Ok(collections.ToList());
        }
    }
}
