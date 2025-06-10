# 🔐 NestJS JWT Authentication with Passport.js

This repository contains an example API built with **NestJS** to demonstrate a robust authentication system using **Passport.js** with the **JWT (JSON Web Tokens) strategy**. It's ideal for learning how to secure routes and manage stateless sessions in Node.js applications.

---

## ✨ Features

* **User Registration:** Allows new users to create an account.
* **User Authentication:** Login with credentials (username/password) and issuance of a JWT token.
* **Route Protection:** Routes that require authentication via a JWT token.
* **User Profile:** Access to authenticated user data.

---

## 🚀 Technologies Used

* [**NestJS**](https://nestjs.com/): A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
* [**Passport.js**](http://www.passportjs.org/): Flexible and modular authentication middleware for Node.js.
* [**Passport-JWT**](https://www.npmjs.com/package/passport-jwt): Passport strategy for authenticating using JSON Web Tokens.
* [**bcrypt**](https://www.npmjs.com/package/bcrypt): Library for password hashing.
* [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken): For signing and verifying JSON Web Tokens.
* [**TypeScript**](https://www.typescriptlang.org/): A programming language that adds static typing to JavaScript.
* [**pnpm**](https://pnpm.io/): A fast and efficient package manager.

---

## ⚙️ Prerequisites

Make sure you have the following tools installed in your development environment:

* [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
* A package manager:
    * [pnpm](https://pnpm.io/installation) (install globally: `npm install -g pnpm`)
    * [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (comes with Node.js)
    * [Yarn](https://classic.yarnpkg.com/en/docs/install) (install globally: `npm install -g yarn`)

---

## 💻 Installation

Follow the steps below to set up the project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/daviramosds/nestjs-passportjs-jwt.git](https://github.com/daviramosds/nestjs-passportjs-jwt.git)
    cd nestjs-passportjs-jwt
    ```

2.  **Install dependencies using your preferred package manager:**
    * **pnpm:**
        ```bash
        pnpm install
        ```
    * **npm:**
        ```bash
        npm install
        ```
    * **Yarn:**
        ```bash
        yarn install
        ```

3.  **Create the environment variables file:**
    Create a `.env` file in the project root and configure the necessary variables.

    ```
    # .env
    JWT_SECRET=your_strong_random_secret_key_here
    JWT_EXPIRES_IN=1h # Example: 1 hour
    JWT_REFRESH_SECRET=your_refresh_secret_key_here
    JWT_REFRESH_EXPIRES_IN=7d # Example: 7 days
    PORT=3000
    ```

    **Remember:** The `JWT_SECRET` should be a long, complex string, securely generated.

---

## ▶️ Running the Application

### Development Mode

To run the application in development mode with hot-reload using your preferred package manager:

* **pnpm:**
    ```bash
    pnpm start:dev
    ```
* **npm:**
    ```bash
    npm run start:dev
    ```
* **Yarn:**
    ```bash
    yarn start:dev
    ```

The application will be available at `http://localhost:3000` (or the port defined in `.env`).

### Production Mode

To compile and run the application in production mode:

1.  **Compile the TypeScript code using your preferred package manager:**
    * **pnpm:**
        ```bash
        pnpm build
        ```
    * **npm:**
        ```bash
        npm run build
        ```
    * **Yarn:**
        ```bash
        yarn build
        ```

2.  **Start the application using your preferred package manager:**
    * **pnpm:**
        ```bash
        pnpm start
        ```
    * **npm:**
        ```bash
        npm run start
        ```
    * **Yarn:**
        ```bash
        yarn start
        ```

---

## 🌐 API Endpoints

The API exposes the following endpoints. It is recommended to use tools like [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), or the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VS Code extension for testing.

**Base URL:** `http://localhost:3000` (or your configured port)

### `POST /auth/register` - Register a new user

Creates a new user account.

* **Request Body:**
    ```json
    {
      "username": "new_user",
      "password": "secure_password123",
      "email": "new.user@example.com"
    }
    ```

* **Success Response (201 Created):**
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "id": "user-uuid",
        "username": "new_user",
        "email": "new.user@example.com"
      }
    }
    ```

* **Error Response (400 Bad Request):** If username/email already exists or invalid data.

### `POST /auth/login` - Authenticate a user

Logs in and returns a JWT token.

* **Request Body:**
    ```json
    {
      "username": "existing_user",
      "password": "secure_password123"
    }
    ```

* **Success Response (200 OK):**
    ```json
    {
      "accessToken": "eyJhbGciOiJIUzI1Ni...",
      "refreshToken": "eyJhbGciOiJIUzI1Ni..."
    }
    ```

* **Error Response (401 Unauthorized):** Invalid credentials.

### `GET /users/profile` - Get user profile (Protected Route)

Returns information about the authenticated user. Requires a valid JWT in the `Authorization` header.

* **Request Headers:**
    ```
    Authorization: Bearer <your_access_token_jwt>
    ```

* **Success Response (200 OK):**
    ```json
    {
      "id": "user-uuid",
      "username": "authenticated_user",
      "email": "authenticated.user@example.com"
    }
    ```

* **Error Response (401 Unauthorized):** Missing, invalid, or expired token.

---

## 🔑 JWT Authentication Flow

1.  The client sends credentials (username/password) to `POST /auth/login`.
2.  The API validates the credentials. If valid, it generates an **Access Token** (short-lived JWT) and, optionally, a **Refresh Token** (long-lived JWT).
3.  The API returns the tokens to the client.
4.  The client stores the tokens (typically the Access Token in memory, the Refresh Token in secure storage).
5.  To access protected routes (e.g., `/users/profile`), the client sends the **Access Token** in the `Authorization` header as `Bearer <Access Token>`.
6.  The API uses Passport.js with the JWT strategy to verify the Access Token's validity. If the token is valid, the request proceeds.
7.  If the Access Token expires, the client can use the **Refresh Token** (sent to an endpoint like `POST /auth/refresh-token`) to obtain a new Access Token without needing to log in again.

---

## 🏗️ Project Structure (Example)

```text
nestjs-passportjs-jwt/
├── src/
│   ├── auth/                       # Authentication module (JWT strategies, services, controllers)
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── strategies/             # Passport.js strategies (jwt.strategy.ts, local.strategy.ts)
│   │       └── constants.ts        # Constants like the JWT Secret
│   ├── users/                      # Users module (services, controllers, entities)
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── main.ts                     # NestJS application entry point
│   └── app.module.ts               # Root application module
├── types/                          # Type definitions for interfaces (IUser, ICreateUserBody, IUserQueryParams)
│   └── user.d.ts
├── .env.example                    # Example environment variables file
├── .gitignore                      # Files and folders to be ignored by Git
├── nest-cli.json                   # Nest CLI configurations
├── package.json                    # Project dependencies and scripts
├── pnpm-lock.yaml                  # pnpm lockfile
├── tsconfig.build.json             # TypeScript configuration for build
└── tsconfig.json                   # TypeScript configuration
