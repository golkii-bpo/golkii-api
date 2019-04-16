using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace GolkiiAPI.Configuration
{
    public static class CorsConfig
    {

        public static void AddCorsPolicy(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                builder =>
                {
                    builder
                        .WithOrigins("http://*")
                        .WithHeaders("*")
                        .WithMethods("*");
                });
            });
        }

        internal static void UseCors(IApplicationBuilder app)
        {
            app.UseCors();
        }
    }
}
