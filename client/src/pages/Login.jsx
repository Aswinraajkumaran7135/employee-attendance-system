import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt, FaEnvelope, FaLock } from 'react-icons/fa'; // Icons
import { login, reset } from '../features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate('/dashboard');
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => { e.preventDefault(); dispatch(login({ email, password })); };

  // --- STYLES ---
  const iconStyle = { position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#9ca3af' };
  const inputStyle = { paddingLeft: '45px' }; // Make room for the icon

  return (
    <div className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      
      <section className='form' style={{ maxWidth: '400px', width: '100%' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ background: '#e0e7ff', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
            <FaSignInAlt size={25} color="#4f46e5" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>Welcome Back</h1>
          <p style={{ color: '#6b7280' }}>Login to access your dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit}>
          
          {/* Email Field */}
          <div className='input-group' style={{ position: 'relative' }}>
            <FaEnvelope style={iconStyle} />
            <input 
              type='email' 
              name='email' 
              value={email} 
              placeholder='Enter your email' 
              onChange={onChange} 
              style={inputStyle}
              required 
            />
          </div>

          {/* Password Field */}
          <div className='input-group' style={{ position: 'relative' }}>
            <FaLock style={iconStyle} />
            <input 
              type='password' 
              name='password' 
              value={password} 
              placeholder='Enter password' 
              onChange={onChange} 
              style={inputStyle}
              required 
            />
          </div>

          <div className='input-group'>
            <button type='submit' className='btn' style={{ background: '#4f46e5', color: 'white', marginTop: '10px' }}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#6b7280' }}>
          Don't have an account? <Link to='/register' style={{ color: '#4f46e5', fontWeight: 'bold', textDecoration: 'none' }}>Register here</Link>
        </div>

      </section>
    </div>
  );
}

export default Login;