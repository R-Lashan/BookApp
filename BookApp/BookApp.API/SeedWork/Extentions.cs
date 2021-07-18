using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace BookApp.API.SeedWork
{
    public static class Extentions
    {
        public static void TrySeedDb(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            using (var context = serviceScope.ServiceProvider.GetService<DataContext>())
            {
                context.SeedAll();
            }
        }
    }
}
