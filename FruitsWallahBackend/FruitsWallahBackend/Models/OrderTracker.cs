using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FruitsWallahBackend.Models
{
    public class OrderTracker
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderTrackerId { get; set; }
        public int OrderId { get; set; }
        public DateTime DeliveredOn { get; set; }
        public List<String>? OrderStatus { get; set; }

    }
}
