using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FruitsWallahBackend.Models
{
    public class OrderAddress
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderAddressId { get; set; }
        public int OrderId { get; set; }
        [MaxLength(30)]
        public string? AddressType { get; set; }
        public string? UserName { get; set; }
        public int HouseNo { get; set; }
        [MaxLength(100)]
        public string? Locality { get; set; }
        [MaxLength(300)]
        public string? Address { get; set; }
        [MaxLength(50)]
        public string? City { get; set; }
        [MaxLength(25)]
        public string? State { get; set; }
        public int PostalCode { get; set; }
        public long PhoneNumber { get; set; }
        [MaxLength(100)]
        public string? LandMark { get; set; }
    }
}
