using System;
using System.Collections.Generic;

namespace BookApp.API.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public double TotalPrice { get; set; }
        public DateTime Created { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<BookInvoice> BookInvoices { get; set; }
    }
}
