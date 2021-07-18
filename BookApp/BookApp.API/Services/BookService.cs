using BookApp.API.Interfaces;
using BookApp.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace BookApp.API.Services
{
    public class BookService : IBookService
    {
        private readonly DataContext context;
        public BookService(DataContext context)
        {
            this.context = context;
        }

        public List<Book> GetAllBooks()
        {
            return context.Books.ToList();
        }

        public Book GetBookById(int id)
        {
            return context.Books.SingleOrDefault(x => x.Id == id);
        }

        public int AddBook(Book book)
        {
            context.Books.Add(book);
            context.SaveChanges();
            return book.Id;
        }

        public int UpdateBook(Book book)
        {
            var bookFromDb = context.Books.SingleOrDefault(x => x.Id == book.Id);
            if (bookFromDb == null)
            {
                return 0;
            }
            else
            {
                bookFromDb.Title = book.Title;
                bookFromDb.Author = book.Author;
                bookFromDb.ISBN = book.ISBN;
                bookFromDb.Price = book.Price;
                context.Books.Update(bookFromDb);
                context.SaveChanges();
                return bookFromDb.Id;
            }
        }

        public void DeleteBook(int id)
        {
            var bookFromDb = context.Books.SingleOrDefault(x => x.Id == id);
            if (bookFromDb == null)
            {
                return;
            }
            else
            {
                context.Books.Remove(bookFromDb);
                context.SaveChanges();
            }
        }
    }
}
