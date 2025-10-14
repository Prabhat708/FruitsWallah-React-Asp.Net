using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FruitsWallahBackend.Models
{
    public class UnreadMessages
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int SenderId { get; set; }
        [Required]
        public int ReciverId { get; set; }
        [Required]
        public int UnreadCount { get; set; } = 0;
    }
}
