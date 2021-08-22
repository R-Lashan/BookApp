using BookApp.API.Dtos;
using BookApp.API.Interfaces;
using BookApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BookApp.API.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly DataContext context;
        public InvoiceService(DataContext context)
        {
            this.context = context;
        }

        public List<Invoice> GetInvoicesByUserId(int userId)
        {
            var invoices = context.Invoices.Include(x => x.BookInvoices).Where(x => x.UserId == userId).ToList();

            foreach(Invoice invoice in invoices)
            {
                foreach (BookInvoice bookInvoice in invoice.BookInvoices)
                {
                    bookInvoice.Invoice = null;
                }
            }
            return invoices;
        }

        public int AddInvoice(InvoiceModel invoiceModel)
        {
            var invoice = new Invoice();
            invoice.UserId = invoiceModel.UserId;
            invoice.TotalPrice = invoiceModel.TotalPrice;
            invoice.Created = DateTime.Now;

            var user = context.Users.SingleOrDefault(x => x.Id == invoice.UserId);
            if(user == null)
            {
                return 0;
            }
            else
            {
                context.Invoices.Add(invoice);
                context.SaveChanges();
                AddBookInvoice(invoice.Id, invoiceModel);
                return invoice.Id;
            }
        }

        private void AddBookInvoice(int invoiceId, InvoiceModel invoiceModel)
        {
            foreach (var bookId in invoiceModel.BookIds)
            {
                var bookInvoice = new BookInvoice
                {
                    InvoiceId = invoiceId,
                    BookId = bookId
                };
                bookInvoice.Invoice = null;
                context.BookInvoice.Add(bookInvoice);
                context.SaveChanges();
            }
        }

        public List<Book> GetBooksByUserInvoiceId(int invoiceId)
        {
            var bookList = new List<Book> { };
            var bookInvoices = context.BookInvoice.Include(x => x.Book).Where(x => x.InvoiceId == invoiceId).ToList();

            foreach (var bi in bookInvoices)
            {
                bi.Book.BookInvoice = null;
                bookList.Add(bi.Book);
            }
            return bookList;
        }
    }
}
