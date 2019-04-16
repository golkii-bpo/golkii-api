using System.Net;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace GolkiiAPI
{
#pragma warning disable CS1591
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
           .UseKestrel(options =>
           {
               options.Limits.MaxConcurrentConnections = 100;
               options.Listen(IPAddress.Parse("0.0.0.0"), 5000);
           })
            .UseIISIntegration()
            .UseStartup<Startup>()
            .Build();

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();


    }
#pragma warning restore CS1591
}
