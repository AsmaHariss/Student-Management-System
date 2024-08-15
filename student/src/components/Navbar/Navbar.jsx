import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import Profile from '../Profile/Profile'

const Navbar = ({ role }) => {
  return (
    <nav className='navbar'>
      <div className="navbar-left">
        <Link to="/" className='navbar-title'>Student Management System</Link>
      </div>

      <div className="navbar-right">
        {role === '' ?
          <Link className='navbar-link' to="/login">Login</Link>
          :
          <Profile />

        }
      </div>
    </nav>

  )
}

export default Navbar
