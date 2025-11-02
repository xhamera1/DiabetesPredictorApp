# Diabetes Predictor – Backend

Secure REST API for user management and diabetes prediction with JWT authentication.

**Server**: `http://localhost:8080`

## Tech Stack

- Java 17+, Spring Boot, Spring Security (JWT)
- Spring Data JPA, MySQL
- Springdoc OpenAPI 3

## Project Structure

```
src/main/java/com/patrykchamera/diabetespredictor
├── DiabetesPredictorApplication.java
├── client
│   └── AiClient.java                    # AI service integration
├── config
│   ├── ApplicationConfiguration.java     # Bean definitions
│   ├── JwtAuthenticationFilter.java      # JWT validation filter
│   ├── SecurityConfiguration.java        # Security & authorization
│   └── WebConfig.java                    # CORS configuration
├── controller
│   ├── AdminController.java              # Admin endpoints
│   ├── AuthenticationController.java     # Auth endpoints
│   ├── PredictionController.java         # Prediction endpoints
│   └── UserController.java               # User endpoints
├── dto                                   # Request/response objects
├── exception
│   └── GlobalExceptionHandler.java       # Error handling
├── model
│   ├── Prediction.java                   # JPA entity
│   ├── Role.java                         # USER/ADMIN enum
│   └── User.java                         # JPA entity
├── repository                            # JPA repositories
└── service                               # Business logic
```

## Configuration

Set environment variables:
- `DB_PASSWORD` – MySQL password
- `JWT_SECRET_KEY` – Base64-encoded secret for HS256
- `cors.allowed.origins` – Frontend URL
- `ai.base-url` – AI service endpoint

## Authentication

**JWT-based** stateless authentication. All authenticated requests require:
```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication (`/auth`) – Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/login` | Login, returns JWT token |

### User Management (`/users`) – Authenticated

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me` | Get current user profile |
| PUT | `/users/me` | Update current user profile |

### Predictions (`/predictions`) – Authenticated

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/predictions` | Create new prediction |
| GET | `/predictions` | Get user's prediction history |

### Admin (`/admin`) – ADMIN Role Required

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/users` | List all users (paginated) |
| PUT | `/admin/users/{id}` | Update user (including role) |
| DELETE | `/admin/users/{id}` | Delete user |

## Error Responses

- `400/422` – Validation error
- `401` – Unauthorized (invalid/missing token)
- `403` – Forbidden (insufficient permissions)
- `404` – Resource not found
- `409` – Conflict (e.g., duplicate email)

## Build & Run

```bash
# Prerequisites: Java 17+, Maven, MySQL
# Set environment variables: DB_PASSWORD, JWT_SECRET_KEY

# Build
mvn clean package

# Run
java -jar target/diabetes-predictor-<version>.jar
```

## Documentation

Full API documentation: Swagger UI - backend endpoints documentation.pdf in diabetes-predictor folder
