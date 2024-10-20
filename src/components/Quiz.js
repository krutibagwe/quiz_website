// src/components/Quiz.js
import React, { useContext, useState } from 'react';
import DataContext from '../context/dataContext';

const Quiz = () => {
    const {
        quizs,                 // The array of quiz questions
        questionIndex,          // Current question index
        checkAnswer,            // Function to check the user's answer
        nextQuestion,           // Function to move to the next question
        showTheResult           // Function to show the result at the end
    } = useContext(DataContext);

    const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
    const [isAnswerChecked, setIsAnswerChecked] = useState(false); // Track if answer has been checked

    // Get the current question from the quiz array based on the index
    const question = quizs[questionIndex];

    // Handle answer selection
    const handleAnswerClick = (item) => {
        if (!isAnswerChecked) {
            setSelectedAnswer(item);
            setIsAnswerChecked(true);
            checkAnswer(item); // Check the selected answer
        }
    };

    // Move to the next question and reset state
    const handleNextQuestion = () => {
        setSelectedAnswer(null);     // Reset selected answer
        setIsAnswerChecked(false);   // Reset answer checked state
        nextQuestion();              // Move to the next question
    };

    // If the quiz is still loading or no question is found
    if (!question) {
        return <div className="text-center text-white">Loading quiz...</div>;
    }

    return (
        <section className="bg-dark text-white vh-100">
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <div className="card p-4" style={{ background: '#3d3d3d', borderColor: '#646464' }}>
                            {/* Question Text */}
                            <div className="d-flex justify-content-between gap-md-3">
                                <h5 className='mb-2 fs-normal lh-base'>{question.question}</h5>
                                <h5 style={{ color: '#60d600', width: '100px', textAlign: 'right' }}>
                                    {questionIndex + 1} / {quizs.length}
                                </h5>
                            </div>

                            {/* Options */}
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
                                        disabled={isAnswerChecked} // Disable buttons after answer is selected
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            {/* Next or Show Result Button */}
                            {(questionIndex + 1) !== quizs.length ? (
                                <button
                                    className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
                                    onClick={handleNextQuestion}
                                    disabled={!selectedAnswer}  // Button is disabled until an answer is selected
                                >
                                    Next Question
                                </button>
                            ) : (
                                <button
                                    className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
                                    onClick={showTheResult}
                                    disabled={!selectedAnswer}  // Button is disabled until an answer is selected
                                >
                                    Show Result
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quiz;

