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
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
namespace FruitsWallahBackend.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController(FruitsWallahDbContext context,IConfiguration configuration) : ControllerBase
    {
        private readonly FruitsWallahDbContext _context = context;
        private readonly IConfiguration _configuration= configuration;

        [Authorize(Roles ="Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orders>>> GetOrders()
        {
            var orders = await (from o in _context.Orders join ot in _context.OrderTrackers on o.OrderId equals ot.OrderId select new { o.OrderId, ot.OrderStatus }).ToListAsync();
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
                        ProductPrice = product.ProductPrice,
                        ProductQty = cart.ProductQuantity,
                        ProductImg = product.ProductImg,
                        ShipingCharge = product.ProductPrice * cart.ProductQuantity >= 300 ? 0 : 50,
                        TotalPrice = product.ProductPrice * cart.ProductQuantity >= 300 ? product.ProductPrice * cart.ProductQuantity : product.ProductPrice * cart.ProductQuantity + 50,
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
                            Amount = orders.Amount,
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
                    product.ProductStock -= cart.ProductQuantity;
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
            return Ok(new
            {
                orderId,
                amount,
                currency
            });
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
