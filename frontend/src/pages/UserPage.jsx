import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import '../CssPages/UserPage.css';

const UserPage = () => {
    const [username, setUsername] = useState(localStorage.getItem('username'));
    let [recentPurchases, setRecentPurchases] = useState(JSON.parse(localStorage.getItem('userCart')) || []);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
                <div className="actions">
                    <button onClick={() => navigate("/")}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
