using DocumentFormat.OpenXml.Spreadsheet;
using FruitsWallahBackend.Data;
using FruitsWallahBackend.Models;
using FruitsWallahBackend.Models.DTOModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Razorpay.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Text.Json;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
namespace FruitsWallahBackend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController(FruitsWallahDbContext context, IConfiguration configuration) : ControllerBase
    {
        private readonly FruitsWallahDbContext _context = context;
        private readonly IConfiguration _configuration = configuration;

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orders>>> GetOrders()
        {
            var orders = await (from ot in _context.OrderTrackers select new { ot.OrderId, ot.OrderStatus }).ToListAsync();
            var filterOrders = orders.Where(ot => ot.OrderStatus.Count < 5).OrderByDescending(ot => ot.OrderStatus.Count).ToList();
            return Ok(filterOrders);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("RecentOrders")]
        public async Task<ActionResult<IEnumerable<Orders>>> GetRecentOrdersOrders()
        {
            var orders = await (from o in _context.Orders join ot in _context.OrderTrackers on o.OrderId equals ot.OrderId join u in _context.Users on o.UserId equals u.UserId join otrans in _context.OrderTransactions on o.OrderId equals otrans.OrderID orderby o.OrderDate descending select new { o.OrderId, u.Name, ot.OrderStatus, otrans.TransactionType, otrans.Amount }).Take(5).ToListAsync();

            return Ok(orders);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("filteredOrders/{day}/{status}/{type}")]
        public async Task<ActionResult<IEnumerable<object>>> GetfilteredOrders(int day, string status, string type)
        {
            Console.WriteLine(day);
            Console.WriteLine(status);
            Console.WriteLine(type);
            // Define date filter
            DateTime fromDate = DateTime.MinValue;
            DateTime today = DateTime.Now.Date;

            switch (day)
            {
                case 1: // Today
                    fromDate = today;
                    break;
                case 7: // Last 7 Days
                    fromDate = today.AddDays(-6);
                    break;
                case 30: // Last 30 Days
                    fromDate = today.AddDays(-29);
                    break;
                case 90: // Last 90 Days
                    fromDate = today.AddDays(-89);
                    break;
                default: // All
                    fromDate = DateTime.MinValue;
                    break;
            }

            var query = from o in _context.Orders
                        join u in _context.Users on o.UserId equals u.UserId
                        join OI in _context.OrderItems on o.OrderId equals OI.OrderId
                        join ot in _context.OrderTrackers on o.OrderId equals ot.OrderId
                        join oa in _context.OrderAddresses on o.OrderId equals oa.OrderId
                        join OTrans in _context.OrderTransactions on o.OrderId equals OTrans.OrderID
                        where o.OrderDate.Date >= fromDate
                        select new
                        {
                            o.OrderId,
                            o.OrderDate,
                            u.Name,
                            o.IsPaid,
                            o.TransactionOrderID,
                            OI.ProductName,
                            OI.ProductPrice,
                            OI.ProductQty,
                            OI.ShipingCharge,
                            OI.TotalPrice,
                            OI.TransactionType,
                            OI.ProductImg,
                            OTrans.TransactionId,
                            OTrans.TransactionStatus,
                            OTrans.TransactionTime,
                            ot.OrderStatus,
                            ot.DeliveredOn,
                            oa.UserName,
                            oa.AddressType,
                            oa.HouseNo,
                            oa.Locality,
                            oa.Address,
                            oa.City,
                            oa.State,
                            oa.PostalCode,
                            oa.LandMark,
                            oa.PhoneNumber
                        };


            var results = await query.ToListAsync();

            if (status != "All")
            {
                results = results
                    .Where(x => x.OrderStatus != null
                             && x.OrderStatus.Count > 0
                             && x.OrderStatus.Last() == status)
                    .ToList();
            }

            // Filter transaction type if needed
            if (type == "COD")
            {
                results = results.Where(x => x.TransactionType == "COD").ToList();
            }
            else if (type == "Online")
            {
                results = results.Where(x => x.TransactionType != "COD").ToList();
            }

            results = results.OrderByDescending(x => x.OrderDate).ToList();

            return Ok(results);
        }

        [Authorize]
        [HttpGet("ByOrderId/{orderId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetByOrderId(int orderId)
        {
           var orders = await (from o in _context.Orders
                               join u in _context.Users on o.UserId equals u.UserId
                                             join OI in _context.OrderItems on o.OrderId equals OI.OrderId
                                             join ot in _context.OrderTrackers on o.OrderId equals ot.OrderId
                                             join oa in _context.OrderAddresses on o.OrderId equals oa.OrderId
                                             join OTrans in _context.OrderTransactions on o.OrderId equals OTrans.OrderID
                               where o.OrderId == orderId
                                             orderby o.OrderDate descending
                                             select new
                                             {
                                                 o.OrderId,
                                                 o.OrderDate,
                                                 u.Name,
                                                 o.IsPaid,
                                                 o.TransactionOrderID,
                                                 OI.ProductName,
                                                 OI.ProductPrice,
                                                 OI.ProductQty,
                                                 OI.ShipingCharge,
                                                 OI.TotalPrice,
                                                 OI.TransactionType,
                                                 OI.ProductImg,
                                                 OTrans.TransactionId,
                                                 OTrans.TransactionStatus,
                                                 OTrans.TransactionTime,
                                                 ot.OrderStatus,
                                                 ot.DeliveredOn,
                                                 oa.UserName,
                                                 oa.AddressType,
                                                 oa.HouseNo,
                                                 oa.Locality,
                                                 oa.Address,
                                                 oa.City,
                                                 oa.State,
                                                 oa.PostalCode,
                                                 oa.LandMark,
                                                 oa.PhoneNumber
                                             }).ToListAsync();
            return Ok(orders);
        }

        // GET: api/Orders/5
        [Authorize]
        [HttpGet("{UserId}")]
        public async Task<ActionResult<Orders>> GetOrders(int UserId)
        {
            try
            {
                var orders = await (from o in _context.Orders
                                    where o.UserId == UserId
                                    join OI in _context.OrderItems on o.OrderId equals OI.OrderId
                                    join ot in _context.OrderTrackers on o.OrderId equals ot.OrderId
                                    join oa in _context.OrderAddresses on o.OrderId equals oa.OrderId
                                    join OTrans in _context.OrderTransactions on o.OrderId equals OTrans.OrderID
                                    orderby o.OrderDate descending
                                    select new
                                    {
                                        o.OrderId,
                                        o.OrderDate,
                                        o.IsPaid,
                                        o.TransactionOrderID,
                                        OI.ProductName,
                                        OI.ProductPrice,
                                        OI.ProductQty,
                                        OI.ShipingCharge,
                                        OI.TotalPrice,
                                        OI.TransactionType,
                                        OI.ProductImg,
                                        OTrans.TransactionId,
                                        OTrans.TransactionStatus,
                                        OTrans.TransactionTime,
                                        ot.OrderStatus,
                                        ot.DeliveredOn,
                                        oa.UserName,
                                        oa.AddressType,
                                        oa.HouseNo,
                                        oa.Locality,
                                        oa.Address,
                                        oa.City,
                                        oa.State,
                                        oa.PostalCode,
                                        oa.LandMark,
                                        oa.PhoneNumber
                                    }).ToListAsync();
                //Use.Skip(8).Take(4) for pagination -> Skip(pageNumber * numberOfReacords).Take(numberOfRecords)
                return Ok(orders);
            }
            catch
            {
                return Ok("Login before");
            }
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Orders>> PostOrders(OrderDTO orders)
        {
            string OrderIdForCOD = DateTime.Now.ToString("yyyyMMddHHmmssfff") + orders.UserID + "_" + Guid.NewGuid().ToString("N")[..6];

            if (orders == null)
            {
                return BadRequest();
            }
            var carts = await (from c in _context.Carts where c.UserId == orders.UserID select c).ToListAsync();
            var addresss = await _context.Addresses.FirstOrDefaultAsync(t => t.UserId == orders.UserID && t.IsPrimary);

            if (addresss == null)
            {
                return BadRequest("Address Not Found. Please Add Address before Order.");
            }
            else if (carts.Count == 0)
            {
                return BadRequest("No Cart Items");
            }
            else
            {
                foreach (var cart in carts)
                {
                    var product = await _context.Products.FindAsync(cart.ProductId);
                    if (product == null)
                    {
                        return BadRequest("No product Found");
                    }
                    _context.Carts.Remove(cart);

                    var order = new Orders()
                    {
                        UserId = cart.UserId,
                        TransactionOrderID = orders.TransactionType == "COD" ? OrderIdForCOD : orders.TransactionOrderID,
                        IsPaid = orders.TransactionType != "COD",
                    };
                    _context.Add(order);
                    await _context.SaveChangesAsync();
                    var OrderItem = new OrderItem()
                    {
                        OrderId = order.OrderId,
                        ProductId = cart.ProductId,
                        ProductName = product?.ProductName,
                        ProductPrice = product?.ProductPrice ?? 0,
                        ProductQty = cart.ProductQuantity,
                        ProductImg = product?.ProductImg,
                        ShipingCharge = product?.ProductPrice * cart.ProductQuantity >= 300 ? 0 : 50,
                        TotalPrice = product != null && product.ProductPrice * cart.ProductQuantity >= 300
                            ? product.ProductPrice * cart.ProductQuantity
                            : product != null ? product.ProductPrice * cart.ProductQuantity + 50 : 0,
                        TransactionType = orders.TransactionType,
                    };
                    _context.Add(OrderItem);
                    var OrderAddress = new OrderAddress()
                    {
                        OrderId = order.OrderId,
                        UserName = addresss.UserName,
                        Address = addresss.Address,
                        AddressType = addresss.AddressType,
                        HouseNo = addresss.HouseNo,
                        Locality = addresss.Locality,
                        City = addresss.City,
                        State = addresss.State,
                        PostalCode = addresss.PostalCode,
                        LandMark = addresss.LandMark,
                        PhoneNumber = addresss.PhoneNumber
                    };
                    _context.Add(OrderAddress);
                    if (orders.TransactionType == "COD")
                    {
                        var orderTransaction = new OrderTransactions()
                        {
                            TransactionType = orders.TransactionType,
                            OrderID = order.OrderId,
                            TransactionOrderID = OrderIdForCOD,
                            RazorpaySignature = "null",
                            Amount = orders.Amount>=300?orders.Amount: orders.Amount+50,
                            Currency = orders.Currency,
                            TransactionId = "Generated Automatic on Delivery",
                            TransactionStatus = "PENDING",
                            TransactionTime = DateTime.Now.AddDays(1),
                        };
                        _context.Add(orderTransaction);
                    }
                    else
                    {
                        var orderTransaction = new OrderTransactions()
                        {
                            TransactionType = orders.TransactionType,
                            TransactionOrderID = orders.TransactionOrderID,
                            RazorpaySignature = orders.RazorpaySignature,
                            OrderID = order.OrderId,
                            Amount = (orders.Amount) / 100,
                            Currency = orders.Currency,
                            TransactionId = orders.TransactionId,
                            TransactionStatus = "Paid",
                            TransactionTime = orders.TransactionTime,
                        };
                        _context.Add(orderTransaction);
                    }

                    var OrderTracker = new OrderTracker()
                    {
                        OrderId = order.OrderId,
                        DeliveredOn = DateTime.Now.AddDays(1),
                        OrderStatus = ["Placed"]
                    };
                    _context.Add(OrderTracker);
                    if (product != null)
                    {
                        product.ProductStock -= cart.ProductQuantity;
                    }
                    await _context.SaveChangesAsync();
                }
            }
            return Ok("Ordered Successfully");
        }
        [Authorize]
        [HttpPost("create-order")]
        public async Task<ActionResult<PaymentDTO>> PostPayment(PaymentDTO request)

        {
            var paymentSettings = _configuration.GetSection("Razorpay");
            var result = await Task.Run(() =>
            {
                RazorpayClient client = new RazorpayClient(paymentSettings["Key"], paymentSettings["Secret"]);
                Dictionary<string, object> options = new()
                {
                    { "amount", request.Amount*100 },  // in paise
                    { "currency", "INR" },
                    { "receipt", Guid.NewGuid().ToString() },
                    { "payment_capture", 1 } // auto capture
                };
                Order order = client.Order.Create(options);
                var orderId = order.Attributes["id"].ToString();
                var amount = Convert.ToInt32(order.Attributes["amount"]);
                var currency = order.Attributes["currency"].ToString();
                return new
                {
                    orderId,
                    amount,
                    currency
                };
            });
            return Ok(result);
        }
        [Authorize]
        [HttpGet("Inovice{transactionId}")]
        public async Task<ActionResult> GetInvoice(string transactionId)
        {
            var orderDetails = await (from o in _context.Orders join oa in _context.OrderAddresses on o.OrderId equals oa.OrderId join OTrans in _context.OrderTransactions on o.OrderId equals OTrans.OrderID join OI in _context.OrderItems on o.OrderId equals OI.OrderId where o.TransactionOrderID == transactionId select new { oa.UserName, oa.AddressType, oa.HouseNo, oa.Locality, oa.Address, oa.City, oa.State, oa.PostalCode, oa.PhoneNumber, o.OrderDate, o.TransactionOrderID, OTrans.TransactionType, OTrans.TransactionStatus, OI.OrderId, OI.ProductName, OI.ProductPrice, OI.ProductQty }).ToListAsync();

            var groupedResult = orderDetails
                .GroupBy(o => o.TransactionOrderID)
                .Select(g => new
                {
                    g.First().UserName,
                    g.First().AddressType,
                    g.First().HouseNo,
                    g.First().Locality,
                    g.First().Address,
                    g.First().City,
                    g.First().State,
                    g.First().PostalCode,
                    g.First().PhoneNumber,
                    g.First().OrderDate,
                    TransactionOrderID = g.Key,
                    g.First().TransactionType,
                    g.First().TransactionStatus,
                    subTotal= g.Sum(p => p.ProductPrice * p.ProductQty),
                    shippingCharge= g.Sum(p => p.ProductPrice * p.ProductQty) >= 300 ?0:50,
                    TotalPrice = g.Sum(p => p.ProductPrice * p.ProductQty)>=300? g.Sum(p => p.ProductPrice * p.ProductQty): g.Sum(p => p.ProductPrice * p.ProductQty)+50,
                    Products = g.Select(p => new
                    {
                        p.OrderId,
                        p.ProductName,
                        p.ProductPrice,
                        p.ProductQty
                    }).ToList()
                })
                .FirstOrDefault();
            return Ok(groupedResult);
        }
    }
}
