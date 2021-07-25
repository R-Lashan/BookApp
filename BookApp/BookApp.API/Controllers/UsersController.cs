using BookApp.API.Interfaces;
using BookApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BookApp.API.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;
        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public List<User> GetAll()
        {
            return userService.GetAllUsers();
        }

        [HttpGet("{id}")]
        public User Get([FromRoute] int id)
        {
            return userService.GetUserById(id);
        }

        [HttpGet("email/{email}")]
        public User GetByEmail([FromRoute] string email)
        {
            return userService.GetUserByEmail(email);
        }

        [HttpPost]
        public int Add([FromBody] User user)
        {
            return userService.AddUser(user);
        }

        [HttpGet("{id}/books")]
        public List<Book> GetBooksByUserId([FromRoute] int id)
        {
            return userService.GetBooksByUserId(id);
        }
    }
}
