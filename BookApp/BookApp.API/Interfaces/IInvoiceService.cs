using BookApp.API.Dtos;
using BookApp.API.Models;
using System.Collections.Generic;

namespace BookApp.API.Interfaces
{
    public interface IInvoiceService
    {
        List<Invoice> GetInvoicesByUserId(int userId);
        int AddInvoice(InvoiceModel invoiceModel);
        List<Book> GetBooksByUserInvoiceId(int invoiceId);
    }
}
