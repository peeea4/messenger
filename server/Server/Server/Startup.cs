using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Server.Context;
using Server.Hubs;
using Server.Mappings;
using Server.Models;
using Server.Services;
using Server.Services.Helpers;

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

            services.AddAutoMapper(
                typeof(UserProfile),
                typeof(ChatProfile));

            services
                .AddScoped<UsersService>()
                .AddScoped<ChatsService>()
                .AddScoped<MessagesService>()
                .AddScoped<ChatHub>()
                .AddScoped<MessengerContext>()
                .AddSingleton<IDictionary<string, User>>(opts => new Dictionary<string, User>())
                .AddSingleton<IUserIdProvider, EmailIdProvider>();;
            
            var contextOptions = new DbContextOptionsBuilder<DbContext>()
                .UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
                .Options;
            
            services.AddSingleton<DbContextOptions>(contextOptions);
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = JwtTokenCreationSettings.Issuer,

                        ValidateAudience = true,
                        ValidAudience = JwtTokenCreationSettings.Audience,
                        ValidateLifetime = true,
                        
                        IssuerSigningKey = JwtTokenCreationSettings.SymmetricSecurityKey,
                        ValidateIssuerSigningKey = true,
                    };
                    
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) &&
                                (path.StartsWithSegments("/chat")))
                            {
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddCors(options =>
            {
                options.AddPolicy("defaultPolicy",
                    builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "wwwroot/Images")),
                RequestPath = "/Images"
            });

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors("defaultPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
            });
        }
    }
}
