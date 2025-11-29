import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className='header' style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid #e6e6e6', marginBottom: '40px' }}>
      <div className='logo'>
        <Link to='/' style={{ fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>Employee Attendance</Link>
      </div>
      <ul style={{ display: 'flex', alignItems: 'center', gap: '20px', listStyle: 'none', margin: 0 }}>
        {user ? (
          <>
            <li>
              <Link to='/dashboard' style={{ textDecoration: 'none', color: '#000', fontWeight: '500' }}>Dashboard</Link>
            </li>
            <li>
              <Link to='/history' style={{ textDecoration: 'none', color: '#000', fontWeight: '500' }}>My History</Link>
            </li>
            
            {/* Show this link ONLY if user is a Manager */}
            {user.role === 'manager' && (
              <li>
                 <Link to='/admin' style={{ textDecoration: 'none', color: 'red', fontWeight: 'bold' }}>Manager View</Link>
              </li>
            )}

            <li>
              <button className='btn' onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login' style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: '#000' }}>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register' style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: '#000' }}>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;