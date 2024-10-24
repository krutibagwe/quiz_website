// src/components/Quiz.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import DataContext from '../context/dataContext';

const Quiz = () => {
    const { quizs, questionIndex, checkAnswer, nextQuestion } = useContext(DataContext);
    const [selectedAnswer, setSelectedAnswer] = useState(null); 
    const [isAnswerChecked, setIsAnswerChecked] = useState(false); 
    const navigate = useNavigate(); 

    const question = quizs[questionIndex];

    const handleAnswerClick = (item) => {
        if (!isAnswerChecked) {
            setSelectedAnswer(item);
            setIsAnswerChecked(true);
            checkAnswer(item); 
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null); 
        setIsAnswerChecked(false); 

        if (questionIndex + 1 < quizs.length) {
            nextQuestion(); 
        } else {
            navigate('/result'); 
        }
    };

    if (!question) {
        return <div className="text-center text-white">Loading quiz...</div>;
    }

    return (
        <section className="bg-dark text-white vh-100">
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <div className="card p-4" style={{ background: '#3d3d3d', borderColor: '#646464' }}>
                            <div className="d-flex justify-content-between gap-md-3">
                            <h5 className='mb-2 fs-normal lh-base' style={{ color: 'white' }}>{question.question}</h5>
                                <h5 style={{ color: '#60d600', width: '100px', textAlign: 'right' }}>
                                    {questionIndex + 1} / {quizs.length}
                                </h5>
                            </div>

                            <div>
                                {question.options.map((item, index) => (
                                    <button
                                        key={index}
                                        className={`option w-100 text-start btn text-white py-2 px-3 mt-3 rounded btn-dark ${
                                            isAnswerChecked && item === question.answer ? 'bg-success' : ''
                                        } ${
                                            isAnswerChecked && item !== question.answer && selectedAnswer === item ? 'bg-danger' : ''
                                        }`}
                                        onClick={() => handleAnswerClick(item)}
                                        disabled={isAnswerChecked} 
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            <button
                                className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
                                onClick={handleNextQuestion}
                                disabled={!selectedAnswer}  
                            >
                                {questionIndex + 1 === quizs.length ? 'Show Result' : 'Next Question'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quiz;
