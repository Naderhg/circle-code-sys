# ASP.NET API Setup Guide for Circle Code

This guide provides steps for setting up the ASP.NET API backend for the Circle Code Shipping System.

## Prerequisites

- .NET 6.0 SDK or later
- Visual Studio 2022 or Visual Studio Code
- SQL Server (or SQL Server Express)
- Git

## Getting Started

### 1. Create a new ASP.NET Web API project

```shell
dotnet new webapi -n CircleCode.Api
cd CircleCode.Api
```

### 2. Add required NuGet packages

```shell
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
dotnet add package FluentValidation.AspNetCore
dotnet add package Swashbuckle.AspNetCore
dotnet add package Microsoft.AspNetCore.Mvc.Versioning
dotnet add package Microsoft.AspNetCore.Mvc.Versioning.ApiExplorer
```

### 3. Project Structure

Organize your project with the following structure:

```
CircleCode.Api/
├── Controllers/
│   ├── AuthController.cs
│   ├── ShipmentsController.cs
│   ├── MerchantsController.cs
│   ├── AgentsController.cs
│   ├── ZonesController.cs
│   ├── UsersController.cs
│   └── WalletController.cs
├── Data/
│   ├── ApplicationDbContext.cs
│   ├── Repositories/
│   │   ├── IRepository.cs
│   │   ├── Repository.cs
│   │   └── [EntityName]Repository.cs
│   └── UnitOfWork/
│       ├── IUnitOfWork.cs
│       └── UnitOfWork.cs
├── DTOs/
│   ├── AuthDto.cs
│   ├── ShipmentDto.cs
│   ├── MerchantDto.cs
│   └── ...
├── Entities/
│   ├── User.cs
│   ├── Shipment.cs
│   ├── Merchant.cs
│   └── ...
├── Helpers/
│   ├── ApiResponse.cs
│   ├── PaginatedList.cs
│   └── ...
├── Services/
│   ├── IAuthService.cs
│   ├── AuthService.cs
│   ├── IShipmentService.cs
│   └── ...
├── Middleware/
│   ├── ExceptionMiddleware.cs
│   └── ...
└── Program.cs
```

### 4. Configure JWT Authentication

Update `Program.cs` with the following JWT configuration:

```csharp
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
```

### 5. Configure CORS

Add CORS configuration to allow requests from the frontend:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins("http://localhost:3000", "https://circlecode.com")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

// In the Configure section
app.UseCors("AllowFrontend");
```

### 6. Create API Response Helpers

Create standardized API responses using helper classes:

```csharp
// ApiResponse.cs
public class ApiResponse<T>
{
    public T Data { get; set; }
    public string Message { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    public ApiResponse(T data, string message = null)
    {
        Data = data;
        Message = message ?? "Operation successful";
    }
}

// PaginatedResponse.cs
public class PaginatedResponse<T> : ApiResponse<IEnumerable<T>>
{
    public int Total { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }

    public PaginatedResponse(IEnumerable<T> data, int count, int page, int pageSize) 
        : base(data)
    {
        Total = count;
        Page = page;
        PageSize = pageSize;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
    }
}
```

### 7. Create Base Controller

Create a base API controller with common functionality:

```csharp
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[Produces("application/json")]
public abstract class BaseApiController : ControllerBase
{
    protected ActionResult<ApiResponse<T>> ApiOk<T>(T data, string message = null)
    {
        return Ok(new ApiResponse<T>(data, message));
    }

    protected ActionResult<ApiResponse<T>> ApiBadRequest<T>(string message)
    {
        return BadRequest(new ApiError
        {
            Code = "BAD_REQUEST",
            Message = message
        });
    }

    protected ActionResult<PaginatedResponse<T>> ApiOk<T>(
        IEnumerable<T> data, int count, int page, int pageSize)
    {
        return Ok(new PaginatedResponse<T>(data, count, page, pageSize));
    }
}
```

### 8. Implement Authentication Controller

Create the authentication controller for user login and registration:

```csharp
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/auth")]
[ApiController]
public class AuthController : BaseApiController
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    [ProducesResponseType(typeof(ApiResponse<AuthResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var result = await _authService.LoginAsync(loginDto);
        return ApiOk(result, "Login successful");
    }

    [HttpPost("register")]
    [ProducesResponseType(typeof(ApiResponse<AuthResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register(RegisterDto registerDto)
    {
        var result = await _authService.RegisterAsync(registerDto);
        return ApiOk(result, "Registration successful");
    }

    [HttpPost("refresh")]
    [ProducesResponseType(typeof(ApiResponse<AuthResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RefreshToken(RefreshTokenDto refreshTokenDto)
    {
        var result = await _authService.RefreshTokenAsync(refreshTokenDto.RefreshToken);
        return ApiOk(result, "Token refreshed successfully");
    }

    [Authorize]
    [HttpPost("logout")]
    [ProducesResponseType(typeof(ApiResponse<bool>), StatusCodes.Status200OK)]
    public async Task<IActionResult> Logout()
    {
        await _authService.LogoutAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        return ApiOk(true, "Logged out successfully");
    }
}
```

### 9. Implement Shipment Controller

Create the shipment controller for managing shipments:

```csharp
[ApiVersion("1.0")]
[Authorize]
[Route("api/v{version:apiVersion}/shipments")]
[ApiController]
public class ShipmentsController : BaseApiController
{
    private readonly IShipmentService _shipmentService;

    public ShipmentsController(IShipmentService shipmentService)
    {
        _shipmentService = shipmentService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(PaginatedResponse<ShipmentDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetShipments(
        [FromQuery] ShipmentFilterDto filterDto,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var (shipments, totalCount) = await _shipmentService.GetShipmentsAsync(filterDto, page, pageSize);
        return ApiOk(shipments, totalCount, page, pageSize);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ApiResponse<ShipmentDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetShipment(string id)
    {
        var shipment = await _shipmentService.GetShipmentByIdAsync(id);
        return ApiOk(shipment);
    }

    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<ShipmentDto>), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateShipment(CreateShipmentDto shipmentDto)
    {
        var shipment = await _shipmentService.CreateShipmentAsync(shipmentDto);
        return CreatedAtAction(nameof(GetShipment), new { id = shipment.Id }, 
            new ApiResponse<ShipmentDto>(shipment, "Shipment created successfully"));
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(ApiResponse<ShipmentDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateShipment(string id, UpdateShipmentDto shipmentDto)
    {
        var shipment = await _shipmentService.UpdateShipmentAsync(id, shipmentDto);
        return ApiOk(shipment, "Shipment updated successfully");
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(ApiResponse<bool>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteShipment(string id)
    {
        var result = await _shipmentService.DeleteShipmentAsync(id);
        return ApiOk(result, "Shipment deleted successfully");
    }

    [HttpPut("{id}/status/{status}")]
    [ProducesResponseType(typeof(ApiResponse<ShipmentDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateShipmentStatus(string id, string status)
    {
        var shipment = await _shipmentService.UpdateShipmentStatusAsync(id, status);
        return ApiOk(shipment, "Shipment status updated successfully");
    }

    [HttpGet("export")]
    [ProducesResponseType(typeof(FileResult), StatusCodes.Status200OK)]
    public async Task<IActionResult> ExportShipments([FromQuery] ShipmentFilterDto filterDto)
    {
        var fileStream = await _shipmentService.ExportShipmentsAsync(filterDto);
        return File(fileStream, "text/csv", $"shipments_{DateTime.Now:yyyyMMdd}.csv");
    }
}
```

### 10. Database Configuration

Configure Entity Framework Core for database access:

```csharp
// In Program.cs
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// In appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=CircleCodeDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

### 11. Entity Framework Migrations

Create and apply database migrations:

```shell
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 12. Swagger Configuration

Configure Swagger documentation:

```csharp
// In Program.cs
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Circle Code API",
        Version = "v1",
        Description = "API for Circle Code Shipping System"
    });
    
    // Add JWT authentication to Swagger
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "JWT Authentication",
        Description = "Enter JWT Bearer token **_only_**",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };
    c.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {securityScheme, new string[] { }}
    });
    
    // Include XML comments
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

// Enable XML documentation generation in .csproj
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
  <NoWarn>$(NoWarn);1591</NoWarn>
</PropertyGroup>
```

### 13. Configure API Versioning

Add API versioning support:

```csharp
// In Program.cs
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
});

builder.Services.AddVersionedApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV";
    options.SubstituteApiVersionInUrl = true;
});
```

## Integration Testing with the Frontend

1. Start the API project: `dotnet run`
2. Access Swagger documentation: `https://localhost:5001/swagger/index.html`
3. Test the endpoints with the frontend by setting the correct API URL in the frontend configuration

## Additional Resources

- [ASP.NET Core Web API documentation](https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-6.0)
- [Entity Framework Core documentation](https://docs.microsoft.com/en-us/ef/core/)
- [JWT Authentication in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-6.0) 