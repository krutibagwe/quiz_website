// src/components/Result.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Result = () => {
    const navigate = useNavigate();

    const goToStart = () => {
        navigate('/start'); // Navigate back to the Start page
    };

    return (
        <div>
            <h2>Your Quiz Results</h2>
            {/* Display the user's results here */}

            <button onClick={goToStart} className="btn btn-primary">
                Go to Start
            </button>
        </div>
    );
};

export default Result;