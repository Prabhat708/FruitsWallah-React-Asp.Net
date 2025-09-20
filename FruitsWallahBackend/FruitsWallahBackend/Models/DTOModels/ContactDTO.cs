using System.ComponentModel.DataAnnotations;

namespace FruitsWallahBackend.Models.DTOModels
{
    public class ContactDTO
    {
        [MaxLength(50)]
        public string? Name { get; set; }
        [MaxLength(50)]
        public string? Email { get; set; }
        [MaxLength(15)]
        public string? PhoneNumber { get; set; }
        
        public int OrderNumber { get; set; }
        public string? Subject { get; set; }
        
        public string? Desc { get; set; }
       
    }
}
