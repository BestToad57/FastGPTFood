import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../functions/Navigation';
import '../CssPages/Cart.css';

function Cart ({items = [], removeItem, removeAll, setCostArray, costArray, setCost, cost}) {
    //if it's in-person deliver or online
    //time is also set whenever a delibutton is trigger
    //also like half the 
    const [typeOrder, setTypeOrder] = useState("");
    const [deliTime, setDeliTime] = useState(0);
    const [typePay, setTypePay] = useState("");
    const [triggerDeli, setTriggerDeli] = useState(false);
    const [triggerPayment, setTriggerPayment] = useState(false);

    //delivery types
    const homeDeliButton = () => {
        setTypeOrder("Drop-Off Delivery");
        setDeliTime(20 + (items.length * 3) );
        setTriggerDeli(true);
    }

    const inPersonDeliButton = () => {
        setTypeOrder("In-Person Delivery");
        setDeliTime((items.length * 3));
        setTriggerDeli(true);
    }

    //Payment type
    const masterCardButton = () => {
        setTypePay("Master Card")
        setTriggerPayment(true);
    }
    
    const visaButton = () => {
        setTypePay("Visa")
        setTriggerPayment(true);
    }
    
    const paypalButton = () => {
        setTypePay("Paypal")
        setTriggerPayment(true);
    }

    //'reset' button basically
    //must have a payment type and delivery type to be set to true to active (this is done in the html code) 
    const purchaseButton = () => {
        removeAll();
        setTypeOrder("");
        setTypePay("");
        setTriggerPayment(false);
        setTriggerDeli(false);
        setDeliTime(0);
        setCost(0);   
        setCostArray([]);
    }

    return (
        <div>
        <header>
            <Navigation />
        </header>
        
        <div className='ItemsInCart'>
            <h2>Remove Items from Cart</h2>
            {items.length === 0 ? (
                <p>cart is empty</p>
            ) : (
                <div className="orderItems">
                    {items.map((item, index) => (
                        <span key={index}>
                            {item} <button onClick={() => removeItem(index)}>  X  </button>
                        </span>
                    ))}
                </div>
            )}
        </div>

        <div className='DeliveryType'>
            <h3>Delivery</h3>
            <button onClick={homeDeliButton}>Drop-Off Delivery</button>
            <button onClick={inPersonDeliButton}>In-Person Pick Up</button>
            {typeOrder === "" ? (
                <h4>Delivery: </h4>
            ) : (
                <div>
                    <h4>Delivery: {typeOrder}</h4>
                    {typeOrder === "Drop-Off Delivery" ? (
                        <div>
                            <p>Estimated Delivery Time: {deliTime} minutes</p>
                            <p>Your home location?</p>
                            <input type='text' placeholder='help' />

                        </div>
                    ) : (
                        <div>
                            <p>Estimated Pickup Time: {deliTime} minutes</p>
                            <p>What store you picking up from</p>
                            <select onChange={(e) => console.log(e.target.value)}>
                                <option value="">Please Select a Location</option>
                                <option value="LocationA">The Moon</option>
                                <option value="LocationB">The Deep Beyond</option>
                                <option value="LocationC">My Death Bed</option>
                            </select>
                        </div>
                    )}
                    </div>
                )}
        </div>

        <div className='paymentCards'> 
            <button onClick={paypalButton}>Pay Pal</button>
            <button onClick={visaButton}>Visa</button>
            <button onClick={masterCardButton}>Master Card</button>
            {typePay === "" ? (
                <div>
                    <h3>No Payment type has been chosen</h3>
                </div>
            ) : (
                <div>
                    <h3>Payment: {typePay}</h3>
                </div>
            )}
        </div>
        
        <div className='costOverall'>
            {cost > 0 ? <p>Total: ${cost}</p> : <p>No items in cart</p>}
        </div>
        
        <div className='purchase'>
            <button onClick={purchaseButton} disabled={!triggerPayment || !triggerDeli } >Purchase</button>
        </div>
    </div>
    );
}

export default Cart;