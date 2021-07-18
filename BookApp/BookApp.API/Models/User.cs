using System.Collections.Generic;

namespace BookApp.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public ICollection<Invoice> Invoices { get; set; }
    }
}
