import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Hook for navigation

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log(`User Logged In:`, email);
            // After successful login, navigate to the Start page
            navigate('/start'); 
        } catch (err) {
            setError(err.message); // Show error if login fails
        }
    };

    // Navigate to Signup
    const goToSignup = () => {
        navigate('/signup');
    };

    return (
        <section className="text-white text-center bg-dark vh-100">
            <div className="container h-100">
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-lg-6">
                        <h1 className='fw-bold mb-4'>Login</h1>
                        {/* Show error message */}
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleLogin} className="card p-4 bg-secondary">
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
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
                            <button type="submit" className="btn btn-light fw-bold w-100">Login</button>
                            <p className="mt-3 text-light">
                                Don't have an account? 
                                <span 
                                    onClick={goToSignup} 
                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                    Sign Up
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
