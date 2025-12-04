# 🚀 Employee Attendance System

> A full-stack MERN application for efficient attendance tracking, role-based management, and payroll reporting.

![Banner](screenshots/dashboard.png)

---

## 📖 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Installation Guide](#installation-guide)
- [Environment Variables](#environment-variables)
- [Login Credentials](#login-credentials)
- [API Endpoints](#api-endpoints)
- [Student Details (Tap Academy Requirement)](#student-details-tap-academy-requirement)

---

## ✨ Features

### 👨‍💻 For Employees
- **Secure Authentication:** User registration and login with JWT  
- **Smart Dashboard:** Shows daily status, date, greeting  
- **One-Click Attendance:** “Check In” & “Check Out”  
- **Real-Time Tracking:** Captures timestamps  
- **Attendance History:** Color-coded status badges (Present, Late, Absent)

### 👮‍♂️ For Managers (Admin)
- **Team Overview:** View all employee attendance  
- **Analytics Cards:** Total employees, present, absent  
- **Visual Reports:** Present (Green), Absent (Red)  
- **Export to CSV:** Download attendance reports  

---

## 🛠 Tech Stack

| Area | Technologies |
|------|--------------|
| **Frontend** | React, Vite, Redux Toolkit, CSS Modules |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT, Bcrypt.js |
| **Tools** | Axios, React-Icons, React-Toastify |

---

## 📸 Screenshots

| Login Page | Employee Dashboard |
|------------|--------------------|
| ![Login](screenshots/login.png) | ![Employee](screenshots/employee.png) |

### Manager Admin View
![Manager](screenshots/manager.png)

---

## ⬇️ Installation Guide

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/employee-attendance-system.git
cd employee-attendance-system
