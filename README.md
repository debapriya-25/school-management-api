# School Management API

A comprehensive Node.js API for managing school data with MySQL database integration. This system allows users to add new schools and retrieve schools sorted by proximity to a user-specified location.

## Features

- **Add School API**: Add new schools with name, address, and coordinates
- **List Schools API**: Retrieve schools sorted by distance from user location
- **Input Validation**: Comprehensive validation using Joi
- **Error Handling**: Robust error handling with proper HTTP status codes
- **Database Integration**: MySQL with connection pooling
- **Security**: CORS, Helmet, and input sanitization
- **Logging**: Morgan for request logging

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **Joi** - Input validation
- **dotenv** - Environment variables
- **morgan** - HTTP request logger
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your database credentials.

4. Set up the database:
   ```bash
   npm run migrate
   ```

5. Start the server:
   ```bash
   npm start
   ```
   For development:
   ```bash
   npm run dev
   ```

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

### Add School
- **POST** `/api/addSchool`
- **Body**: 
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 28.6139,
    "longitude": 77.2090
  }
  ```

### List Schools (with proximity)
- **GET** `/api/listSchools?latitude=28.6139&longitude=77.2090`
- Returns schools sorted by distance from user location

### Get All Schools
- **GET** `/api/schools`
- Returns all schools sorted by name

### Get School by ID
- **GET** `/api/schools/:id`
- Returns a specific school by ID

## Database Schema

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

## Distance Calculation

The API uses the Haversine formula to calculate the great-circle distance between two points on Earth's surface, providing accurate distance measurements in kilometers.

## Response Format

All API responses follow a consistent format:

```json
{
  "status": "Success|Error",
  "message": "Descriptive message",
  "data": {}, // Optional
  "count": 0  // Optional for list endpoints
}
```

## Error Handling

The API includes comprehensive error handling:
- **400**: Validation errors
- **404**: Resource not found
- **409**: Duplicate entries
- **500**: Internal server errors

## Testing

### Postman Collection

Import the provided Postman collection from `postman/School Management API.postman_collection.json` to test all endpoints.

### Sample Requests

1. **Add a school**:
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

2. **List schools by proximity**:
   ```bash
   curl "http://localhost:3000/api/listSchools?latitude=28.6139&longitude=77.2090"
   ```

## Deployment

### Environment Variables

- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

### Production Considerations

1. Use environment-specific configuration
2. Enable database connection pooling
3. Implement rate limiting
4. Set up monitoring and logging
5. Use HTTPS in production
6. Configure proper CORS policies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
