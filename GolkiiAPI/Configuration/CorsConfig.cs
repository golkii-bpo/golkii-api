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
                       // .WithOrigins("http://localhost:3000","http://192.168.1.*")
                        .AllowAnyOrigin()
                        .SetIsOriginAllowedToAllowWildcardSubdomains()
                        .WithMethods("OPTIONS","GET","POST")
                        .AllowAnyHeader();
                });
            });
        }

        internal static void UseCors(IApplicationBuilder app)
        {
            app.UseCors();
        }
    }
}
