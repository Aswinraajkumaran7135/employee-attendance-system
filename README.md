# 🚀 Employee Attendance System

> A full-stack MERN application for efficient attendance tracking, role-based management, and payroll reporting.

![Banner](screenshots/dashboard.png)


---

## 📖 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation Guide](#-installation-guide)
- [Environment Variables](#-environment-variables)
- [Login Credentials](#-login-credentials)
- [API Endpoints](#-api-endpoints)

---

## ✨ Features

### 👨‍💻 For Employees
* **Secure Authentication:** User registration and login with JWT.
* **Smart Dashboard:** View daily status, date, and "Welcome" banner.
* **One-Click Attendance:** easy "Check In" and "Check Out" buttons.
* **Real-Time Tracking:** Captures exact timestamp upon action.
* **Attendance History:** Personal table view with color-coded status badges (Present, Late, Absent).

### 👮‍♂️ For Managers (Admin)
* **Team Overview:** View attendance records for **all employees**.
* **Analytics Cards:** See total employees, present count, and absentees at a glance.
* **Visual Reports:** Badges indicate status (Green = Present, Red = Absent).
* **Export to CSV:** Download full attendance reports for HR/Payroll with one click.

---

## 🛠 Tech Stack

| Area | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Redux Toolkit, CSS Modules |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT (JSON Web Tokens), Bcrypt.js |
| **Tools** | Axios, React-Icons, React-Toastify |

---

## 📸 Screenshots

| Login Page | Employee Dashboard |
| :---: | :---: |
| ![Login](screenshots/login.png) | ![Employee](screenshots/employee.png) |

### Manager Admin View
![Manager](screenshots/manager.png)

---

## ⬇️ Installation Guide

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/employee-attendance-system.git](https://github.com/your-username/employee-attendance-system.git)
cd employee-attendance-system