import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock, FaIdBadge, FaBuilding, FaUserPlus } from 'react-icons/fa'; // Icons
import { register, reset } from '../features/auth/authSlice';

function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', employeeId: '', department: ''
  });
  const { name, email, password, employeeId, department } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate('/dashboard');
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => { e.preventDefault(); dispatch(register(formData)); };

  // --- STYLES ---
  const iconStyle = { position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#9ca3af' };
  const inputStyle = { paddingLeft: '45px' };

  return (
    <div className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
      
      <section className='form' style={{ maxWidth: '450px', width: '100%' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ background: '#dbeafe', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
            <FaUserPlus size={25} color="#2563eb" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>Create Account</h1>
          <p style={{ color: '#6b7280' }}>Join the team attendance system</p>
        </div>

        <form onSubmit={onSubmit}>
          
          {/* Name */}
          <div className='input-group' style={{ position: 'relative' }}>
            <FaUser style={iconStyle} />
            <input type='text' name='name' value={name} placeholder='Full Name' onChange={onChange} style={inputStyle} required />
          </div>

          {/* Email */}
          <div className='input-group' style={{ position: 'relative' }}>
            <FaEnvelope style={iconStyle} />
            <input type='email' name='email' value={email} placeholder='Email Address' onChange={onChange} style={inputStyle} required />
          </div>

          {/* Password */}
          <div className='input-group' style={{ position: 'relative' }}>
            <FaLock style={iconStyle} />
            <input type='password' name='password' value={password} placeholder='Password' onChange={onChange} style={inputStyle} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {/* Employee ID */}
            <div className='input-group' style={{ position: 'relative', marginBottom: 0 }}>
              <FaIdBadge style={iconStyle} />
              <input type='text' name='employeeId' value={employeeId} placeholder='Emp ID' onChange={onChange} style={inputStyle} required />
            </div>

            {/* Department */}
            <div className='input-group' style={{ position: 'relative', marginBottom: 0 }}>
              <FaBuilding style={iconStyle} />
              <input type='text' name='department' value={department} placeholder='Dept' onChange={onChange} style={inputStyle} required />
            </div>
          </div>

          <div className='input-group' style={{ marginTop: '20px' }}>
            <button type='submit' className='btn' style={{ background: '#2563eb', color: 'white' }}>
              {isLoading ? 'Creating...' : 'Register'}
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#6b7280' }}>
          Already have an account? <Link to='/login' style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}>Login here</Link>
        </div>

      </section>
    </div>
  );
}

export default Register;