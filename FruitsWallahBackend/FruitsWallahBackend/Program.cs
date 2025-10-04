
using DocumentFormat.OpenXml.Office2016.Word.Symex;
using DocumentFormat.OpenXml.Spreadsheet;
using FruitsWallahBackend.Migrations;
using FruitsWallahBackend.Models;
using FruitsWallahBackend.Services;
using FruitsWallahBackend.Services.Iservices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FruitsWallahBackend.Data

{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddHttpClient();
            // Add services to the container.
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddAuthentication(Options =>
            {
                Options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                Options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(Options =>
            {
                Options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
                    ValidAudience = builder.Configuration["JwtSettings:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"]))
                };
            });
            // Add database connection with MySql
            builder.Services.AddDbContext<FruitsWallahDbContext>(options =>
              options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), new MySqlServerVersion(new Version(8, 0, 23))));

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("*") // React dev server
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });
            builder.Services.AddScoped<IJwtService, JwtService>();
            builder.Services.AddScoped<ISendEmail, SendEmail>();
            builder.Services.AddScoped<IEncryption, Encryption>();
            var app = builder.Build();

            //Adding a new superAdmin is there are no users(means running frist time) or sueradmins mail is not Registered as indexer any case anyone deleted from database

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<FruitsWallahDbContext>();
                    context.Database.EnsureCreated();
                    var admin = context.Users.FirstOrDefault(u => u.Email == "fruitswallah.in@gmail.com");
                    if (admin != null)
                    {
                        if (!admin.IsAdmin)
                        {
                            admin.IsAdmin = true;
                        }
                        context.SaveChanges();
                    }
                    if (!context.Users.Any() || admin == null)
                    {
                        var SuperAdmin = new User
                        {
                            Email = "fruitswallah.in@gmail.com",
                            Name = "Fruitswallah Admin",
                            IsAdmin = true,
                            PhoneNumber = "6389285501"
                        };
                        context.Users.Add(SuperAdmin);
                        context.SaveChanges();
                        var SuperAuth = new UserAuth
                        {
                            UserID = SuperAdmin.UserId,
                            HashPassword = BCrypt.Net.BCrypt.EnhancedHashPassword("Prabhat@123", 13)
                        };
                        context.Add(SuperAuth);
                        context.SaveChanges();
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseAuthentication();

            app.UseCors();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
