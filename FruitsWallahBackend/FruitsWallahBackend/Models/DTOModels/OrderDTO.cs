namespace FruitsWallahBackend.Models.DTOModels
{
    public class OrderDTO
    {
        public int UserID { get; set; }
        public string? TransactionType { get; set; }
        public bool IsPaid { get; set; }
    }
}
