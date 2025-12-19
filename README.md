# Nykaa E-commerce Website

A full-stack e-commerce website similar to Nykaa built with React, Node.js, Express, and MongoDB.

## Features

### Frontend
- **React + Vite** for fast development
- **React Router DOM** for navigation
- **Styled Components** for styling (no CSS files)
- **Context API** for state management (Cart & Auth)
- **JWT Authentication** with protected routes
- **Responsive design** for mobile and desktop

### Backend
- **Node.js + Express** REST API
- **MongoDB** with Mongoose ODM
- **JWT** authentication & authorization
- **bcrypt** for password hashing
- **CORS** enabled for cross-origin requests

### Pages & Features
1. **Home Page** - Category showcase
2. **Categories** - Product types by category
3. **Products** - Product listing with filters
4. **Product Detail** - Individual product view with add to cart
5. **Cart** - Shopping cart with quantity controls
6. **Checkout** - Order placement with shipping info
7. **Authentication** - Login/Signup pages
8. **Admin Panel** - Product, user, and order management

## Project Structure

```
ecom/
├── ecom-frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   │   ├── Home.jsx
│   │   │   │   └── Home.styles.js
│   │   │   ├── Categories/
│   │   │   ├── Products/
│   │   │   ├── ProductDetail/
│   │   │   ├── Cart/
│   │   │   ├── Checkout/
│   │   │   ├── Auth/
│   │   │   └── Admin/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── ecom-backend/
    ├── config/
    │   └── db.js
    ├── models/
    │   ├── User.js
    │   ├── Product.js
    │   └── Order.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── productRoutes.js
    │   ├── orderRoutes.js
    │   └── adminRoutes.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── adminMiddleware.js
    ├── index.js
    ├── seedData.js
    └── .env
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd ecom-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/nykaa-ecom
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
```

4. Seed the database with sample data:
```bash
node seedData.js
```

5. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd ecom-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products (with optional category/type filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID

### Admin
- `GET /api/admin/users` - Get all users (Admin only)
- `GET /api/admin/orders` - Get all orders (Admin only)
- `PUT /api/admin/orders/:id` - Update order status (Admin only)

## Sample API Requests (Postman)

### 1. Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Login User
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Get Products
```
GET http://localhost:5000/api/products?category=skincare&type=serum
```

### 4. Create Order
```
POST http://localhost:5000/api/orders
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "products": [
    {
      "product": "PRODUCT_ID",
      "quantity": 2,
      "price": 1299
    }
  ],
  "total": 2598,
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  }
}
```

### 5. Admin - Add Product
```
POST http://localhost:5000/api/products
Authorization: Bearer ADMIN_JWT_TOKEN
Content-Type: application/json

{
  "name": "New Product",
  "price": 999,
  "category": "skincare",
  "type": "serum",
  "quantity": 50,
  "discount": 10,
  "image": "https://example.com/image.jpg",
  "description": "Product description",
  "brand": "Brand Name"
}
```

## Default Admin Credentials
- **Email:** admin@nykaa.com
- **Password:** admin123

## Frontend-Backend Connection

The frontend connects to the backend through:

1. **API Service** (`src/services/api.js`) - Centralized API calls
2. **Axios Interceptors** - Automatic JWT token attachment
3. **Context API** - Global state management for auth and cart
4. **Protected Routes** - Route-level authentication checks

## Key Features Implemented

### User Flow
1. Browse categories → Select type → View products
2. Click product → View details → Add to cart
3. View cart → Adjust quantities → Proceed to checkout
4. Login/Register → Enter shipping info → Place order

### Admin Flow
1. Login with admin credentials
2. Access admin dashboard
3. Manage products (CRUD operations)
4. View users and orders
5. Update order status

### Technical Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Responsive design
- Error handling
- Loading states
- Form validation

## Technologies Used

### Frontend
- React 18
- Vite
- React Router DOM
- Styled Components
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- dotenv

## Development Notes

- All styling uses Styled Components (no CSS files)
- Each page has separate .jsx and .styles.js files
- Context API manages global state
- Protected routes ensure authentication
- Admin routes require admin privileges
- Responsive design for mobile compatibility

## Future Enhancements

- Payment gateway integration
- Email notifications
- Product reviews and ratings
- Wishlist functionality
- Advanced search and filters
- Order tracking
- Inventory management
- Multi-language support