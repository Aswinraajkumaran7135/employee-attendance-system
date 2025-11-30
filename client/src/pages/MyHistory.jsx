import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaHistory, FaCalendarCheck, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import api from '../api'; // ✅ use API instance

function MyHistory() {
  const [history, setHistory] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = user.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // ✅ Correct backend path (no /api here)
        const response = await api.get('/attendance/my-history', config);

        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  // Calculate Personal Stats
  const totalDays = history.length;
  const onTimeCount = history.filter(h => h.status === 'Present').length;
  const lateCount = history.filter(h => h.status === 'Late').length;

  // Helper for Badges
  const getStatusClass = (status) => {
    switch (status) {
      case 'Present': return 'status-badge status-present';
      case 'Late': return 'status-badge status-late';
      case 'Absent': return 'status-badge status-absent';
      default: return 'status-badge';
    }
  };

  // --- STYLES ---
  const headerStyle = {
    background: 'linear-gradient(135deg, #0d9488 0%, #115e59 100%)',
    color: 'white',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 4px 15px rgba(13, 148, 136, 0.4)'
  };

  const statsGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  };

  const statCard = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  };

  return (
    <div className='container'>
      
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px', borderRadius: '50%' }}>
          <FaHistory size={30} color="white" />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>My Attendance History</h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>Track your work consistency</p>
        </div>
      </div>

      {/* Personal Stats */}
      <div style={statsGrid}>
        <div style={statCard}>
          <div style={{ background: '#e0f2fe', padding: '12px', borderRadius: '50%', color: '#0284c7' }}>
            <FaCalendarCheck size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Total Days</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{totalDays}</div>
          </div>
        </div>

        <div style={statCard}>
          <div style={{ background: '#dcfce7', padding: '12px', borderRadius: '50%', color: '#16a34a' }}>
            <FaClock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>On Time</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{onTimeCount}</div>
          </div>
        </div>

        <div style={statCard}>
          <div style={{ background: '#fef3c7', padding: '12px', borderRadius: '50%', color: '#d97706' }}>
            <FaExclamationTriangle size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Late Arrivals</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{lateCount}</div>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Total Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((record) => (
                <tr key={record._id}>
                  <td style={{ fontWeight: '600', color: '#334155' }}>{record.date}</td>
                  <td>{record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '-'}</td>
                  <td>{record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '-'}</td>
                  <td>{record.totalHours ? `${record.totalHours} hrs` : '-'}</td>
                  <td>
                    <span className={getStatusClass(record.status)}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  No attendance records found. Start by checking in!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default MyHistory;
