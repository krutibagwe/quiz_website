// src/components/Result.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/dataContext';

const Result = () => {
    const { marks, quizs } = useContext(DataContext); // Get marks and quizs from context
    const navigate = useNavigate();

    const goToStart = () => {
        navigate('/start'); // Navigate back to the Start page
    };

    return (
        <div className="container text-center">
            <h2>Your Quiz Results</h2>
            <p>You scored {marks} out of {quizs.length } points!</p> {/* Assuming 5 points per question */}
            <button onClick={goToStart} className="btn btn-primary">
                Go to Start
            </button>
        </div>
    );
};

export default Result;
