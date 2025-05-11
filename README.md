# 📝 MERN Stack Blog Application

A full-stack blogging platform built with the **MERN** stack, enabling administrators to manage blog posts while allowing users to view content and contact the admin.

---

## 🚀 Overview

This application serves as a **blogging platform** with the following capabilities:

### **Admins**:
- Full control to **create**, **update**, and **delete** blog posts.

### **Users**:
- Ability to **view** published blog posts.
- Can **send messages** to the admin via a contact form.

### **Security**:
- **Protected routes** ensure that only authorized users can access certain functionalities (e.g., admin-only features).

---

## 🔑 Key Features

- **Admin Capabilities**:
  - Create, update, and delete blog posts.

- **User Roles**:
  - Admin and normal users with **role-based access control**.

- **Authentication**:
  - Implemented using **JSON Web Tokens (JWT)** for secure authentication.

- **State Management**:
  - Utilizes **React's Context API** for global state management.

- **Protected Routes**:
  - Implemented using **React Router** to restrict access to certain pages based on user roles.

- **Contact Form**:
  - Users can send messages to the admin via **email**.

---

## 🖥️ Frontend Technologies

- **React.js**: JavaScript library for building user interfaces.
- **React Router**: For handling routing and navigation in the app.
- **Context API**: State management tool provided by React for sharing data between components.
- **Axios**: For making HTTP requests to the backend.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.

---

## 🔧 Backend Technologies

- **Node.js**: JavaScript runtime environment for the server-side.
- **Express.js**: Web framework for building RESTful APIs with Node.js.
- **MongoDB**: NoSQL database for storing blog posts and user data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB, providing an easy-to-use interface for interacting with the database.
- **JWT (JSON Web Tokens)**: For authentication and authorization of users.
- **bcrypt.js**: For hashing user passwords and ensuring secure storage.

---

## 📬 Contact Form Functionality

- Allows users to **send messages** directly to the admin via email. 
- **Backend logic** sends the email to the admin's address.

---

## 🚀 Deployment

- **Frontend**: Deployed on platforms like **Vercel**.
- **Backend**: Hosted on **Render**.
- **Database**: Cloud-based database hosting on **MongoDB Atlas**.

---

## 🛠️ Development Tools

- **Visual Studio Code**: Code editor for development.
- **Postman**: For testing API endpoints and backend routes.
- **Git & GitHub**: Version control and code hosting.

---

