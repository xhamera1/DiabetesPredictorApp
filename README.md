# Diabetes Prediction: A Full-Stack Web Machine Learning Application


Patryk Chamera - [chamerapatryk@gmail.com](mailto:chamerapatryk@gmail.com)



## 📋 Table of Contents
1.  [About The Project](#about-the-project)
2.  [Key Features](#key-features)
3.  [Application Architecture](#application-architecture)
4.  [Tech Stack](#tech-stack)
5.  [Core Logic: How It Works](#core-logic-how-it-works)
    - [User Flow](#user-flow)
    - [Authentication & Authorization](#authentication--authorization)
6.  [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
7.  [License](#license)

## 📖 About The Project

**Diabetes Prediction** is a full-stack web application designed to predict the likelihood of an individual having diabetes based on key health metrics. The project integrates a highly accurate machine learning model with a robust backend and a modern, responsive frontend to provide a seamless user experience.

The core of the application is a **Random Forest** classifier, trained on a comprehensive dataset of health indicators, achieving an accuracy of **97.2%**. This model is served via a lightweight Python API, which communicates with a powerful Java-based backend responsible for user management, data persistence, and security.

This project was built to demonstrate a complete end-to-end development cycle, from data science and model training to full-stack web application deployment.

## ✨ Key Features

*   **User Authentication**: Secure registration and login system using JWT (JSON Web Tokens).
*   **Role-Based Access Control**:
    *   **USER**: Can make predictions, view their prediction history, and manage their account.
    *   **ADMIN**: Has full access to user management functionalities (view, edit, delete users).
*   **Diabetes Prediction**: An intuitive form for users to input their health data (age, HbA1c, blood glucose, etc.) and receive an instant prediction.
*   **Prediction History**: Users can track and review their past predictions.
*   **Admin Panel**: A dedicated interface for administrators to manage all users in the system.
*   **Responsive UI**: A modern, clean frontend built with React and Material-UI, fully responsive for both desktop and mobile devices.
*   **Dark/Light Mode**: A theme toggler for enhanced user experience.

## 🏗️ Application Architecture

The application is designed with a microservices-oriented approach, separating concerns for better scalability and maintainability.

1.  **Machine Learning Service (Python & FastAPI)**: A lightweight microservice that exposes the trained Random Forest model via a single REST API endpoint. Its sole responsibility is to receive health data and return a prediction.
2.  **Backend Service (Java & Spring Boot)**: The main application server. It handles business logic, user authentication, data storage, and serves as a secure gateway to the ML service.
3.  **Frontend Application (React & TypeScript)**: A modern Single Page Application (SPA) that provides the user interface. It communicates exclusively with the Spring Boot backend.
4.  **Database (MySQL)**: A relational database for storing user data, roles, and prediction history.



## 🛠️ Tech Stack

*   **Frontend**:
    *   **React** (with Vite)
    *   **TypeScript**
    *   **Material-UI (MUI)** for components and styling
    *   **React Router** for navigation
    *   **TanStack Query (React Query)** for server state management
*   **Backend**:
    *   **Java 17+**
    *   **Spring Boot 3**
    *   **Spring Security** for authentication & authorization
    *   **Spring Data JPA** (with Hibernate)
    *   **MySQL** Database
*   **Machine Learning**:
    *   **Python**
    *   **Scikit-learn** (for the Random Forest model)
    *   **Pandas** for data manipulation
    *   **FastAPI** for serving the model

## 🧠 Core Logic: How It Works

### User Flow

1.  A new user **registers** for an account. Their details are saved to the MySQL database with a `USER` role by default.
2.  The user **logs in** by providing their credentials.
3.  The Spring Boot backend validates the credentials and, if successful, generates a **JWT (Bearer Token)**.
4.  This token is sent back to the React frontend and stored securely in `localStorage`.
5.  For every subsequent request to a protected endpoint (e.g., making a prediction), the React app includes this JWT in the `Authorization: Bearer <token>` header.
6.  When a user submits the prediction form, the frontend sends the data to a protected endpoint on the **Spring Boot backend**.
7.  The Spring Boot backend validates the JWT, then makes a server-to-server request to the **FastAPI ML service**, forwarding the health data.
8.  The FastAPI service runs the data through the Random Forest model and returns the prediction result (e.g., `{ "prediction": 1, "probability": 0.95 }`).
9.  Spring Boot receives the result, saves it to the user's history in the database, and returns it to the React frontend.
10. The user sees the prediction result on their screen.

### Authentication & Authorization

Security is handled by **Spring Security** using **JSON Web Tokens (JWT)**.

*   **Authentication**: When a user logs in, the server generates a signed JWT containing user details (like email and roles). This token acts as a digital passport.
*   **Authorization**: For each request to a protected API endpoint, a custom filter in Spring Security intercepts the request, validates the JWT's signature and expiration, and extracts the user's roles. It then grants or denies access based on the endpoint's requirements (e.g., only users with the `ADMIN` role can access `/api/admin/users`). This stateless approach is efficient and secure.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   **Java JDK 17** or newer
*   **Maven** 3.8+
*   **Python** 3.9+
*   **Node.js** 18+ and **npm**
*   **MySQL** Server

### Installation

1.  **Clone the repositories** (assuming separate repos for backend, frontend, and ML service):
    ```
    git clone https://github.com/xhamera1/DiabetesPredictorApp.git
    ```

2.  **Setup the Database**:
    *   Create a MySQL database named `diabetes`.
    *   Update the `application.properties` file in the Spring Boot project with your MySQL username and password.

3.  **Run the Machine Learning Service**:
    ```
    cd DiabetesPredictorApp/ai-service
    pip install -r requirements.txt
    python -m uvicorn app.main:app --reload --port 8000
    ```
    The ML service will be running at `http://localhost:8000`.

4.  **Run the Backend Service**:
    ```
    cd DiabetesPredictorApp\diabetes-predictor
    mvn spring-boot:run
    ```
    The backend will be running at `http://localhost:8080`.

5.  **Run the Frontend Application**:
    ```
    cd DiabetesPredictorApp/frontend
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173`.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.


```
