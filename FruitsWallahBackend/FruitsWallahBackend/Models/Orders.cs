using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FruitsWallahBackend.Models
{
    public class Orders
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public int AddId { get; set; }   
        public int ProductID { get; set; }
        public int ProductQty { get; set; } = 1;
        public DateTime OrderDate { get; set; }= DateTime.Now;
        public bool IsPaid { get; set; }
    }
}
