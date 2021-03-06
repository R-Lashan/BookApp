using BookApp.API.Interfaces;
using BookApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace BookApp.API.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext context;
        public UserService(DataContext context)
        {
            this.context = context;
        }

        public List<User> GetAllUsers()
        {
            return context.Users.ToList();
        }

        public User GetUserById(int id)
        {
            return context.Users.FirstOrDefault(x => x.Id == id);
        }
        public User GetUserByEmail(string email)
        {
            var user = context.Users.FirstOrDefault(x => x.Email == email);
            return user;
        }

        public int AddUser(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
            return user.Id;
        }
        public User UpdateUser(User user)
        {
            var userFromDb = context.Users.SingleOrDefault(x => x.Id == user.Id);
            if (userFromDb == null)
            {
                return new User();
            }
            else
            {
                userFromDb.Name = user.Name;
                userFromDb.Email = user.Email;
                userFromDb.Password = user.Password;
                context.Users.Update(userFromDb);
                context.SaveChanges();
                return userFromDb;
            }
        }

        public void DeleteUser(int id)
        {
            var userFromDb = context.Users.SingleOrDefault(x => x.Id == id);
            if (userFromDb == null)
            {
                return;
            }
            else
            {
                context.Users.Remove(userFromDb);
                context.SaveChanges();
            }
        }

        public List<Book> GetBooksByUserId(int userId)
        {
            var invoices = context.Invoices.Where(x => x.UserId == userId).ToList();
            var bookList = new List<Book> { };
            foreach (var invoice in invoices)
            {
                var bookInvoices = context.BookInvoice.Include(x => x.Book).Where(x => x.InvoiceId == invoice.Id).ToList();

                foreach (var bi in bookInvoices)
                {
                    bi.Book.BookInvoice = null;
                    bookList.Add(bi.Book);
                }
            }
            return bookList;
        }
    }
}
