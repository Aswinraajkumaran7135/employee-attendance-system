import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUsers, FaUserCheck, FaUserTimes, FaFileDownload } from 'react-icons/fa';
import api from '../api'; // ✅ Use API instance

function ManagerDashboard() {
  const [attendanceList, setAttendanceList] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAllAttendance = async () => {
      try {
        const token = user.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // ✅ Correct backend path (no `/api`)
        const response = await api.get('/attendance/all', config);

        setAttendanceList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (user) {
      fetchAllAttendance();
    }
  }, [user]);

  // Calculate Stats
  const totalRecords = attendanceList.length;
  const presentCount = attendanceList.filter(a => a.status === 'Present').length;
  const absentCount = attendanceList.filter(a => a.status === 'Absent').length;

  // CSV Export Logic
  const exportToCSV = () => {
    if (attendanceList.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = ["Name", "Email", "Dept", "Date", "In", "Out", "Status"];
    const rows = attendanceList.map(r => [
      r.userId?.name,
      r.userId?.email,
      r.userId?.department,
      r.date,
      r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString() : '-',
      r.checkOutTime ? new Date(r.checkOutTime).toLocaleTimeString() : '-',
      r.status
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");

    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }));
    link.download = "attendance_report.csv";
    link.click();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Present': return 'status-badge status-present';
      case 'Absent': return 'status-badge status-absent';
      case 'Late': return 'status-badge status-late';
      default: return 'status-badge';
    }
  };

  // --- STYLES ---
  const headerStyle = {
    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    color: 'white',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
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
    <div className="container">
      
      {/* Header Section */}
      <div style={headerStyle}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>Manager Overview</h1>
          <p style={{ margin: '5px 0 0 0', opacity: 0.8 }}>Track team performance</p>
        </div>

        <button
          className="btn"
          onClick={exportToCSV}
          style={{
            background: 'white',
            color: '#1e3a8a',
            width: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaFileDownload /> Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div style={statsGrid}>
        <div style={statCard}>
          <div style={{ background: '#e0f2fe', padding: '10px', borderRadius: '50%', color: '#0284c7' }}>
            <FaUsers size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Total Records</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{totalRecords}</div>
          </div>
        </div>

        <div style={statCard}>
          <div style={{ background: '#dcfce7', padding: '10px', borderRadius: '50%', color: '#16a34a' }}>
            <FaUserCheck size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Present</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{presentCount}</div>
          </div>
        </div>

        <div style={statCard}>
          <div style={{ background: '#fee2e2', padding: '10px', borderRadius: '50%', color: '#dc2626' }}>
            <FaUserTimes size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Absent/Late</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{absentCount}</div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid #f1f5f9',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}
        >
          Recent Attendance
        </div>

        <table style={{ width: '100%' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th>Employee</th>
              <th>Department</th>
              <th>Date</th>
              <th>Timings</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {attendanceList.map((record) => (
              <tr key={record._id}>
                <td>
                  <div style={{ fontWeight: 'bold', color: '#334155' }}>{record.userId?.name || 'Unknown'}</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{record.userId?.email}</div>
                </td>

                <td>
                  <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>
                    {record.userId?.department || 'General'}
                  </span>
                </td>

                <td>{record.date}</td>

                <td>
                  <div style={{ fontSize: '0.9rem' }}>
                    In: {record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '-'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                    Out: {record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '-'}
                  </div>
                </td>

                <td>
                  <span className={getStatusClass(record.status)}>{record.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default ManagerDashboard;
