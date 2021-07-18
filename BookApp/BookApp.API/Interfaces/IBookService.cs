using BookApp.API.Models;
using System.Collections.Generic;

namespace BookApp.API.Interfaces
{
    public interface IBookService
    {
        List<Book> GetAllBooks();
        Book GetBookById(int id);
        int AddBook(Book book);
        int UpdateBook(Book book);
        void DeleteBook(int id);
    }
}
