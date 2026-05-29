# Employee Management System

A full-stack Employee Management System built using **Spring Boot, React.js, and MySQL** with **JWT Authentication, Role-Based Access Control (RBAC), AES Encryption, and REST APIs**.

This project enables secure employee and department management with authentication, authorization, encrypted sensitive data storage, and API documentation using Swagger.

---

## Live Features

### Authentication & Security

* JWT-based Authentication
* Role-Based Access Control (Admin / HR / Viewer)
* Spring Security Integration
* Password Encryption using BCrypt
* AES-256 Encryption for sensitive employee information
* Secure REST API architecture

### Employee Management

* Create Employee
* Update Employee
* Delete Employee
* Search Employees
* Pagination Support
* Employee Status Management
* Department Mapping

### Department Management

* Department CRUD Operations
* Department-wise Employee Mapping
* Seeded Default Departments

### API & Backend Features

* RESTful API Design
* Global Exception Handling
* Swagger/OpenAPI Documentation
* Data Seeder for default users and departments
* JPA + Hibernate ORM
* MySQL Database Integration
* Maven Build Management

---

# Tech Stack

## Backend

* Java 17
* Spring Boot 3
* Spring Security
* Spring Data JPA
* Hibernate
* MySQL
* Maven
* JWT
* Swagger / OpenAPI
* Lombok

## Frontend

* React.js
* Axios
* Redux
* React Router
* CSS

## Database

* MySQL 8

---

# Project Structure

```text
employeee/
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── fullbackend/
│   ├── src/main/java/com/empmanagement/
│   ├── src/main/resources/
│   ├── pom.xml
│   └── Dockerfile
│
└── README.md
```

---

# Backend Architecture

```text
com.empmanagement
│
├── controller
├── service
├── repository
├── entity
├── security
├── util
├── exception
└── seeder
```

---

# API Documentation

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

OpenAPI Docs:

```text
http://localhost:8080/api-docs
```

---

# Default Login Credentials

### Admin

```text
Username: admin
Password: admin123
```

### HR

```text
Username: hr
Password: hr123
```

---

# Backend Setup

## Clone Repository

```bash
git clone https://github.com/siva042004/Employee-management-system.git
```

## Navigate to Backend

```bash
cd fullbackend
```

## Configure Database

Create MySQL database:

```sql
CREATE DATABASE empdb;
```

Update:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/empdb
spring.datasource.username=root
spring.datasource.password=your_password
```

## Run Backend

```bash
mvn spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

---

# Frontend Setup

Navigate:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm start
```

Frontend runs at:

```text
http://localhost:3000
```

---

# Security Implementation

This project implements:

* JWT Token Authentication
* Spring Security Filters
* Role-based Endpoint Authorization
* BCrypt Password Hashing
* AES Encryption for:

  * Salary
  * National ID
  * Bank Account Details

---

# Testing

API testing performed using:

* Swagger UI
* Postman
* JWT Authorization

Tested Features:

* Login
* Registration
* Employee CRUD
* Department CRUD
* Search & Pagination
* Role-based Access

---

# Future Improvements

* Docker Deployment
* CI/CD with GitHub Actions
* Cloud Deployment (AWS / Render / Railway)
* Email Notifications
* Analytics Dashboard
* Audit Logs

---

# Author

**Sivaragul M**

Computer Science Graduate | Java & Spring Boot Developer | Full Stack Enthusiast

GitHub:
https://github.com/siva042004
