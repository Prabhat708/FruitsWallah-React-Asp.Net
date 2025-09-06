using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FruitsWallahBackend.Models
{
    public class Products
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductId { get; set; }
        [MaxLength(50)]
        public string? ProductCatagory {get; set; }
        [MaxLength(50)]
        public string? ProductName { get; set; }
        [MaxLength(300)]
        public string? ProductDescription { get; set; }
        public int ProductStock { get; set; }
        public int ProductPrice { get; set; }
        [MaxLength(500)]
        public string? ProductImg { get; set; }

    }
}
