# Social Media API Documentation

Welcome to the Social Media API Documentation! This comprehensive guide provides detailed information on how to use the Social Media API to build powerful social media applications.

## Overview

The Social Media API offers a range of functionalities for creating, managing, and interacting with users and posts in a social media platform. With this API, developers can easily implement features such as user registration, authentication, posting content, following users, and retrieving feeds.

## Base URL

All endpoints in the API are relative to the base URL: http://localhost:8080


## Authentication

Most endpoints require authentication using JSON Web Tokens (JWT). To authenticate, include a valid JWT token in the `Authorization` header of your requests. Example:

Authorization: Bearer <token>


## Endpoints

### User Management

#### Register a New User

- **Method:** `POST`
- **URL:** `/register`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "exampleuser",
    "email": "user@example.com",
    "password": "password123"
  }

  
