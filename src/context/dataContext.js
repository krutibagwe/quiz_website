// src/context/dataContext.js
import { createContext, useState, useEffect } from "react";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";
import shuffleArray from "../utils/shuffle"; 

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [quizs, setQuizs] = useState([]); 
    const [questionIndex, setQuestionIndex] = useState(0); 
    const [marks, setMarks] = useState(0); 

    const fetchQuizzes = async () => {
        const quizCollection = collection(db, "quizzes");
        const quizSnapshot = await getDocs(quizCollection);
        const quizzesData = quizSnapshot.docs.map(doc => ({
            id: doc.id,
            question: doc.data().question,
            options: doc.data().options,
            answer: doc.data().answer
        }));

        // Shuffle the quizzes and select the first 10
        const shuffledQuizzes = shuffleArray(quizzesData);
        setQuizs(shuffledQuizzes.slice(0, 10));
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    // Start Quiz
    const startQuiz = () => {
        setMarks(0);
        setQuestionIndex(0);
        fetchQuizzes(); 
    };

    const checkAnswer = (selected) => {
        if (selected === quizs[questionIndex].answer) {
            setMarks(marks + 1); 
        }
    };

    const nextQuestion = () => {
        setQuestionIndex(prevIndex => prevIndex + 1); 
    };

    return (
        <DataContext.Provider value={{
            startQuiz, quizs, checkAnswer, questionIndex, marks, nextQuestion
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;