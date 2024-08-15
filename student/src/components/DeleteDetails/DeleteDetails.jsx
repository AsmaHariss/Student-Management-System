import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const DeleteDetails = () => {
    const {id} = useParams()
    const navigate = useNavigate()
  return (
    
    useEffect(() => {
        axios.delete(`http://localhost:3001/studentRoute/student/${id}`)
            .then(res => {
                if (res.data.deleted) {
                    navigate('/details');
                }
            }).catch(err => console.log(err));
    }, [])    
  )
}

export default DeleteDetails
