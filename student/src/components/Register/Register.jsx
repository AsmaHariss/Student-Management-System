import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setProfileVisible }) => { 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(age) <= 18) {
      setError('Age must be greater than 18.');
      return;
    }
    setError('');

    axios.post('http://localhost:3001/studentRoute/register', { firstName, lastName, email, age })
      .then(res => {
        if (res.data.registered) {
          navigate('/entermarks');
          setProfileVisible(true); 
        } else {
          setError(res.data.message); 
        }
        console.log(res);
      })
      .catch(err => {
        setError('An error occurred during registration.'); 
        console.log(err);
      });
  };

  return (
    <div className='register'>
      <form className="register-container" onSubmit={handleSubmit}>
        <h2>Register your details</h2>
        <input 
          type="text" 
          placeholder='First Name' 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder='Last Name' 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder='Email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder='Age' 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
        />
        <p>Already have an account? <Link to="/login"><span>Click here</span></Link></p>
        {error && <p className='error-message'>{error}</p>} {}
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
