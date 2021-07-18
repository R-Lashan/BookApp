using System.Collections.Generic;

namespace BookApp.API.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string ISBN { get; set; }
        public double Price { get; set; }

        public ICollection<BookInvoice> BookInvoice { get; set; }
    }
}
