using Microsoft.OpenApi.Models;

using Nest;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<IElasticClient>(_ => new ElasticClient(new ConnectionSettings(new Uri("http://elasticsearch:9200")).BasicAuthentication("elastic", "Password1").DefaultIndex("task").DefaultMappingFor<SearchApi.Infrastructure.Model.Task>(x => x.IdProperty(y => y.Id).IndexName("task"))));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: "CorsOrigins",
            policy =>
                {
                    policy.WithOrigins("http://localhost:8080", "http://localhost:8084").AllowAnyMethod().AllowAnyHeader();
                });
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(config =>
        {
            config.PreSerializeFilters.Add((document, request) =>
                {
                    var externalPath = !request.Headers.ContainsKey("x-envoy-original-path") ? string.Empty :
                                           request.Headers["x-envoy-original-path"].First().Replace("swagger/v1/swagger.json", string.Empty);
                    if (!string.IsNullOrWhiteSpace(externalPath))
                    {
                        var newPaths = new OpenApiPaths();
                        foreach (var path in document.Paths)
                        {
                            newPaths[$"{externalPath.TrimEnd('/')}{path.Key}"] = path.Value;
                        }

                        document.Paths = newPaths;
                    }
                });
        });
    app.UseSwaggerUI();
}

app.UseCors("CorsOrigins");
app.UseAuthorization();

app.MapControllers();

app.Run();
