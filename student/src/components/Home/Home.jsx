import React, { useEffect } from 'react'
import axios from 'axios'
import Header from '../Header/Header';


const Home = ({ setRole }) => {

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3001/auth/verify')
      .then(res => {
        if (res.data.login) {
          setRole(res.data.role)
        } else {
          setRole('')
        }
        console.log(res)
      }).catch(err => console.log(err))
  }, [])
  return (
    <div>
      <Header />
    </div>
  )
}

export default Home
