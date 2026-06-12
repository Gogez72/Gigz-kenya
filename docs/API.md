# GigzKe API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### 1. Register Worker
**POST** `/auth/register/worker`

**Request Body:**
```json
{
  "email": "worker@example.com",
  "password": "securePassword123",
  "phoneNumber": "+254712345678",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "message": "Worker registered successfully",
  "user": {
    "id": 1,
    "email": "worker@example.com",
    "phoneNumber": "+254712345678",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "worker"
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 2. Register Customer
**POST** `/auth/register/customer`

**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "securePassword123",
  "phoneNumber": "+254712345678",
  "firstName": "Jane",
  "lastName": "Smith"
}
```

**Response (201):**
Same as Register Worker, but `userType: "customer"`

---

### 3. Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "worker@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "worker@example.com",
    "phoneNumber": "+254712345678",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "worker"
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 4. Refresh Token
**POST** `/auth/refresh-token`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "message": "Token refreshed successfully",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 5. Setup Till Credentials (Workers Only)
**POST** `/auth/setup-till`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "till_number": "123456",
  "merchant_id": "MERCHANT_001",
  "phone_number": "+254712345678"
}
```

**Response (200):**
```json
{
  "message": "Till credentials setup successfully",
  "till": {
    "id": 1,
    "workerId": 1,
    "tillNumber": "123456",
    "merchantId": "MERCHANT_001",
    "phoneNumber": "+254712345678",
    "isActive": true
  }
}
```

---

### 6. Get Current User
**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "User retrieved successfully",
  "user": {
    "id": 1,
    "email": "worker@example.com",
    "phoneNumber": "+254712345678",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "worker",
    "isVerified": false
  }
}
```

---

## Error Responses

**400 Bad Request:**
```json
{
  "error": "All fields are required"
}
```

**401 Unauthorized:**
```json
{
  "error": "Invalid or expired token"
}
```

**404 Not Found:**
```json
{
  "error": "User not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal Server Error"
}
```

---

## Testing with cURL

### Register a Worker
```bash
curl -X POST http://localhost:5000/api/auth/register/worker \
  -H "Content-Type: application/json" \
  -d '{
    "email": "worker@test.com",
    "password": "password123",
    "phoneNumber": "+254712345678",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "worker@test.com",
    "password": "password123"
  }'
```

### Get Current User (Protected)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your_token_here>"
```

---

## Sprint 1 Status
✅ Authentication & User Setup Complete
- Worker & Customer registration
- Login with JWT tokens
- Till credential setup
- Protected routes

**Next:** Sprint 2 - Worker Dashboard & Profile
