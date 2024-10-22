
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
        <section className="bg-dark text-white vh-100">
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <div className="card p-4" style={{ background: '#3d3d3d', borderColor: '#646464', color: 'white' }}>
                            <h2 className="text-center mb-4" style={{ color: '#ffffff' }}>
                                Your Quiz Results
                            </h2>
                            <p className="text-center mb-3" style={{ fontSize: '1.2rem', color: '#ffffff' }}>
                                You scored <span style={{ fontWeight: 'bold', color: '#ffffff' }}>{marks}</span> out of{' '}
                                <span style={{ fontWeight: 'bold', color: '#ffffff' }}>{quizs.length}</span> points!
                            </p>

                            <button onClick={goToStart} className="btn py-2 w-100 bg-primary text-light fw-bold">
                                Go to Start
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Result;