namespace FruitsWallahBackend.Models.DTOModels
{
    public class OrderDTO
    {
        public int UserID { get; set; }
        public DateTime DeliveredOn { get; set; }
        public List<String>? OrderStatus { get; set; }
        public bool IsPaid { get; set; }
    }
}
