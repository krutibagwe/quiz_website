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
import { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";  // Firestore configuration
import { shuffleArray } from "../utils/shuffle"; // Utility to shuffle array

const DataContext = createContext({});

export const DataProvider = ({children}) => {
  // All Quizs, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks
  const [quizs, setQuizs] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);

  // Display Controlling States
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Fetch random 10 questions from Firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        const allQuestions = querySnapshot.docs.map((doc) => doc.data());
        
        // Shuffle the questions and select 10 random ones
        const shuffledQuestions = shuffleArray(allQuestions).slice(0, 10);
        setQuizs(shuffledQuestions);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };

    fetchQuestions();
  }, []);

  // Set a Single Question
  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuestion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex]);

  // Start Quiz
  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  };

  // Check Answer
  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        event.target.classList.add('bg-success');
        setMarks(marks + 5);
      } else {
        event.target.classList.add('bg-danger');
      }
    }
  };

  // Next Question
  const nextQuestion = () => {
    setCorrectAnswer('');
    setSelectedAnswer('');
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
    setQuestionIndex(questionIndex + 1);
  };

  // Show Result
  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  };

  // Start Over
  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMarks(0);
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
  };

  return (
    <DataContext.Provider value={{
      startQuiz, showStart, showQuiz, question, quizs, checkAnswer, correctAnswer,
      selectedAnswer, questionIndex, nextQuestion, showTheResult, showResult, marks,
      startOver
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
