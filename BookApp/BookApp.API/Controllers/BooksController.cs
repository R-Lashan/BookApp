using BookApp.API.Interfaces;
using BookApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BookApp.API.Controllers
{
    [ApiController]
    [Route("api/books")]
    public class BooksController : ControllerBase
    {
        private readonly IBookService bookService;
        public BooksController(IBookService bookService)
        {
            this.bookService = bookService;
        }

        [HttpGet]
        public List<Book> GetAll()
        {
            return bookService.GetAllBooks();
        }

        [HttpGet("{id}")]
        public Book GetAll([FromRoute] int id)
        {
            return bookService.GetBookById(id);
        }

        [HttpPost]
        public int Add([FromBody] Book book)
        {
            return bookService.AddBook(book);
        }

        [HttpPut]
        public int Update([FromBody] Book book)
        {
            return bookService.UpdateBook(book);
        }

        [HttpDelete("{id}")]
        public void Delete([FromRoute] int id)
        {
            bookService.DeleteBook(id);
        }
    }
}
