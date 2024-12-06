import React, { useState, useEffect } from 'react';
import '../CssPages/Login.css';

const Login = () => {
    return (
    <div>
        <header>
        </header>

        <h4></h4>
        <h3>Sign Up!</h3>
        
        <div className='userInput'>
            <div>
                <h4>Username</h4>
                <input type="text" />
            </div>
            
            <div>
                <h4>Email</h4>
                <input type="text" />
            </div>
            
            <div>
                <h4>Password</h4>
                <input type="text" />
            </div>
        </div>

        <div className="sumbit"> 
            <div>
                <button>Sign Up!</button>
            </div>
            
            <div>
                <button>Login</button>
            </div>
        </div>
        
        <div className='forgettenPassword'>
            <h4>Forgetten Password?</h4>
            <div>Click Here!</div>
        </div>

    </div>
    ) 
}

export default Login;