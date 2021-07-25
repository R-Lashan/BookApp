using BookApp.API.Models;
using System.Collections.Generic;

namespace BookApp.API.Interfaces
{
    public interface IUserService
    {
        List<User> GetAllUsers();
        User GetUserById(int id);
        User GetUserByEmail(string email);
        int AddUser(User user);
        List<Book> GetBooksByUserId(int userId);
    }
}
