import React from 'react';
import './DetailsCard.css';
import { Link } from 'react-router-dom';

const DetailsCard = ({ student }) => {
    const { firstName, lastName, email, age, marks } = student;

    return (
        <div className='stu-card'>
            <div className='student-details'>
                <p>{firstName}</p>
                <p>{lastName}</p>
                <p>{email}</p>
                <p>{age}</p>
            </div>
            <div className="marks-details">
                {marks && marks.map((mark, index) => (
                    <div key={index}>
                        <p>Tamil: {mark.tamil}</p>
                        <p>Science: {mark.science}</p>
                        <p>Islam: {mark.islam}</p>
                        <p>Maths: {mark.maths}</p>
                        <p>English: {mark.english}</p>
                        <p>History: {mark.history}</p>
                        <p>ICT: {mark.ICT}</p>
                        <p>Commerce: {mark.commerce}</p>
                        <p>Geography: {mark.geography}</p>
                        <div className="marks-action">
                            <button><Link to={`/mark/${mark._id}`}>Edit</Link></button>
                            <button> <Link to={`/delete/${student._id}`}>Delete</Link></button>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default DetailsCard;
