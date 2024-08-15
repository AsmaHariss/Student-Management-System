import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom'

const Profile = ({ setProfileVisible }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setProfileVisible(false);
    navigate('/login');
  };

  return (
    <div className='profile-container'>
      <img
        src={assets.profilPic}
        alt='Profile'
        className='profile-image'
      />
      <div className='profile-drop-down'>
        <Link className='dropdown-link' to="/logout">
          <img src={assets.logoutIcon} alt="Logout" />Logout
        </Link>
        <Link className='dropdown-link'>
          <img src={assets.uploadPicIcon} alt="Upload Profile" />Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
