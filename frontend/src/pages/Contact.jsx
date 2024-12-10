import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../functions/Navigation';
import '../CssPages/Contact.css';

//images
import phone from '../images/contactImages/phone.png';
import email from '../images/contactImages/email.png';
import location from '../images/contactImages/location.png';
import customerSupportImg from '../images/contactImages/customerSupport.jpg';
import feedbackImg from '../images/contactImages/feedback.jpg';


function Contact() {
    return (
      <div>
        <header>
          <Navigation />
        </header>

        <div className='BackgroundRegtangle'>
          <h1>Contact Us!</h1>
          <main>
            <div className='leftSection'>
              <div className="feedback">
                <img src={feedbackImg} alt="Feedback" />
                <div>
                  <h2>Send Feedback</h2>
                  <p>Share your thoughts</p>
                </div>
              </div>

              <div className="customerService">
                <img src={customerSupportImg} alt="Customer Service" />
                <div>
                  <h2>Contact Customer Service</h2>
                  <p>Want customer service</p>
                </div>
              </div>
            </div>

            <div className='rightSection'>
              <div className="phone">
                <img src={phone} alt='this would be the phone' />
                <span>phone number</span>
              </div>

              <div className="email">
                <img src={email} alt='this would be email' />
                <span>contact email</span>
              </div>

              <div className="physicalLocation">
                <img src={location} alt='this would be the main headquaters' />
                <span>IRL location</span>
              </div>
            </div>
          </main>  
        </div>
      </div>
    );
}
export default Contact;