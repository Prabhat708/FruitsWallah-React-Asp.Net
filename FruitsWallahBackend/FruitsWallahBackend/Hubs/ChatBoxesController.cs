

using DocumentFormat.OpenXml.Spreadsheet;
using FruitsWallahBackend.Data;
using FruitsWallahBackend.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Razorpay.Api;

namespace FruitsWallahBackend.Hubs
{
   
    public class ChatBoxesController : Hub
    {
        private readonly FruitsWallahDbContext _dbContext;
        public static readonly Dictionary<int, string> ConnectUsers = [];

        public ChatBoxesController(FruitsWallahDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override async Task OnConnectedAsync()
        {
            var UserId = int.Parse(Context.User?.FindFirst("UserId")?.Value);
            if (UserId<0)
            {
                return;
            }

            ConnectUsers[UserId] = Context.ConnectionId;
            await SendActiveUsers();
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var user = ConnectUsers.FirstOrDefault(x => x.Value == Context.ConnectionId);
            ConnectUsers.Remove(user.Key);
            await SendActiveUsers();
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendToSupport(string message)
        {
            var UserId = int.Parse(Context.User?.FindFirst("UserId")?.Value);
            if (UserId < 0)
            {
                return;
            }
            var admin = await _dbContext.Users.FirstOrDefaultAsync(u => u.IsAdmin || (u.Email != null && u.Email.Equals("fruitswallah.in@gmail.com")));
            if (admin == null)
            {
                return;
            }
            await SaveMessage(UserId, admin.UserId,message);
            if (ConnectUsers.TryGetValue(admin.UserId, out var adminConn))
            {
                await Clients.Client(adminConn).SendAsync("ReceiveMessage",UserId,admin.UserId, "customer",message);
            }
        }

        public async Task SendToCustomer(int customerId, string message)
        {
            var adminId = int.Parse(Context.User?.FindFirst("UserId")?.Value);
            if (adminId < 0)
            {
                return;
            }
            await SaveMessage( adminId, customerId, message);
            if(ConnectUsers.TryGetValue(customerId, out var connId))
            {
                await Clients.Client(connId).SendAsync("ReceiveMessage",adminId,customerId, "admin", message,DateTime.Now);
            }
        }

        private async Task SendActiveUsers()
        {
            var adminId = int.Parse(Context.User?.FindFirst("UserId")?.Value);
            if (adminId < 0)
            {
                return;
            }
            if (ConnectUsers.TryGetValue(adminId, out var connId))
            {
                await Clients.Client(connId).SendAsync("CustomerList", ConnectUsers);
            }
        }

        private async Task SaveMessage(int UserId, int AdminId,string message)
        {
            var chatMessage = new ChatBox()
            {
                SenderId = UserId,
                ReceiverId = AdminId,
                MessageText = message
            };
            _dbContext.Add(chatMessage);
            await _dbContext.SaveChangesAsync();
        }

    }
}
