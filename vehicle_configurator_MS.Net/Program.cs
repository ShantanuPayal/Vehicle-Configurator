using vehicle_configurator.Repository;
using vehicle_configurator.Services.Segments;
using Microsoft.EntityFrameworkCore;
using vehicle_configurator.Services.UserRegistration;
using vehicle_configurator.Services.Manufacturerss;
using vehicle_configurator.Services.Varient;
using vehicle_config.Repositories;
using vehicle_configurator.Services.Vehicle;
using vehicle_configurator.Services.Invoice;
using System.Text.Json.Serialization; // Add this namespace
using vehicle_configurator.Services.Components;
using vehicle_configurator.Services;
using vehicle_configurator.Models;

namespace vehicle_configurator
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddScoped<ISegmentService, SegmentServiceImpl>();

            builder.Services.AddScoped<IUser, UserRepositoryImpl>();
            builder.Services.AddScoped<IManufacturerRepository, ManufacturerRepository>();
            builder.Services.AddScoped<IModelRepository, ModelRepositoryImpl>();
            builder.Services.AddScoped<IAlternateComponentRepository, AlternateComponentRepositoryImpl>();
            builder.Services.AddScoped<IVehicleRepository, VehicleRepositoryImpl>();
            builder.Services.AddScoped<IInvoiceRepository, InvoiceRepositoryImpl>();
            builder.Services.AddScoped<IComponentRepository, ComponentRepository>();
            builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
            builder.Services.AddTransient<IMailService, MailService>();

            builder.Services.AddControllers().AddJsonOptions(x =>
                    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

            builder.Services.AddDbContext<ScottDbContext>(options =>
                options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy( builder =>
                                  {
                                      builder.WithOrigins("*")
                                      .AllowAnyHeader()
                                      .AllowAnyMethod();
                                  });
            });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
               
            }

            app.UseHttpsRedirection();
            
            app.UseAuthorization();

            app.UseCors();

            app.MapControllers();

            app.Run();
        }
    }
}