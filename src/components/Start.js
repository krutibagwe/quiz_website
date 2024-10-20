// src/components/Start.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/dataContext';

const Start = () => {
    const { startQuiz } = useContext(DataContext);
    const navigate = useNavigate(); // Hook for navigation

    const handleStartQuiz = async () => {
        await startQuiz(); // Initiate quiz and prepare questions
        navigate('/quiz'); // Navigate to quiz page
    };

    return (
        <section className="text-white text-center bg-dark vh-100">
            <div className="container h-100">
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <h1 className="fw-bold mb-4">React JS Quiz</h1>
                        <button onClick={handleStartQuiz} className="btn px-4 py-2 bg-light text-dark fw-bold">
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Start;
