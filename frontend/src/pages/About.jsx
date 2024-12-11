import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../functions/Navigation';
import '../CssPages/About.css';

//images
import missionsBelief from '../images/aboutImages/missions.jpg';
import founder1 from '../images/aboutImages/BestToad57.png';
import founder2 from '../images/aboutImages/UyphengChou.png';
import founder3 from '../images/aboutImages/ishamotwani.png';

function About () {
    return (
        <div>
            <header>
                <Navigation />
            </header>
            
            <div className='BackgroundRegtangle'>
                <main className='missionsBelief'>
                    <h2>Our Mission and Beliefs</h2>
                    <img src={missionsBelief} alt='our missions and belief' className='ourBeliefImg' />
                    <p>To craft unforgettable dining experiences where quality, flavor, and customer satisfaction are at the heart of every bite. We are committed to delivering delicious meals made with fresh ingredients, served with a smile, and creating a welcoming space for all.</p>
                </main>  

                <div className='founders'>
                    <h2>Our Founders</h2>
                    <div className='foundersImages'>
                        <img src={founder1} />
                        <img src={founder2} />
                        <img src={founder3} />
                    </div>
                    <p className='BackgroundRegtangle'>
                        Our core founders of BestToad57, UyphengChou and ishamotwani has created this the FastGPTFood company in high hopes to help change the world with it's high quality food and its world breaking technology. 
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;