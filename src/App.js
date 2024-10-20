// // src/App.js
// import React, { useState } from 'react';
// import Start from './components/Start';
// import Quiz from './components/Quiz';
// import Result from './components/Result';
// import UploadQue from './components/UploadQue'; // Import UploadQue component
// import { DataProvider } from './context/dataContext';

// function App() {
//   const [showUploadQue, setShowUploadQue] = useState(false); // State to toggle UploadQue page

//   const toggleUploadPage = () => {
//     setShowUploadQue(!showUploadQue); // Toggle between quiz and upload form
//   };

//   return (
//     <DataProvider>
//       <div className="App-header">
//         {/* Button to toggle between Quiz and Upload Question */}
//         <button className="btn btn-light m-3" onClick={toggleUploadPage}>
//           {showUploadQue ? "Go to Quiz" : "Upload Questions"}
//         </button>

//         {/* Show UploadQue component or the Quiz components */}
//         {showUploadQue ? (
//           <UploadQue /> // Render UploadQue if toggled on
//         ) : (
//           <>
//             {/* Welcome Page */}
//             <Start />

//             {/* Quiz Page */}
//             <Quiz />

//             {/* Result Page */}
//             <Result />
//           </>
//         )}
//       </div>
//     </DataProvider>
//   );
// }

// export default App;

// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChooseRole from './components/ChooseRole';
import AdminLogin from './components/AdminLogin';
import Login from './components/Login';
import Signup from './components/Signup';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ChooseRole />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/start" element={<Start />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </Router>
    );
}

export default App;

