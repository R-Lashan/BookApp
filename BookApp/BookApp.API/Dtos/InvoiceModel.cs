using System.Collections.Generic;

namespace BookApp.API.Dtos
{
    public class InvoiceModel
    {
        public int UserId { get; set; }
        public double TotalPrice { get; set; }

        public List<int> BookIds { get; set; }
    }
}
