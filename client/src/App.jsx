import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeDashboard from './pages/EmployeeDashboard';
import MyHistory from './pages/MyHistory';
import ManagerDashboard from './pages/ManagerDashboard';

// 1. Logic to check if user is logged in
const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  // If no user, redirect to Login page
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            
            {/* Protected Routes (Must be logged in to see these) */}
            <Route 
              path='/dashboard' 
              element={
                <PrivateRoute>
                  <EmployeeDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path='/history' 
              element={
                <PrivateRoute>
                  <MyHistory />
                </PrivateRoute>
              } 
            />
            <Route 
              path='/admin' 
              element={
                <PrivateRoute>
                  <ManagerDashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;