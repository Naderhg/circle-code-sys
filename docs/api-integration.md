# Circle Code API Integration Guide

This document provides guidelines for the ASP.NET API backend implementation to work with the Circle Code frontend.

## API Architecture

The frontend is designed to work with a RESTful API built on ASP.NET. The API should follow these principles:

- RESTful design
- JSON as the data exchange format
- Bearer token authentication
- Proper HTTP status codes
- Pagination for list endpoints
- Filtering capabilities
- Proper error handling with consistent error responses

## Authentication

The API should implement JWT (JSON Web Token) authentication:

- `POST /api/v1/auth/login` - Authenticate user
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Invalidate tokens

### Token Structure

The frontend expects the following from authentication endpoints:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5...",
  "user": {
    "id": "usr_123456",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "ADMIN"
  }
}
```

## API Response Format

All API responses should follow a consistent format:

### Success Response

```json
{
  "data": { ... },  // The actual response data
  "message": "Operation successful",  // Optional success message
  "timestamp": "2023-07-15T08:30:00Z"
}
```

### List Response with Pagination

```json
{
  "data": [ ... ],  // Array of items
  "total": 247,     // Total number of items
  "page": 1,        // Current page number
  "pageSize": 10,   // Items per page
  "totalPages": 25, // Total number of pages
  "message": "Operation successful",
  "timestamp": "2023-07-15T08:30:00Z"
}
```

### Error Response

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request was invalid",
    "details": {
      "field": "error message"
    }
  },
  "timestamp": "2023-07-15T08:30:00Z"
}
```

## Endpoints

The frontend expects the following endpoints:

### Shipments

| Method | Endpoint                       | Description                      |
|--------|-----------------------------|----------------------------------|
| GET    | /api/v1/shipments          | List all shipments with pagination |
| GET    | /api/v1/shipments/{id}     | Get shipment details               |
| POST   | /api/v1/shipments          | Create new shipment                |
| PUT    | /api/v1/shipments/{id}     | Update shipment                    |
| DELETE | /api/v1/shipments/{id}     | Delete shipment                    |
| PUT    | /api/v1/shipments/{id}/status/{status} | Update shipment status |
| GET    | /api/v1/shipments/filter   | Filter shipments                   |
| GET    | /api/v1/shipments/export   | Export shipments to CSV/Excel      |

### Merchants

| Method | Endpoint                       | Description                      |
|--------|-----------------------------|----------------------------------|
| GET    | /api/v1/merchants          | List all merchants with pagination |
| GET    | /api/v1/merchants/{id}     | Get merchant details              |
| POST   | /api/v1/merchants          | Create new merchant               |
| PUT    | /api/v1/merchants/{id}     | Update merchant                   |
| DELETE | /api/v1/merchants/{id}     | Delete merchant                   |
| GET    | /api/v1/merchants/{id}/shipments | Get merchant's shipments    |

### Agents

| Method | Endpoint                       | Description                      |
|--------|-----------------------------|----------------------------------|
| GET    | /api/v1/agents             | List all agents with pagination   |
| GET    | /api/v1/agents/{id}        | Get agent details                 |
| POST   | /api/v1/agents             | Create new agent                  |
| PUT    | /api/v1/agents/{id}        | Update agent                      |
| DELETE | /api/v1/agents/{id}        | Delete agent                      |
| GET    | /api/v1/agents/{id}/shipments | Get agent's shipments         |
| GET    | /api/v1/agents/zone/{zoneId} | Get agents in a zone           |

### Zones

| Method | Endpoint                       | Description                      |
|--------|-----------------------------|----------------------------------|
| GET    | /api/v1/zones              | List all zones                    |
| GET    | /api/v1/zones/{id}         | Get zone details                  |
| POST   | /api/v1/zones              | Create new zone                   |
| PUT    | /api/v1/zones/{id}         | Update zone                       |
| DELETE | /api/v1/zones/{id}         | Delete zone                       |
| GET    | /api/v1/zones/{id}/agents  | Get agents in a zone              |

### Users

| Method | Endpoint                       | Description                      |
|--------|-----------------------------|----------------------------------|
| GET    | /api/v1/users              | List all users with pagination    |
| GET    | /api/v1/users/{id}         | Get user details                  |
| POST   | /api/v1/users              | Create new user                   |
| PUT    | /api/v1/users/{id}         | Update user                       |
| DELETE | /api/v1/users/{id}         | Delete user                       |

### Wallet

| Method | Endpoint                       | Description                      |
|--------|-----------------------------|----------------------------------|
| GET    | /api/v1/wallet             | Get wallet dashboard              |
| GET    | /api/v1/wallet/transactions | Get wallet transactions          |
| GET    | /api/v1/wallet/balance     | Get wallet balance                |
| POST   | /api/v1/wallet/withdraw    | Withdraw funds                    |
| POST   | /api/v1/wallet/deposit     | Deposit funds                     |

## Data Models

### Shipment Model

```json
{
  "id": "SHP-001",
  "trackingNumber": "TRACK-123456",
  "customerName": "John Doe",
  "customerPhone": "+1234567890",
  "customerEmail": "john@example.com",
  "customerAddress": "123 Main St, City",
  "merchantId": "MCH-001",
  "merchant": {
    "id": "MCH-001",
    "name": "Tech Store",
    "email": "tech@store.com"
  },
  "agentId": "AGT-001",
  "agent": {
    "id": "AGT-001",
    "name": "Ahmed Khaled",
    "email": "ahmed@example.com"
  },
  "zoneId": "ZON-001",
  "zone": {
    "id": "ZON-001",
    "name": "Downtown"
  },
  "items": [
    {
      "name": "Smartphone",
      "quantity": 1,
      "price": 699.99
    }
  ],
  "packageDetails": {
    "weight": 1.5,
    "dimensions": {
      "length": 20,
      "width": 10,
      "height": 5
    },
    "description": "Electronic device"
  },
  "paymentDetails": {
    "amount": 699.99,
    "currency": "USD",
    "method": "CASH",
    "collectionStatus": "PENDING",
    "fees": 10.0
  },
  "dates": {
    "created": "2023-05-15T10:30:00Z",
    "pickup": "2023-05-15T14:00:00Z",
    "delivery": null,
    "expected": "2023-05-17T14:00:00Z"
  },
  "status": "IN_TRANSIT",
  "trackingHistory": [
    {
      "date": "2023-05-15T10:30:00Z",
      "status": "NEW",
      "description": "Order received",
      "location": "System"
    },
    {
      "date": "2023-05-15T14:00:00Z",
      "status": "IN_TRANSIT",
      "description": "Picked up from merchant",
      "location": "Tech Store - Downtown"
    }
  ],
  "notes": "Handle with care",
  "tags": ["electronics", "express"],
  "metadata": {
    "source": "web",
    "customerType": "returning"
  }
}
```

### Merchant Model

```json
{
  "id": "MCH-001",
  "name": "Tech Store",
  "email": "tech@store.com",
  "phone": "+1234567890",
  "address": "456 Commerce St, City",
  "businessType": "Electronics",
  "contactPerson": "Jane Smith",
  "logo": "https://example.com/logo.png",
  "status": "ACTIVE",
  "createdAt": "2023-01-15T10:00:00Z",
  "website": "https://techstore.com",
  "paymentDetails": {
    "accountNumber": "XXX-XXX-XXX",
    "bankName": "Example Bank",
    "paymentTerms": "NET_30"
  },
  "statistics": {
    "totalShipments": 156,
    "activeShipments": 23,
    "completedShipments": 133,
    "totalRevenue": 12450.75
  }
}
```

## CORS Configuration

The ASP.NET API should include proper CORS configuration to allow requests from the frontend:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddCors(options =>
    {
        options.AddPolicy("CorsPolicy",
            builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
    });
    
    // Other service configurations
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // Other middleware
    
    app.UseCors("CorsPolicy");
    
    // Other middleware
}
```

## Error Codes

The frontend expects consistent error codes to handle different error scenarios:

| Error Code              | HTTP Status | Description                             |
|-------------------------|-------------|-----------------------------------------|
| AUTHENTICATION_ERROR    | 401         | Authentication failed or token expired  |
| AUTHORIZATION_ERROR     | 403         | User lacks permission for this action   |
| VALIDATION_ERROR        | 400         | Invalid input or validation failed      |
| NOT_FOUND              | 404         | Requested resource not found            |
| CONFLICT               | 409         | Resource already exists or conflict     |
| SERVER_ERROR           | 500         | Internal server error                    |
| BAD_REQUEST            | 400         | Malformed request                       |

## API Versioning

The API should implement versioning to allow for future changes without breaking existing integrations:

```csharp
services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
});
```

## Swagger Documentation

The API should provide comprehensive Swagger documentation:

```csharp
services.AddSwaggerGen(c =>
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
});
```

## Testing

To facilitate frontend development before the backend is ready, we've implemented:

1. Mock API service layer that mimics the expected API behavior
2. Consistent data structures matching the expected API responses
3. Mock authentication flow for testing different user roles

For testing the integration, please provide a Swagger UI endpoint at `/swagger/index.html`. 