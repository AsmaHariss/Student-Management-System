import React, { useEffect, useState } from 'react';
import './StudentDetails.css';
import axios from 'axios';
import DetailsCard from '../DetailsCard/DetailsCard';

const StudentDetails = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/studentRoute/details')
      .then(res => {
        setStudents(res.data);
        console.log(res.data);
      }).catch(err => console.log(err));
  }, []);

  return (
    <div className='marks-list'>
      {students.map(student => (
        <DetailsCard key={student._id} student={student} />
      ))}
    </div>
  );
};

export default StudentDetails;
