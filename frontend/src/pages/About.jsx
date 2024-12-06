import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import TempImg from '../images/TempImg.png';
import CircleImg from '../images/CircleImg.png';
import Navigation from '../functions/Navigation';
import '../CssPages/About.css';

//images
import missionsBelief from '../images/aboutImages/missions.jpg';


function About () {
    return (
        <div>
            <header>
                <Navigation />
            </header>

            <main className='missionsBelief'>
                <h2>Our Mission and Beliefs</h2>
                <img src={missionsBelief} alt='our missions and belief' className='ourBeliefImg' />
                <p>To craft unforgettable dining experiences where quality, flavor, and customer satisfaction are at the heart of every bite. We are committed to delivering delicious meals made with fresh ingredients, served with a smile, and creating a welcoming space for all.</p>
            </main>  

            <div className='founders'>
                <h2>Our Founders</h2>
                <div className='foundersImages'>
                    <img src={CircleImg} alt='image a' />
                    <img src={CircleImg} alt='image b' />
                    <img src={CircleImg} alt='image c' />
                </div>
                <p>something something founders</p>
            </div>
        </div>
    );
}

export default About;