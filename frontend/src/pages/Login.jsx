import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import HandleSignUps from '../functions/HandleSignUps'; 
import HandleLogins from '../functions/HandleLogins';
import Navigation from '../functions/Navigation';
import {useUser} from '../functions/userContext';
import '../CssPages/Login.css';

//image imports 
//import NAME from 

const Login = () => {
    const {setUsername} = useUser();
    const [username, setLocalUsername] = useState('');
    const [password, setPassword] = useState('');
    const [view, setView] = useState('login');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {username, password};

        if (view === 'signup') {
            const response = await HandleSignUps(formData);
            if (response) {
                alert('Sign up successful! You can now log in.');
                setView('login');
            }
        } else {
            const token = await HandleLogins(formData);
            if (token) {
                console.log('Token received:', token);
                setUsername(formData.username); //Save username in context
                navigate('/UserPage');
            }
        }
    };

    return (
        <div>
            <header>
                <Navigation />
                <h1>{view === 'login' ? 'Welcome Back' : 'Create an Account'}</h1>
            </header>
        
            <h4></h4>

            <div className='BackgroundRegtangle'>
                <form className='userInput' onSubmit={handleSubmit}>
                    <div>
                        <h3>Username</h3>
                        <input type="text" value={username} onChange={(e) => setLocalUsername(e.target.value)} required />
                    </div>

                    <div>
                        <h3>Password</h3>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="submit">
                        <button type="submit">
                            {view === 'login' ? 'Login' : 'Sign Up'}
                        </button>
                    </div>
                </form>

                <div className="toggleLink">
                    {view === 'login' ? (
                        <div>
                            <p>Don't have an account?</p>
                            <button onClick={() => setView('signup')}>Sign Up</button>
                        </div>
                    ) : (
                        <div>
                            <p>Already have an account?</p>
                            <button onClick={() => setView('login')}>Login</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;