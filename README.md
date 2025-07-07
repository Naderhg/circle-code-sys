# Circle Code Shipping System

## Project Overview

Circle Code Shipping System is a comprehensive logistics management platform designed to streamline shipping operations for e-commerce businesses. The system connects merchants, delivery agents, and administrators in a unified platform for efficient package tracking, delivery management, and financial transactions.

## System Architecture

The project follows an MVC (Model-View-Controller) architecture:

- **Frontend (Views)**: HTML, CSS, JavaScript with Bootstrap for responsive design
- **Backend (Controllers & Models)**: 
  - MVC framework (e.g., Laravel, Django, ASP.NET MVC, Spring MVC)
  - Models for data management and business logic
  - Controllers for handling requests and responses
  - Views for rendering dynamic content
- **Database**: Relational database (MySQL/PostgreSQL) for transactional data

## Directory Structure

```
/
├── index.html              # Public-facing landing page
├── about.html              # About page
├── services.html           # Services page
├── contact.html            # Contact page
├── Login/                  # Authentication system
│   ├── index.html          # Login/registration page
│   ├── style.css           # Login styles
│   ├── script.js           # Login functionality
│   └── framework.css       # Additional styling
├── System/                 # Admin dashboard and core functionality
│   ├── index.html          # Dashboard
│   ├── sellers.html        # Merchant management
│   ├── agents.html         # Delivery agent management
│   ├── shipments.html      # Shipment management
│   ├── zones.html          # Delivery zone management
│   ├── wallet.html         # Financial management
│   ├── users.html          # User management
│   ├── settings.html       # System settings
│   ├── reports.html        # Analytics and reporting
│   ├── style.css           # Dashboard styles
│   └── script.js           # Dashboard functionality
├── js/                     # JavaScript files
├── css/                    # CSS files
└── image/                  # Image assets
```

## Core Features & MVC Implementation

### 1. Authentication System

The authentication system supports multiple user roles (admin, seller, agent) with different permissions.

**MVC Implementation:**
- **Model**: User model with role-based permissions
- **Views**: Login/index.html for user interface
- **Controller**: AuthController for login, registration, and password recovery

**Controller Actions:**
- `login()` - User login
- `register()` - User registration
- `forgotPassword()` - Password recovery
- `resetPassword()` - Reset user password

**Authentication Flow:**
1. User submits credentials via Login/index.html
2. AuthController validates credentials and creates a session
3. User is redirected to appropriate dashboard based on role
4. Session includes user role for permission-based access control

### 2. Dashboard (System/index.html)

The dashboard displays key metrics and recent activities.

**MVC Implementation:**
- **Model**: Dashboard model for aggregating statistics
- **View**: System/index.html
- **Controller**: DashboardController

**Controller Actions:**
- `index()` - Render dashboard with summary statistics
- `getRecentShipments()` - Get recent shipment data
- `getActivity()` - Get recent system activity

**View Data Structure:**
```php
$viewData = [
  'total_shipments' => 1247,
  'in_transit' => 89,
  'collection_amount' => 24580,
  'recent_shipments' => [
    [
      'id' => 'SHP-001',
      'customer' => 'John Doe',
      'status' => 'PENDING',
      'amount' => 125.00
    ]
  ]
];
```

### 3. Merchant Management (System/sellers.html)

Manages seller accounts and their shipments.

**MVC Implementation:**
- **Model**: Merchant model
- **View**: System/sellers.html
- **Controller**: MerchantController

**Controller Actions:**
- `index()` - List all merchants (with pagination)
- `show($id)` - Show specific merchant details
- `create()` - Show merchant creation form
- `store()` - Create new merchant
- `edit($id)` - Show merchant edit form
- `update($id)` - Update merchant details
- `destroy($id)` - Delete merchant

**Model Structure:**
```php
class Merchant {
  public $id;          // MCH-001
  public $name;        // Tech Store
  public $email;       // tech@store.com
  public $businessType; // Electronics
  public $location;    // Downtown
  public $orders;      // 156
  public $revenue;     // 12450
  public $status;      // ACTIVE
  public $createdAt;   // 2023-05-15
  
  // Relationships
  public function user() { /* returns associated user */ }
  public function shipments() { /* returns shipments */ }
}
```

### 4. Agent Management (System/agents.html)

Manages delivery agents and their performance.

**MVC Implementation:**
- **Model**: Agent model
- **View**: System/agents.html
- **Controller**: AgentController

**Controller Actions:**
- `index()` - List all agents (with pagination)
- `show($id)` - Show specific agent details
- `create()` - Show agent creation form
- `store()` - Create new agent
- `edit($id)` - Show agent edit form
- `update($id)` - Update agent details
- `destroy($id)` - Delete agent

**Model Structure:**
```php
class Agent {
  public $id;          // AGT-001
  public $name;        // Ahmed Khaled
  public $email;       // ahmed@example.com
  public $zone;        // Downtown
  public $contact;     // +20 123-456-7890
  public $deliveries;  // 128
  public $rating;      // 4.5
  public $status;      // ACTIVE
  public $createdAt;   // 2023-05-15
  
  // Relationships
  public function user() { /* returns associated user */ }
  public function zone() { /* returns zone */ }
  public function shipments() { /* returns shipments */ }
}
```

### 5. Shipment Management (System/shipments.html)

Core functionality for tracking and managing shipments.

**MVC Implementation:**
- **Model**: Shipment model
- **View**: System/shipments.html
- **Controller**: ShipmentController

**Controller Actions:**
- `index()` - List all shipments (with filters and pagination)
- `show($id)` - Show specific shipment details
- `create()` - Show shipment creation form
- `store()` - Create new shipment
- `edit($id)` - Show shipment edit form
- `update($id)` - Update shipment details
- `updateStatus($id)` - Update shipment status
- `destroy($id)` - Delete shipment

**Query Parameters for Shipments:**
- `status` - Filter by shipment status (new, in-transit, delivered, etc.)
- `startDate` & `endDate` - Filter by date range
- `merchant_id` - Filter by merchant
- `agent_id` - Filter by delivery agent

**Model Structure:**
```php
class Shipment {
  public $id;           // SHP-001
  public $customerName; // John Doe
  public $merchantId;   // MCH-001
  public $agentId;      // AGT-001
  public $date;         // 2023-05-15
  public $amount;       // 125.00
  public $status;       // NEW
  
  // Relationships
  public function merchant() { /* returns merchant */ }
  public function agent() { /* returns agent */ }
  public function trackingHistory() { /* returns tracking history */ }
}
```

### 6. Zone Management (System/zones.html)

Manages delivery zones and their associated agents.

**MVC Implementation:**
- **Model**: Zone model
- **View**: System/zones.html
- **Controller**: ZoneController

**Controller Actions:**
- `index()` - List all zones
- `show($id)` - Show specific zone details
- `create()` - Show zone creation form
- `store()` - Create new zone
- `edit($id)` - Show zone edit form
- `update($id)` - Update zone details
- `destroy($id)` - Delete zone
- `getAgents($id)` - Get agents in a zone

### 7. Financial Management (System/wallet.html)

Manages financial transactions and balances.

**MVC Implementation:**
- **Model**: Transaction model, Wallet model
- **View**: System/wallet.html
- **Controller**: WalletController

**Controller Actions:**
- `index()` - Show wallet dashboard with balance
- `transactions()` - List transactions (with pagination)
- `withdraw()` - Process withdrawal
- `deposit()` - Process deposit

**View Data Structure:**
```php
$viewData = [
  'available_balance' => 24580.00,
  'pending_balance' => 8245.50,
  'total_revenue' => 156742.30,
  'transactions' => [
    [
      'id' => 'TRX-001',
      'type' => 'DEPOSIT',
      'amount' => 1250.00,
      'source' => 'Tech Store',
      'timestamp' => '2023-05-16T10:24:00Z'
    ]
  ]
];
```

### 8. User Management (System/users.html)

Manages system users across all roles.

**MVC Implementation:**
- **Model**: User model
- **View**: System/users.html
- **Controller**: UserController

**Controller Actions:**
- `index()` - List all users (with pagination)
- `show($id)` - Show specific user details
- `create()` - Show user creation form
- `store()` - Create new user
- `edit($id)` - Show user edit form
- `update($id)` - Update user details
- `destroy($id)` - Delete user

### 9. Reports & Analytics (System/reports.html)

Generates business reports and analytics.

**MVC Implementation:**
- **Model**: Report model
- **View**: System/reports.html
- **Controller**: ReportController

**Controller Actions:**
- `shipments()` - Generate shipment reports
- `revenue()` - Generate revenue reports
- `agents()` - Generate agent performance reports

## Date Filtering Implementation

The system includes a date filter component that works across multiple pages:

1. **Frontend Implementation:**
   - Date filter UI in System/style.css
   - Filter logic in System/script.js (filterTableByDateRange function)
   - Form submission for date filtering

2. **Backend Implementation:**
   - Controller methods accept `startDate` and `endDate` parameters
   - Model queries filter by date range
   - Views render filtered data
   - Date format should be YYYY-MM-DD

## Database Schema (Recommended)

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'seller', 'agent') NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Merchants Table
```sql
CREATE TABLE merchants (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id),
  business_name VARCHAR(100) NOT NULL,
  business_type VARCHAR(50),
  location VARCHAR(100),
  contact VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Agents Table
```sql
CREATE TABLE agents (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id),
  zone_id VARCHAR(36) REFERENCES zones(id),
  rating DECIMAL(3,2) DEFAULT 0,
  deliveries INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Zones Table
```sql
CREATE TABLE zones (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Shipments Table
```sql
CREATE TABLE shipments (
  id VARCHAR(36) PRIMARY KEY,
  merchant_id VARCHAR(36) REFERENCES merchants(id),
  agent_id VARCHAR(36) REFERENCES agents(id),
  customer_name VARCHAR(100) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('new', 'in-stock', 'in-transit', 'delivered', 'returned', 'failed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) REFERENCES users(id),
  type ENUM('deposit', 'withdrawal', 'fee') NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Authentication & Security

1. **Session Management:**
   - Use secure, HTTP-only cookies for session storage
   - Implement CSRF protection for forms
   - Session timeout after period of inactivity

2. **Password Security:**
   - Use bcrypt or Argon2 for password hashing
   - Enforce password complexity requirements
   - Implement rate limiting for login attempts

3. **Security Best Practices:**
   - Validate all form input data
   - Implement role-based access control for all controllers
   - Use prepared statements for database queries to prevent SQL injection

## Development Setup

1. Set up your preferred MVC framework
2. Create database using the schema provided
3. Implement the models and controllers
4. Connect frontend forms to your controllers
5. Test the authentication flow
6. Implement data filtering and pagination

## Frontend-Backend Integration

The frontend is designed to work with an MVC backend. Key integration points:

1. **Form Actions**: Update form action attributes to point to controller endpoints
2. **AJAX Requests**: Modify AJAX requests to use controller routes
3. **Data Rendering**: Ensure controllers pass properly structured data to views
4. **Date Filters**: Implement controller methods to handle date filtering
5. **Pagination**: Add pagination support in controllers

## Template Integration

For a full MVC implementation, you may want to convert the static HTML files to template files for your framework:

1. **Laravel**: Convert to Blade templates (.blade.php)
2. **Django**: Convert to Django templates (.html with template tags)
3. **ASP.NET MVC**: Convert to Razor views (.cshtml)
4. **Spring MVC**: Convert to Thymeleaf templates (.html with th: attributes)

## Deployment Recommendations

1. **Environment**: Development, Staging, and Production environments
2. **Server**: Apache or Nginx with PHP/Python/Node.js/etc.
3. **Database**: MySQL or PostgreSQL
4. **Caching**: Implement page and data caching
5. **Monitoring**: Implement logging and error tracking

## Additional Notes

- The system is designed with responsive UI that works on desktop and mobile devices
- Dark mode support is built into the frontend
- The frontend includes client-side validation, but server-side validation is essential
- All dates in the system use YYYY-MM-DD format for consistency