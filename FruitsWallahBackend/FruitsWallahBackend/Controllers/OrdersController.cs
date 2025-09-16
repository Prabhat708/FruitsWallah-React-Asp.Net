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
using System.Threading.Tasks.Dataflow;
using Razorpay.Api;
namespace FruitsWallahBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly FruitsWallahDbContext _context;

        private readonly string _key = "rzp_test_RHpcBqvwhimDgq";
        private readonly string _secret_key = "bIHBCdbU24bVMn5q5W9RlYkL";

        public OrdersController(FruitsWallahDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orders>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }
        // GET: api/Orders/5
        [HttpGet("{UserId}")]
        public async Task<ActionResult<Orders>> GetOrders(int UserId)
        {
            var orders = await (from o in _context.Orders where o.UserId==UserId 
                                join OI in _context.OrderItems on o.OrderId equals OI.OrderId  
                                join ot in _context.OrderTrackers on o.OrderId equals ot.OrderId 
                                join oa in _context.OrderAddresses on o.OrderId equals oa.OrderId 
                                join OTrans in _context.OrderTransactions on o.OrderId equals OTrans.OrderID 
                                 select new {
                                  o.OrderId,o.OrderDate,o.IsPaid,
                                  OI.ProductName, OI.ProductPrice, OI.ProductQty, OI.ShipingCharge, OI.TotalPrice, OI.TransactionType,OI.ProductImg,
                                  OTrans.TransactionId,OTrans.TransactionStatus,OTrans.TransactionTime,
                                  ot.OrderStatus,ot.DeliveredOn,
                                  oa.UserName,oa.AddressType,oa.HouseNo,oa.Locality,oa.Address,oa.City, oa.State,oa.PostalCode,oa.LandMark,oa.PhoneNumber 
                                }).ToListAsync();
            
            
            return Ok(orders);
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Orders>> PostOrders(OrderDTO orders)
        {
            Console.WriteLine(orders.UserID);

            if (orders == null)
            {
                Console.WriteLine("null orders");
                return BadRequest();
            }
            var carts= await (from c in _context.Carts where c.UserId==orders.UserID select c).ToListAsync();
            var addresss= await _context.Addresses.FirstOrDefaultAsync(t=>t.UserId==orders.UserID && t.IsPrimary);
            Console.WriteLine("cart count"+carts.Count);
            if (addresss==null)
            {
                return BadRequest("Address Not Found");
            }else if (carts.Count == 0)
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
                        TransactionOrderID=orders.TransactionOrderID,
                        IsPaid = orders.TransactionType != "COD",
                    };
                    _context.Add(order);
                    await _context.SaveChangesAsync();
                    var OrderItem = new OrderItem()
                    {
                        OrderId = order.OrderId,
                        ProductId = cart.ProductId,
                        ProductName =product?.ProductName,
                        ProductPrice=product.ProductPrice,
                        ProductQty=cart.ProductQuantity,
                        ProductImg=product.ProductImg,
                        ShipingCharge= product.ProductPrice * cart.ProductQuantity >= 300 ? 0:50,
                        TotalPrice=product.ProductPrice * cart.ProductQuantity >= 300 ? product.ProductPrice * cart.ProductQuantity : product.ProductPrice * cart.ProductQuantity+50,
                        TransactionType = orders.TransactionType,
                    };
                    _context.Add(OrderItem);
                    var OrderAddress = new OrderAddress()
                    {
                        OrderId= order.OrderId,
                        UserName= addresss.UserName,
                        Address= addresss.Address,
                        AddressType= addresss.AddressType,
                        HouseNo=addresss.HouseNo,
                        Locality=addresss.Locality,
                        City=addresss.City,
                        State=addresss.State,
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
                            TransactionOrderID="null",
                            RazorpaySignature="null",
                            Amount=orders.Amount,
                            Currency=orders.Currency,
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
                            RazorpaySignature =orders.RazorpaySignature,
                            OrderID= order.OrderId,
                            Amount=(orders.Amount)/100,
                            Currency=orders.Currency,
                            TransactionId =orders.TransactionId,
                            TransactionStatus="Paid",
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

        [HttpPost("create-order")]
        public async Task<ActionResult<PaymentDTO>> PostPayment(PaymentDTO request)

        {
           
            RazorpayClient client = new RazorpayClient(_key, _secret_key);
            Dictionary<string, object> options = new()
            {
                { "amount", request.Amount*100 },  // in paise
                { "currency", "INR" },
                { "receipt", Guid.NewGuid().ToString() },
                { "payment_capture", 1 } // auto capture
            };
            Order order = client.Order.Create(options);
            Console.WriteLine(client);
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

    }
}
