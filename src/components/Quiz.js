// src/components/Quiz.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/dataContext';

const Quiz = () => {
    const { quizs, questionIndex, checkAnswer, nextQuestion } = useContext(DataContext);
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
    const [isAnswerChecked, setIsAnswerChecked] = useState(false); // Track if answer has been checked
    const navigate = useNavigate(); // useNavigate hook

    const question = quizs[questionIndex];

    // Handle answer selection
    const handleAnswerClick = (item) => {
        if (!isAnswerChecked) {
            setSelectedAnswer(item);
            setIsAnswerChecked(true);
            checkAnswer(item); // Check the selected answer
        }
    };

    // Move to the next question or show the result if it's the last question
    const handleNextQuestion = () => {
        setSelectedAnswer(null); // Reset selected answer
        setIsAnswerChecked(false); // Reset answer checked state

        if (questionIndex + 1 < quizs.length) {
            nextQuestion(); // Move to the next question
        } else {
            navigate('/result'); // Navigate to result page after the last question
        }
    };

    if (!question) {
        return <div className="text-center">Loading quiz...</div>;
    }

    return (
        <section style={{ backgroundColor: '#333', color: 'white', minHeight: '100vh' }}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ maxWidth: '750px', margin: '0 auto' }}>
                    <div style={{ padding: '20px', backgroundColor: '#444', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h5 style={{ maxWidth: '70%', margin: 0, lineHeight: '1.4' }}>{question.question}</h5>
                    <h5 style={{ color: '#60d600', margin: 0 }}>
                        {questionIndex + 1} / {quizs.length}
                    </h5>
                </div>

                        <div>
                            {question.options.map((item, index) => (
                                <button
                                    key={index}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        textAlign: 'left',
                                        padding: '10px',
                                        marginTop: '10px',
                                        backgroundColor: '#555',
                                        border: 'none',
                                        borderRadius: '5px',
                                        color: 'white',
                                    }}
                                    className={`${
                                        isAnswerChecked && item === question.answer ? 'bg-success' : ''
                                    } ${isAnswerChecked && item !== question.answer && selectedAnswer === item ? 'bg-danger' : ''}`}
                                    onClick={() => handleAnswerClick(item)}
                                    disabled={isAnswerChecked} // Disable buttons after answer is selected
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <button
                            style={{
                                padding: '10px',
                                width: '100%',
                                marginTop: '15px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                fontWeight: 'bold',
                                border: 'none',
                                borderRadius: '5px',
                            }}
                            onClick={handleNextQuestion}
                            disabled={!selectedAnswer} // Button is disabled until an answer is selected
                        >
                            {questionIndex + 1 === quizs.length ? 'Show Result' : 'Next Question'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quiz;


// // src/components/Quiz.js
// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import DataContext from '../context/dataContext';

// const Quiz = () => {
//     const { quizs, questionIndex, checkAnswer, nextQuestion } = useContext(DataContext);
//     const [selectedAnswer, setSelectedAnswer] = useState(null); 
//     const [isAnswerChecked, setIsAnswerChecked] = useState(false); 
//     const navigate = useNavigate(); 

//     const question = quizs[questionIndex];

//     const handleAnswerClick = (item) => {
//         if (!isAnswerChecked) {
//             setSelectedAnswer(item);
//             setIsAnswerChecked(true);
//             checkAnswer(item); 
//         }
//     };

//     const handleNextQuestion = () => {
//         setSelectedAnswer(null); 
//         setIsAnswerChecked(false); 

//         if (questionIndex + 1 < quizs.length) {
//             nextQuestion(); 
//         } else {
//             navigate('/result'); 
//         }
//     };

//     if (!question) {
//         return <div className="text-center text-white">Loading quiz...</div>;
//     }

//     return (
//         <section className="bg-dark text-white vh-100">
//             <div className="container">
//                 <div className="row vh-100 align-items-center justify-content-center">
//                     <div className="col-lg-8">
//                         <div className="card p-4" style={{ background: '#3d3d3d', borderColor: '#646464' }}>
//                             <div className="d-flex justify-content-between gap-md-3">
//                             <h5 className='mb-2 fs-normal lh-base' style={{ color: 'white' }}>{question.question}</h5>
//                                 <h5 style={{ color: '#60d600', width: '100px', textAlign: 'right' }}>
//                                     {questionIndex + 1} / {quizs.length}
//                                 </h5>
//                             </div>

//                             <div>
//                                 {question.options.map((item, index) => (
//                                     <button
//                                         key={index}
//                                         className={`option w-100 text-start btn text-white py-2 px-3 mt-3 rounded btn-dark ${
//                                             isAnswerChecked && item === question.answer ? 'bg-success' : ''
//                                         } ${
//                                             isAnswerChecked && item !== question.answer && selectedAnswer === item ? 'bg-danger' : ''
//                                         }`}
//                                         onClick={() => handleAnswerClick(item)}
//                                         disabled={isAnswerChecked} 
//                                     >
//                                         {item}
//                                     </button>
//                                 ))}
//                             </div>

//                             <button
//                                 className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
//                                 onClick={handleNextQuestion}
//                                 disabled={!selectedAnswer}  
//                             >
//                                 {questionIndex + 1 === quizs.length ? 'Show Result' : 'Next Question'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Quiz;
