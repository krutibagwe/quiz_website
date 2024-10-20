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
import { createContext, useState, useEffect } from "react";
import { db } from "../firebase"; // Import your Firebase config
import { collection, getDocs } from "firebase/firestore"; // Firestore methods
import shuffleArray from "../utils/shuffle"; // Import the shuffle utility

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    // State variables
    const [quizs, setQuizs] = useState([]); // Store quizzes
    const [question, setQuestion] = useState({}); // Current question
    const [questionIndex, setQuestionIndex] = useState(0); // Current question index
    const [correctAnswer, setCorrectAnswer] = useState(''); // Correct answer for the current question
    const [selectedAnswer, setSelectedAnswer] = useState(''); // User's selected answer
    const [marks, setMarks] = useState(0); // User's marks

    // Function to fetch quizzes from Firestore
    const fetchQuizzes = async () => {
        const quizCollection = collection(db, "quizzes"); // Reference to the quizzes collection
        const quizSnapshot = await getDocs(quizCollection); // Fetch documents
        const quizzesData = quizSnapshot.docs.map(doc => ({
            id: doc.id,
            question: doc.data().question, // Get the question
            options: doc.data().options, // Get the options array
            answer: doc.data().answer // Get the answer
        })); // Map to data

        // Shuffle the quizzes and select the first 10
        const shuffledQuizzes = shuffleArray(quizzesData);
        setQuizs(shuffledQuizzes.slice(0, 10)); // Set only 10 random quizzes
    };

    // Load quiz data from Firestore when the component mounts
    useEffect(() => {
        fetchQuizzes();
    }, []);

    // Set a Single Question
    useEffect(() => {
        if (quizs.length > 0 && questionIndex < quizs.length) {
            setQuestion(quizs[questionIndex]); // Set current question based on index
        }
    }, [quizs, questionIndex]);

    // Start Quiz
    const startQuiz = () => {
        setMarks(0);
        setQuestionIndex(0);
        setSelectedAnswer('');
        setCorrectAnswer('');
        fetchQuizzes(); // Fetch new quizzes each time the quiz is started
    };

    // Check Answer
    const checkAnswer = (selected) => {
        if (!selectedAnswer) {
            setCorrectAnswer(question.answer); // Set the correct answer
            setSelectedAnswer(selected); // Set the selected answer
            if (selected === question.answer) {
                setMarks(marks + 5); // Increment marks if the answer is correct
            }
        }
    };

    // Next Question
    const nextQuestion = () => {
        setCorrectAnswer(''); // Reset correct answer state
        setSelectedAnswer(''); // Reset selected answer state
        setQuestionIndex(prevIndex => prevIndex + 1); // Move to the next question
    };

    // Show Result (implement this function based on your UI needs)
    const showTheResult = () => {
        // Handle showing result logic here
    };

    return (
        <DataContext.Provider value={{
            startQuiz, question, quizs, checkAnswer, correctAnswer,
            selectedAnswer, questionIndex, nextQuestion, showTheResult, marks
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
