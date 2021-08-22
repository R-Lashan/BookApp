using BookApp.API.Dtos;
using BookApp.API.Interfaces;
using BookApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BookApp.API.Controllers
{
    [ApiController]
    [Route("api/invoices")]
    public class InvoicesController : ControllerBase
    {
        private readonly IInvoiceService invoiceService;
        public InvoicesController(IInvoiceService invoiceService)
        {
            this.invoiceService = invoiceService;
        }

        [HttpGet("users/{userId}")]
        public List<Invoice> GetAll([FromRoute] int userId)
      {
            return invoiceService.GetInvoicesByUserId(userId);
        }

        [HttpPost]
        public int Add([FromBody] InvoiceModel invoiceModel)
        {
            return invoiceService.AddInvoice(invoiceModel);
        }

        [HttpGet("{invoiceId}/books")]
        public List<Book> GetBooksByUserInvoiceId([FromRoute] int invoiceId)
        {
            return invoiceService.GetBooksByUserInvoiceId(invoiceId);
        }
    }
}
