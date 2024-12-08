import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import '../CssPages/UserPage.css';

const UserPage = () => {
    //get userinformation from before
    //this is all temp BTW i making a backend thing for this
    const username = localStorage.getItem('username');
    let recentPurchases = JSON.parse(localStorage.getItem('userCart'));
    recentPurchases = Array.isArray(recentPurchases) ? recentPurchases : []; //checks if the array is empty or not sets it to blank if so; so the page doesn't break
    return (
        <div>
            <div className='BackgroundRegtangle'>
                <h3>Welcome, {username}!</h3>
                <div className='recentPurchases'>
                    <h4>Recent Purchases</h4>
                    {recentPurchases.length > 0 ? (
                        <ul>
                            {recentPurchases.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No recent purchases found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserPage;