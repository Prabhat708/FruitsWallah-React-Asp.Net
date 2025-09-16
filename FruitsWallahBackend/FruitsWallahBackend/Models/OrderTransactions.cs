using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FruitsWallahBackend.Models
{
    public class OrderTransactions
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderTransactionID { get; set; }
        public int OrderID { get; set; }
        public string? TransactionId { get; set; }
        public string? TransactionOrderID { get; set; }
        public string? RazorpaySignature { get; set; }
        public string Currency { get; set; } = "INR";
        [Required]
        public int Amount
        {
            get; set;
        }
        public string? TransactionType { get; set; }
        public string? TransactionStatus { get; set; }
        public DateTime TransactionTime { get; set; }= DateTime.Now;

    }
}
