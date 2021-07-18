using BookApp.API.Interfaces;
using BookApp.API.Models;
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
            return context.Users.SingleOrDefault(x => x.Id == id);
        }

        public int AddUser(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
            return user.Id;
        }
    }
}
