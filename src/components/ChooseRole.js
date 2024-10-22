// src/components/ChooseRole.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChooseRole = () => {
    const navigate = useNavigate();

    const goToAdminLogin = () => {
        navigate('/admin-login'); 
    };

    const goToStudentLogin = () => {
        navigate('/login'); 
    };

    return (
        <section className="text-white text-center bg-dark vh-100">
            <div className="container h-100">
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-lg-6">
                        <h1 className='fw-bold mb-4'>Welcome to Internet Programming Quiz</h1>
                        <h2 className='fw-bold mb-4'>Choose Your Role</h2>
                        <div className="d-grid gap-3">
                            <button className="btn btn-light fw-bold w-100" onClick={goToAdminLogin}>
                                Login as Admin
                            </button>
                            <button className="btn btn-light fw-bold w-100" onClick={goToStudentLogin}>
                                Login as Student
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChooseRole;