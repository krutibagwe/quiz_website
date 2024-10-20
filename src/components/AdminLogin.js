// src/components/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Predefined admin email
    const adminEmail = 'admin@gmail.com'; // Replace with your actual admin email

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        try {
            // Sign in with Firebase authentication
            await signInWithEmailAndPassword(auth, email, password);

            // Check if the logged-in email matches the admin email
            if (email !== adminEmail) {
                setError("You're not authorized to log in as Admin.");
                return;
            }

            console.log("Admin Logged In:", email);
            navigate('/upload-question'); // Navigate to the Upload Question page for Admin
        } catch (err) {
            setError(err.message); // Display error message on failed login
        }
    };

    return (
        <section className="text-white text-center bg-dark vh-100">
            <div className="container h-100">
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-lg-6">
                        <h1 className='fw-bold mb-4'>Admin Login</h1>
                        {error && <div className="alert alert-danger">{error}</div>} {/* Display errors */}
                        <form onSubmit={handleAdminLogin} className="card p-4 bg-secondary">
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Admin Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-light fw-bold w-100">Login as Admin</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminLogin;
