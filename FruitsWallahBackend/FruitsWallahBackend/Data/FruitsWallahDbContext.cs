using Microsoft.EntityFrameworkCore;
using FruitsWallahBackend.Models;
namespace FruitsWallahBackend.Data
{
    public class FruitsWallahDbContext(DbContextOptions<FruitsWallahDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Products> Products { get; set; }

        public DbSet<Carts> Carts { get; set; }
        public DbSet<UserAuth> UsersAuth { get; set; }

        public DbSet<Orders>Orders { get; set; }
        public DbSet<OrderTracker> OrderTrackers { get; set; }

        public DbSet<Addresses> Addresses { get; set; }
        public DbSet<OrderAddress> OrderAddresses { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderTransactions> OrderTransactions { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        public DbSet<Reviews> Reviews { get; set; }
       
       
    }
}
