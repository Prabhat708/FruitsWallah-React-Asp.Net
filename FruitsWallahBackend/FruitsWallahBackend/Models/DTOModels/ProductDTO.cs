using System.ComponentModel.DataAnnotations;

namespace FruitsWallahBackend.Models.DTOModels
{
    public class ProductDTO
    {
        public string? ProductCatagory { get; set; }
        [MaxLength(50)]
        public string? ProductName { get; set; }
        [MaxLength(300)]
        public string? ProductDescription { get; set; }
        public int ProductStock { get; set; }
        public int ProductPrice { get; set; }
        public IFormFile? ProductImg { get; set; }
    }
}
