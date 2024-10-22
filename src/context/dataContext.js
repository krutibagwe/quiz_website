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
import { db } from "../firebase"; // Assuming Firebase is already configured
import { collection, getDocs } from "firebase/firestore";
import shuffleArray from "../utils/shuffle"; // Assuming shuffle utility is available

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [quizs, setQuizs] = useState([]); // Store quizzes
    const [questionIndex, setQuestionIndex] = useState(0); // Current question index
    const [marks, setMarks] = useState(0); // User's marks

    // Function to fetch quizzes from Firestore
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

    // Load quiz data when the component mounts
    useEffect(() => {
        fetchQuizzes();
    }, []);

    // Start Quiz
    const startQuiz = () => {
        setMarks(0);
        setQuestionIndex(0);
        fetchQuizzes(); // Fetch new quizzes when the quiz is started
    };

    // Check Answer
    const checkAnswer = (selected) => {
        if (selected === quizs[questionIndex].answer) {
            setMarks(marks + 1); // Increment marks by 5 for a correct answer
        }
    };

    // Move to the Next Question
    const nextQuestion = () => {
        setQuestionIndex(prevIndex => prevIndex + 1); // Move to next question
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
