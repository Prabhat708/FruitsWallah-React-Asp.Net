using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FruitsWallahBackend.Models
{
    public class OrderItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderItemId { get; set; }
        public int OrderId { get; set; }
        [MaxLength(50)]
        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public int ProductPrice { get; set; }
        [MaxLength(500)]
        public string? ProductImg { get; set; }
        public int ProductQty { get; set; } = 1;
        public int ShipingCharge { get; set; }
        public int TotalPrice { get; set; }
        public string? TransactionType { get; set; }
    }
}
