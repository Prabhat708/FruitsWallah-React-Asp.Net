namespace FruitsWallahBackend.Models.DTOModels
{
    public class OrderDTO
    {
        public int UserID { get; set; }
        public string TransactionOrderID { get; set; }
        public string TransactionId { get; set; }
        public string? RazorpaySignature { get; set; }
        public string Currency { get; set; } = "INR";
        public int Amount { get; set; }
        public string? TransactionType { get; set; }
        public DateTime TransactionTime { get; set; } = DateTime.Now;

    }
}
