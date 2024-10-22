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
import UploadQue from './components/UploadQue';
import { DataProvider } from './context/dataContext'; 

function App() {
    return (
        <DataProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<ChooseRole />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/start" element={<Start />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/upload-question" element={<UploadQue/>} />
                </Routes>
            </Router>
        </DataProvider>
    );
}

export default App;