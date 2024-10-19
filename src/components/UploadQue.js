// src/components/UploadQue.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore configuration

const UploadQue = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [answer, setAnswer] = useState('');

    // Update options array dynamically
    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    // Upload question to Firestore
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!question || options.some(option => option === '') || !answer) {
            alert('Please fill in all fields!');
            return;
        }

        try {
            await addDoc(collection(db, 'quizzes'), {
                question: question,
                options: options,
                answer: answer
            });

            // Reset form after successful submission
            setQuestion('');
            setOptions(['', '', '', '']);
            setAnswer('');

            alert('Question uploaded successfully!');
        } catch (error) {
            console.error('Error uploading question: ', error);
            alert('Failed to upload question. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Upload a Quiz Question</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Question</label>
                    <input
                        type="text"
                        className="form-control"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter the quiz question"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Options</label>
                    {options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            className="form-control mb-2"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="mb-3">
                    <label className="form-label">Correct Answer</label>
                    <input
                        type="text"
                        className="form-control"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter the correct answer"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Upload Question</button>
            </form>
        </div>
    );
};

export default UploadQue;
