# mytodolist (EPYTODO)

## 📋 Project Overview

**mytodolist** is a RESTful API built with **Node.js** and **MySQL** to manage a simple Todo List application. It supports user authentication and CRUD operations for both users and todos. The project focuses on back-end development but is designed to be extendable with a front-end interface.

---

## 🚀 Features

- User Registration & Authentication (JWT)
- Password hashing with **bcryptjs**
- Secure route protection
- Complete CRUD for:
  - Users
  - Todos
- Relational Database with MySQL
- Environment configuration with **dotenv**
- Custom middleware for auth & error handling

---

## 📂 Project Structure

```
mytodolist/
├── .env
├── epytodo.sql
├── package.json
├── node_modules/ (ignored by Git)
└── src/
    ├── config/
    │   └── db.js
    ├── index.js
    ├── middleware/
    │   ├── auth.js
    │   └── notFound.js
    └── routes/
        ├── auth/
        │   └── auth.js
        ├── todos/
        │   ├── todos.js
        │   └── todos.query.js
        └── user/
            ├── user.js
            └── user.query.js
```

---

## 🧪 Technologies

- **Node.js**
- **Express**
- **MySQL2**
- **JWT** (`jsonwebtoken`)
- **bcryptjs**
- **dotenv**
- **body-parser** (optional)

---

## 🔐 Environment Variables

Create a `.env` file at the root with:

```env
MYSQL_DATABASE=epytodo
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_ROOT_PASSWORD=yourpassword
PORT=8080
SECRET=your_jwt_secret
```

---

## 🧱 Database Schema

SQL schema is defined in `epytodo.sql`. It includes two main tables: `user` and `todo`.

### `user` Table

| Field       | Type         | Constraints                |
|-------------|--------------|----------------------------|
| id          | INT          | PK, AUTO_INCREMENT, NOT NULL |
| email       | VARCHAR(255) | UNIQUE, NOT NULL           |
| password    | VARCHAR(255) | NOT NULL                   |
| name        | VARCHAR(255) | NOT NULL                   |
| firstname   | VARCHAR(255) | NOT NULL                   |
| created_at  | DATETIME     | DEFAULT CURRENT_TIMESTAMP  |

### `todo` Table

| Field       | Type         | Constraints                         |
|-------------|--------------|-------------------------------------|
| id          | INT          | PK, AUTO_INCREMENT, NOT NULL        |
| title       | VARCHAR(255) | NOT NULL                            |
| description | TEXT         | NOT NULL                            |
| created_at  | DATETIME     | DEFAULT CURRENT_TIMESTAMP           |
| due_time    | DATETIME     | NOT NULL                            |
| status      | ENUM         | DEFAULT 'not started'               |
| user_id     | INT          | FK to `user.id`, NOT NULL           |

---

## 🛠 Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/mytodolist.git
   cd mytodolist
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your `.env` file.

4. Import database schema:
   ```bash
   cat epytodo.sql | mysql -u root -p
   ```

5. Start the server:
   ```bash
   npm start
   ```

---

## 📡 API Endpoints

> All protected routes require a valid JWT in the `Authorization` header.

### Auth

| Route        | Method | Auth | Description            |
|--------------|--------|------|------------------------|
| /register    | POST   | ❌   | Register new user      |
| /login       | POST   | ❌   | Login user             |

### User

| Route              | Method | Auth | Description                  |
|-------------------|--------|------|------------------------------|
| /user             | GET    | ✅   | View logged-in user info     |
| /user/todos       | GET    | ✅   | View user's todos            |
| /users/:id/email  | GET    | ✅   | Get user by ID or email      |
| /users/:id        | PUT    | ✅   | Update user                  |
| /users/:id        | DELETE | ✅   | Delete user                  |

### Todos

| Route        | Method | Auth | Description             |
|--------------|--------|------|-------------------------|
| /todos       | GET    | ✅   | View all todos          |
| /todos/:id   | GET    | ✅   | View a specific todo    |
| /todos       | POST   | ✅   | Create new todo         |
| /todos/:id   | PUT    | ✅   | Update todo             |
| /todos/:id   | DELETE | ✅   | Delete todo             |

---

## 🧾 Sample Responses

### Successful login
```json
{ "token": "your_jwt_token" }
```

### Errors

| Message                              | Condition                            |
|-------------------------------------|--------------------------------------|
| { "msg": "No token, authorization denied" } | Missing JWT                        |
| { "msg": "Token is not valid" }     | Invalid JWT                          |
| { "msg": "Not found" }              | User or todo not found               |
| { "msg": "Bad parameter" }          | Malformed input                      |
| { "msg": "Internal server error" }  | Generic error                        |

---

## 🔐 Security

- Passwords are hashed with `bcryptjs`
- JWT tokens are used for protected routes
- Sensitive credentials are stored in `.env`

---

## ⚠️ Git Guidelines

Ensure the following files/folders are **NOT** pushed:

- `.env`
- `node_modules/`
- Any credentials

Add a `.gitignore` file like this:

```bash
node_modules/
.env
```

---

## 📄 License

This project is licensed for academic use under [Epitech’s project guidelines].

---

## ✨ Bonus

Want to challenge yourself further?
- Build a front-end with React or another framework
- Add filtering/sorting for todos
- Add user role management

---

## 👨‍💻 Author

- Your Name
- [your.email@example.com](mailto:your.email@example.com)

---