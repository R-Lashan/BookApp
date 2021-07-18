using BookApp.API.Models;
using System.Linq;

namespace BookApp.API.SeedWork
{
    public static class Seed
    {
        public static DataContext SeedAll(this DataContext context)
        {
            var admin = new Admin
            {
                Name = "Admin",
                Email = "admin@gmail.com",
                Password = "admin"
            };

            var adminFromDb = context.Admins.FirstOrDefault();
            if (adminFromDb == null) { context.Add(admin); }

            context.SaveChanges();
            return context;
        }
    }
}
