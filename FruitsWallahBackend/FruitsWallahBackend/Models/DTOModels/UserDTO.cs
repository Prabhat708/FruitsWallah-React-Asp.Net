using System.ComponentModel.DataAnnotations;

namespace FruitsWallahBackend.Models.DTOModels
{
    public class UserDTO
    {
        public string? Name { get; set; }
        [MaxLength(100)]
        [EmailAddress]
        public string? Email { get; set; }
        
        [MaxLength(10)]
        [Phone]
        public string? PhoneNumber { get; set; }
        [MaxLength(25)]
        public string? Password { get; set; }

    }
}
