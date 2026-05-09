# School Management API

A RESTful backend API built using Node.js, Express.js, and MySQL for managing school data.  
The system allows users to add schools and retrieve schools sorted by geographical proximity to a user’s location.

---

## Features

- Add new schools to the database
- Retrieve schools sorted by proximity
- Haversine formula distance calculation
- Input validation middleware
- RESTful API architecture
- MySQL database integration
- Centralized error handling
- Environment variable configuration
- Postman API testing collection
- Live deployment on Render

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- Postman
- Render

---

## Live API

🌐 Live Backend URL:

https://school-management-api-9x6b.onrender.com

> Note: The API is hosted on Render free tier, so the first request may take 30–60 seconds if the server is waking up from inactivity.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |
| POST | `/api/addSchool` | Add a new school |
| GET | `/api/listSchools?latitude=28.6139&longitude=77.2090` | List schools sorted by proximity |
| GET | `/api/schools` | Get all schools |
| GET | `/api/schools/:id` | Get school by ID |

---

# Installation & Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/debapriya-25/school-management-api.git
cd school-management-api
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management

PORT=3000
NODE_ENV=development
```

---

## 4. Run Database Migration

```bash
npm run migrate
```

This will:
- Create the database
- Create the `schools` table
- Insert sample school data

---

## 5. Start Development Server

```bash
npm run dev
```

Production mode:

```bash
npm start
```

---

# API Documentation

---

## Root Endpoint

### GET `/`

Returns API information and available endpoints.

### Example Response

```json
{
  "status": "Success",
  "message": "School Management API is running successfully",
  "version": "1.0.0"
}
```

---

## Health Check

### GET `/health`

Checks server status.

### Example Response

```json
{
  "status": "OK",
  "message": "School Management API is running"
}
```

---

## Add School

### POST `/api/addSchool`

Adds a new school to the database.

### Request Body

```json
{
  "name": "Delhi Public School",
  "address": "New Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

### Success Response

```json
{
  "status": "Success",
  "message": "School added successfully"
}
```

---

## List Schools by Proximity

### GET `/api/listSchools`

### Query Parameters

| Parameter | Type | Required |
|---|---|---|
| latitude | Number | Yes |
| longitude | Number | Yes |

### Example

```bash
/api/listSchools?latitude=28.6139&longitude=77.2090
```

### Functionality

- Fetches all schools
- Calculates geographical distance
- Sorts schools based on proximity to user location

---

## Get All Schools

### GET `/api/schools`

Returns all schools sorted alphabetically.

---

## Get School By ID

### GET `/api/schools/:id`

Returns a specific school by ID.

---

# Database Schema

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

# Distance Calculation

The API uses the **Haversine Formula** to calculate the great-circle distance between two geographical coordinates on Earth.

This ensures accurate proximity-based sorting of schools.

---

# Response Format

All API responses follow a standardized structure:

```json
{
  "status": "Success | Error",
  "message": "Descriptive message",
  "data": {},
  "count": 0
}
```

---

# Error Handling

| Status Code | Description |
|---|---|
| 400 | Validation errors |
| 404 | Route/resource not found |
| 409 | Duplicate entries |
| 500 | Internal server error |

---

# Postman Testing

A Postman collection is included for API testing.

### Location

```text
postman/School Management API.postman_collection.json
```

Import the collection into Postman and test all endpoints directly.

---

# Sample cURL Requests

## Add School

```bash
curl -X POST http://localhost:3000/api/addSchool \
-H "Content-Type: application/json" \
-d '{
  "name": "Test School",
  "address": "123 Test Street",
  "latitude": 28.6139,
  "longitude": 77.2090
}'
```

---

## List Schools by Proximity

```bash
curl "http://localhost:3000/api/listSchools?latitude=28.6139&longitude=77.2090"
```

---

# Deployment

The backend API is deployed on Render.

## Deployment Features

- Live public API access
- Environment variable support
- Secure deployment configuration
- Production-ready Express server

---

# Environment Variables

| Variable | Description |
|---|---|
| DB_HOST | MySQL host |
| DB_PORT | MySQL port |
| DB_USER | MySQL username |
| DB_PASSWORD | MySQL password |
| DB_NAME | Database name |
| PORT | Application port |
| NODE_ENV | Environment mode |

---

# Production Improvements

Potential future improvements:

- JWT Authentication
- Rate limiting
- Swagger API documentation
- Docker containerization
- CI/CD pipeline
- Redis caching
- Automated testing
- HTTPS custom domain

---

# Author

Developed by Debapriya Das

---