import React, { useState } from 'react';
import './EnterMarks.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EnterMarks = () => {
    const [studentEmail, setStudentEmail] = useState('');
    const [tamil, setTamil] = useState('');
    const [science, setScience] = useState('');
    const [islam, setIslam] = useState('');
    const [maths, setMaths] = useState('');
    const [english, setEnglish] = useState('');
    const [history, setHistory] = useState('');
    const [ICT, setICT] = useState('');
    const [commerce, setCommerce] = useState('');
    const [geography, setGeography] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!studentEmail || !tamil || !science || !islam || !maths || !english || !history || !ICT || !commerce || !geography) {
            alert('Please fill all fields');
            return;
        }

        axios.post('http://localhost:3001/marksRoute/entermarks', {
            studentEmail, tamil, science, islam, maths, english, history, ICT, commerce, geography
        })
            .then(res => {
                if (res.data.added) {
                    navigate('/');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="form-title">Enter Your Marks</h2>
            <table className="form-table">
                <tbody>
                    <tr>
                        <td><label htmlFor="studentEmail">Student Email</label></td>
                        <td><input
                            id="studentEmail"
                            type="email"
                            placeholder='Student Email'
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                            required
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="tamil">Tamil</label></td>
                        <td><input
                            id="tamil"
                            type="number"
                            placeholder='Tamil'
                            value={tamil}
                            onChange={(e) => setTamil(e.target.value)}
                            required
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="science">Science</label></td>
                        <td><input
                            id="science"
                            type="number"
                            placeholder='Science'
                            value={science}
                            onChange={(e) => setScience(e.target.value)}
                            required
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="islam">Islam</label></td>
                        <td><input
                            id="islam"
                            type="number"
                            placeholder='Islam'
                            value={islam}
                            onChange={(e) => setIslam(e.target.value)}
                            required
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="maths">Maths</label></td>
                        <td><input
                            id="maths"
                            type="number"
                            placeholder='Maths'
                            value={maths}
                            onChange={(e) => setMaths(e.target.value)}
                            required
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="english">English</label></td>
                        <td><input
                            id="english"
                            type="number"
                            placeholder='English'
                            value={english}
                            onChange={(e) => setEnglish(e.target.value)}
                            required
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="history">History</label></td>
                        <td><input
                            id="history"
                            type="number"
                            placeholder='History'
                            value={history}
                            onChange={(e) => setHistory(e.target.value)}
                            required
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="ICT">Information Tech</label></td>
                        <td><input
                            id="ICT"
                            type="number"
                            placeholder='Information Tech'
                            value={ICT}
                            onChange={(e) => setICT(e.target.value)}
                            required
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="commerce">Commerce</label></td>
                        <td><input
                            id="commerce"
                            type="number"
                            placeholder='Commerce'
                            value={commerce}
                            onChange={(e) => setCommerce(e.target.value)}
                            required
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="geography">Geography</label></td>
                        <td><input
                            id="geography"
                            type="number"
                            placeholder='Geography'
                            value={geography}
                            onChange={(e) => setGeography(e.target.value)}
                            required
                        /></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><button className='submit-button' type="submit">SUBMIT</button></td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
};

export default EnterMarks;
