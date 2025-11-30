import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaClock, FaCheckCircle, FaCalendarDay } from 'react-icons/fa'; // Import icons

function EmployeeDashboard() {
  const [todayStatus, setTodayStatus] = useState(null);
  const { user } = useSelector((state) => state.auth);
  
  const fetchStatus = async () => {
    try {
      const token = user.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('/api/attendance/today', config);
      setTodayStatus(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [user]);

  // Helper function to safely format time
  const formatTime = (timeString) => {
    if (!timeString) return '-- : --';
    const date = new Date(timeString);
    // Check if the date object is valid before formatting
    return isNaN(date) ? 'Invalid Date Format' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCheckIn = async () => {
    try {
      const token = user.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('/api/attendance/checkin', {}, config);
      toast.success('Checked In Successfully!');
      fetchStatus();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Check In Failed');
    }
  };

  const handleCheckOut = async () => {
    try {
      // Ensure we have a valid record before attempting checkout
      if (!todayStatus || !todayStatus._id) {
         toast.error('Cannot Check Out: No active Check-In record found.');
         return;
      }
      
      const token = user.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // The payload is empty, relying on the backend to find the record by user ID and date.
      await axios.post('/api/attendance/checkout', {}, config);
      
      toast.success('Checked Out Successfully! Hours calculated.');
      fetchStatus();
    } catch (error) {
      // This will now show the detailed error message sent from the Node server
      toast.error(error.response?.data?.message || 'Check Out Failed: Review Server Logs.');
    }
  };

  // --- STYLES --- (Styles remain the same)
  const heroStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple Gradient
    color: 'white',
    padding: '40px',
    borderRadius: '12px',
    marginBottom: '30px',
    boxShadow: '0 10px 20px -5px rgba(118, 75, 162, 0.4)'
  };

  const cardStyle = {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  return (
    <div className='container'>
      
      {/* 1. Colorful Hero Section */}
      <div style={heroStyle}>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Welcome back, {user && user.name.split(' ')[0]}!</h1>
        <p style={{ opacity: 0.9, marginTop: '10px', fontSize: '1.1rem' }}>
          <FaCalendarDay style={{ marginRight: '8px' }} />
          {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* 2. Action Card */}
      <div style={cardStyle}>
        <h2 style={{ color: '#374151' }}>Today's Attendance</h2>
        
        <div style={{ margin: '30px 0' }}>
          {!todayStatus ? (
            <div style={{ color: '#ef4444', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <FaClock style={{ marginRight: '8px' }} /> Not Checked In Yet
            </div>
          ) : todayStatus.checkOutTime ? (
            <div style={{ color: '#10b981', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <FaCheckCircle style={{ marginRight: '8px' }} /> Work Day Completed
            </div>
          ) : (
             <div style={{ color: '#f59e0b', fontSize: '1.2rem', fontWeight: 'bold' }}>
               <FaClock style={{ marginRight: '8px' }} /> Currently Working...
             </div>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '30px' }}>
          {!todayStatus && (
             <button className='btn' onClick={handleCheckIn} style={{ background: '#4f46e5', color: 'white', padding: '15px 40px', fontSize: '1.1rem' }}>
               Start Work (Check In)
             </button>
          )}

          {todayStatus && !todayStatus.checkOutTime && (
            <button className='btn' onClick={handleCheckOut} style={{ background: '#ef4444', color: 'white', padding: '15px 40px', fontSize: '1.1rem' }}>
              End Work (Check Out)
            </button>
          )}
        </div>

        {/* Info Grid */}
        {todayStatus && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid #f3f4f6', paddingTop: '20px' }}>
             <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '8px' }}>
                <small style={{ color: '#6b7280', textTransform: 'uppercase', fontWeight: 'bold' }}>Check In Time</small>
                <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1f2937' }}>
                  {formatTime(todayStatus.checkInTime)} {/* Uses the robust helper */}
                </div>
             </div>
             <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '8px' }}>
                <small style={{ color: '#6b7280', textTransform: 'uppercase', fontWeight: 'bold' }}>Check Out Time</small>
                <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#1f2937' }}>
                  {formatTime(todayStatus.checkOutTime)} {/* Uses the robust helper */}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeDashboard;