import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import EnterMarks from './components/EnterMarks/EnterMarks';
import StudentDetails from './components/StudentDetails/StudentDetails';
import { useState } from 'react';
import Logout from './components/Logout/Logout';
import UpdateMarks from './components/UpdateMarks/UpdateMarks';
import DeleteDetails from './components/DeleteDetails/DeleteDetails';

function App() {
  const [role, setRole] = useState('');
  const [profileVisible, setProfileVisible] = useState(false);

  return (
    <BrowserRouter>
      <Navbar role={role} profileVisible={profileVisible} />
      <Routes>
        <Route path='/' element={<Home setRole={setRole} />} />
        <Route path='/login' element={<Login setRoleVar={setRole} setProfileVisible={setProfileVisible} />} />
        <Route path='/register' element={<Register setProfileVisible={setProfileVisible} />} />
        <Route path='/details' element={<StudentDetails />} />
        <Route path='/logout' element={<Logout setRole={setRole} />} />
        <Route path='/entermarks' element={<EnterMarks />} />
        <Route path='/mark/:id' element={<UpdateMarks />} />
        <Route path='/delete/:id' element={<DeleteDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
