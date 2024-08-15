import React, { useEffect, useState } from 'react';
import './UpdateMarks.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateMarks = () => {
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
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:3001/marksRoute/mark/' + id)
            .then(res => {
                setTamil(res.data.tamil);
                setScience(res.data.science);
                setIslam(res.data.islam);
                setMaths(res.data.maths);
                setEnglish(res.data.english);
                setHistory(res.data.history);
                setICT(res.data.ICT);
                setCommerce(res.data.commerce);
                setGeography(res.data.geography);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tamil || !science || !islam || !maths || !english || !history || !ICT || !commerce || !geography) {
            alert('Please fill all fields');
            return;
        }

        axios.put('http://localhost:3001/marksRoute/mark/' + id, {
            tamil, science, islam, maths, english, history, ICT, commerce, geography
        })
            .then(res => {
                if (res.data.updated) {
                    navigate('/details');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <form className="allMarks" onSubmit={handleSubmit}>
            <div className="allMarks-left">
                <p className="title">Let's update the marks</p>

                <div className="multi-fields">
                    <label htmlFor="tamil">Tamil</label>
                    <input id="tamil" onChange={(e) => setTamil(e.target.value)} value={tamil} type="number" required />

                    <label htmlFor="science">Science</label>
                    <input id="science" onChange={(e) => setScience(e.target.value)} value={science} type="number" required />

                    <label htmlFor="islam">Islam</label>
                    <input id="islam" onChange={(e) => setIslam(e.target.value)} value={islam} type="number" required />
                </div>

                <div className="multi-fields">
                    <label htmlFor="maths">Maths</label>
                    <input id="maths" onChange={(e) => setMaths(e.target.value)} value={maths} type="number" required />

                    <label htmlFor="english">English</label>
                    <input id="english" onChange={(e) => setEnglish(e.target.value)} value={english} type="number" required />

                    <label htmlFor="history">History</label>
                    <input id="history" onChange={(e) => setHistory(e.target.value)} value={history} type="number" required />
                </div>

                <div className="multi-fields">
                    <label htmlFor="ICT">Information Tech</label>
                    <input id="ICT" onChange={(e) => setICT(e.target.value)} value={ICT} type="number" required />

                    <label htmlFor="commerce">Commerce</label>
                    <input id="commerce" onChange={(e) => setCommerce(e.target.value)} value={commerce} type="number" required />

                    <label htmlFor="geography">Geography</label>
                    <input id="geography" onChange={(e) => setGeography(e.target.value)} value={geography} type="number" required />
                </div>

                <button className='update-button'>UPDATE</button>
            </div>
        </form>
    );
};

export default UpdateMarks;
