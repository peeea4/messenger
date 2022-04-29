using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Hubs;
using Server.Models;
using Server.Services;

namespace Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                .AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddSignalR();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            services
                .AddScoped<UsersService>()
                .AddScoped<ChatsService>()
                .AddScoped<MessagesService>()
                .AddScoped<ChatHub>()
                .AddSingleton<IDictionary<string, User>>(opts => new Dictionary<string, User>())
                .AddSingleton<IUserIdProvider, EmailIdProvider>();;

            services.AddDbContext<Context.Context>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = "ISSUER",

                        ValidateAudience = true,
                        ValidAudience = "AUDIENCE",
                        ValidateLifetime = true,

                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("mysupersecret_secretkey!123")),
                        ValidateIssuerSigningKey = true,
                    };
                });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
            });
        }
    }
}
