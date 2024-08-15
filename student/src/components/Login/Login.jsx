import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setRoleVar, setProfileVisible }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleBack = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setUsername('');
    setPassword('');
    setRole('student');
    navigate('/login'); 
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {};

    if (role === 'teacher') {
      data = { username, password, role };
    } else if (role === 'student') {
      data = { firstName, lastName, email, role };
    }

    axios.post('http://localhost:3001/auth/login', data)
      .then(res => {
        console.log(res); 
        if (res.data.login) {
          setRoleVar(res.data.role);
          setProfileVisible(true); 
          if (res.data.role === 'teacher') {
            navigate('/details');
          } else if (res.data.role === 'student') {
            navigate('/entermarks');
          }
        } else {
          console.log('Login failed');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>Login Here</h2>
        <select className='select-role' name="role" id="role" value={role} onChange={handleRoleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        {role === 'student' && (
          <>
            <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <p>Don't you have an account? &nbsp;<Link to="/register"><span>Create an Account</span></Link></p>
          </>
        )}
        {role === 'teacher' && (
          <>
            <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <p className='go-to-back' onClick={handleBack}><span><b>&#8617;</b></span>Back</p>
          </>
        )}
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default Login;
