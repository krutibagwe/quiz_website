// src/components/Signup.js

import React, { useState } from 'react';
import { auth, db } from '../firebase'; // Make sure to import Firestore
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState(''); // First name state
    const [surname, setSurname] = useState(''); // Surname state
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create a document in Firestore for the user
            await setDoc(doc(db, 'users', user.uid), {
                firstName: firstName,
                surname: surname,
                email: email,
                role: 'Student' // You can set the role here, adjust as needed
            });

            console.log("User created in Firebase and Firestore:", user);
            navigate('/login'); // Navigate to login after successful signup
        } catch (err) {
            setError(err.message);
        }
    };

    const goToLogin = () => {
        navigate('/login'); // Navigate to the login page
    };

    return (
        <section className="text-white text-center bg-dark vh-100">
            <div className="container h-100">
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-lg-6">
                        <h1 className="fw-bold mb-4">Sign Up</h1>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSignup} className="card p-4 bg-secondary">
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Surname"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    required
                                />
                            </div>
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
                            <button type="submit" className="btn btn-light fw-bold w-100">Sign Up</button>
                        </form>
                        <div className="mt-3">
                            <button className="btn btn-link text-white" onClick={goToLogin}>
                                Already have an account? Log In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;