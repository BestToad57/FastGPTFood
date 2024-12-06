import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../functions/Navigation';
import '../CssPages/Home.css';

//image imports
import GSDDB from '../images/foodFolder/GSDDB.png';
import freshlyCut from '../images/homeImages/freshlyCut.jpg';
import local from '../images/homeImages/localBusiness.jpg';

function OrderButton() {
  const navigate = useNavigate();
  
  const moveButton = () => {
    navigate('/Order');
  }

  return (
    <div>
      <button onClick={moveButton}>Order</button>
    </div>
  )
}

function Home() {
    return (
        <div>
          <header>
            <Navigation />
          </header>

          <div className='specialImgSection'>
            <img src={GSDDB} alt='Special Meal' className='orderImg' />
            <div className='imgContent'>
              <p>Rejoice in the ultimate burger experience with our ghostly spicy double dare burger! Packing our prefectly season beef patty, with freshly cutted letture, juicy sliced tomatoes, and of course dipped with ghost peppers for that firey taste you know you'll love!</p>
              <OrderButton />
            </div>
          </div>

          <div className='ImageSection'>
            <div className="mainImages">
              <img src={freshlyCut} alt='maybe about our order different system?' className='specialImg' />
              <img src={local} alt='maybe like donations we are doing?' className='specialImg'/>
           </div>

            <div className='Imgdescription'>
              <span>We create our food by harvesting from local farmers regaularly to ensure our food always remind fresh.</span>
              <span>We help support local businesses with 5% of each purchase going towards these local enterprises we care about.</span>
            </div>
          </div>
        </div>
    );
}

export default Home;