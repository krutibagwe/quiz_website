// src/components/Start.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/dataContext'; // Ensure the correct import

const Start = () => {
    const { startQuiz } = useContext(DataContext);
    const navigate = useNavigate();

    const handleStartQuiz = async () => {
        await startQuiz(); // This should now fetch and shuffle 10 random questions
        navigate('/quiz'); // Navigate to the quiz page
    };

    return (
        <section className='text-white text-center bg-dark vh-100'>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <h1 className='fw-bold mb-4'>Basic React JS Quiz</h1>
                        <button onClick={handleStartQuiz} className="btn px-4 py-2 bg-light text-dark fw-bold">Start Quiz</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Start;
