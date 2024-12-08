import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../functions/userContext';
import Navigation from '../functions/Navigation';
import axios from 'axios';
import '../CssPages/UserPage.css';

const UserPage = () => {
    const { username } = useUser();
    const [recentPurchases, setRecentPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecentPurchases = async () => {
            try {
                console.log('Fetching recent purchases for:', username);
                const response = await axios.get(`http://localhost:5000/getOrders/${username}`); // Use the full URL to avoid issues
                console.log('Response data:', response.data);
    
                if (response.data && Array.isArray(response.data.orders)) {
                    setRecentPurchases(response.data.orders);
                } else {
                    console.log('No orders found');
                    setRecentPurchases([]); // Set an empty array if no orders are found
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching recent purchases:', err);
                setError('Failed to load recent purchases.');
                setLoading(false);
            }
        };
    
        if (username) {
            fetchRecentPurchases();
        }
    }, [username]);
    

    return (
        <div>
            <header>
                <Navigation />
            </header>
            <div className="BackgroundRegtangle">
                <h2>Welcome, {username}!</h2>
                <div className="recentPurchases">
                    <h3>Recent Purchases</h3>
                    {recentPurchases.length > 0 ? (
                        <div>
                            {recentPurchases.map((order, index) => (
                            <div key={index}>
                                {index === 0 && ( <p>- - - - - - - - - - - - - - - - - - - - - - - -</p> )}
                                    <p>Items: {order.items.join(', ')}</p>
                                    <p>Delivery Type: {order.deliveryType}</p>
                                    <p>Payment Type: {order.paymentType}</p>
                                    <p>Total Cost: ${order.totalCost.toFixed(2)}</p>
                                    <p>- - - - - - - - - - - - - - - - - - - - - - - -</p>
                                </div>
                            ))}
                         </div>
                        ) : (
                            <p>No recent purchases found.</p>
                        )}

                </div>
                <div className="actions">
                    <button onClick={() => navigate('/')}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default UserPage;