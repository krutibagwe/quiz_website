// // src/context/dataContext.js
// import { createContext, useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase"; // import Firebase db

// const DataContext = createContext({});

// export const DataProvider = ({children}) => {
//   const [quizs, setQuizs] = useState([]);
//   const [question, setQuesion] = useState({});
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [correctAnswer, setCorrectAnswer] = useState('');
//   const [selectedAnswer, setSelectedAnswer] = useState('');
//   const [marks, setMarks] = useState(0);

//   const [showStart, setShowStart] = useState(true);
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [showResult, setShowResult] = useState(false);

//   // Fetch data from Firebase Firestore
//   const fetchQuizData = async () => {
//     const quizCollection = collection(db, "quizzes");
//     const quizSnapshot = await getDocs(quizCollection);
//     const quizList = quizSnapshot.docs.map(doc => doc.data());
//     setQuizs(quizList);
//   };

//   useEffect(() => {
//     fetchQuizData(); // Fetch quiz data from Firebase on load
//   }, []);

//   useEffect(() => {
//     if (quizs.length > questionIndex) {
//       setQuesion(quizs[questionIndex]);
//     }
//   }, [quizs, questionIndex]);

//   const startQuiz = () => {
//     setShowStart(false);
//     setShowQuiz(true);
//   };

//   const checkAnswer = (event, selected) => {
//     if (!selectedAnswer) {
//       setCorrectAnswer(question.answer);
//       setSelectedAnswer(selected);

//       if (selected === question.answer) {
//         event.target.classList.add('bg-success');
//         setMarks(marks + 5);
//       } else {
//         event.target.classList.add('bg-danger');
//       }
//     }
//   };

//   const nextQuestion = () => {
//     setCorrectAnswer('');
//     setSelectedAnswer('');
//     document.querySelector('button.bg-danger')?.classList.remove('bg-danger');
//     document.querySelector('button.bg-success')?.classList.remove('bg-success');
//     setQuestionIndex(questionIndex + 1);
//   };

//   const showTheResult = () => {
//     setShowResult(true);
//     setShowStart(false);
//     setShowQuiz(false);
//   };

//   const startOver = () => {
//     setShowStart(false);
//     setShowResult(false);
//     setShowQuiz(true);
//     setCorrectAnswer('');
//     setSelectedAnswer('');
//     setQuestionIndex(0);
//     setMarks(0);
//     document.querySelector('button.bg-danger')?.classList.remove('bg-danger');
//     document.querySelector('button.bg-success')?.classList.remove('bg-success');
//   };

//   return (
//     <DataContext.Provider value={{
//         startQuiz, showStart, showQuiz, question, quizs, checkAnswer, correctAnswer,
//         selectedAnswer, questionIndex, nextQuestion, showTheResult, showResult, marks,
//         startOver
//     }}>
//       {children}
//     </DataContext.Provider>
//   );
// }

// export default DataContext;
// src/context/dataContext.js
// src/context/dataContext.js
import React, { createContext, useState } from 'react';
import { db } from '../firebase'; // Firestore database import
import { collection, getDocs } from 'firebase/firestore';
import shuffleArray from '../utils/shuffle'; // Shuffle utility

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [quizs, setQuizs] = useState([]); // Store shuffled quiz questions
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);

    // Fetch questions from Firestore and shuffle them
    const startQuiz = async () => {
        try {
            const quizCollectionRef = collection(db, 'quizzes');
            const quizSnapshot = await getDocs(quizCollectionRef);
            const allQuestions = quizSnapshot.docs.map(doc => doc.data());

            // Debugging Log - Check if questions are fetched
            console.log('Fetched Questions:', allQuestions);

            // Shuffle questions and take the first 10
            const shuffledQuestions = shuffleArray(allQuestions).slice(0, 10);
            
            // Debugging Log - Check if questions are shuffled and sliced
            console.log('Shuffled and Sliced Questions (10):', shuffledQuestions);

            setQuizs(shuffledQuestions); // Set shuffled questions in state
            setQuestionIndex(0); // Reset to the first question
        } catch (error) {
            console.error("Error fetching quiz questions: ", error);
        }
    };

    const checkAnswer = (event, selectedOption) => {
        setSelectedAnswer(selectedOption);
        if (quizs[questionIndex]?.answer === selectedOption) {  // Updated from 'correctAnswer' to 'answer'
            setCorrectAnswer(selectedOption);
        }
    };

    const nextQuestion = () => {
        setSelectedAnswer(null);
        setCorrectAnswer(null);
        if (questionIndex < quizs.length - 1) {
            setQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const showTheResult = () => {
        console.log('Quiz completed! Show the results');
    };

    return (
        <DataContext.Provider
            value={{
                quizs,
                questionIndex,
                selectedAnswer,
                correctAnswer,
                startQuiz,
                checkAnswer,
                nextQuestion,
                showTheResult
            }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
