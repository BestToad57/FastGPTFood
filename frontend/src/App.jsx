//Import Section
import {BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { useState } from 'react'
import './CssPages/App.css'
import Home from './pages/Home';
import Order from './pages/Order';
import OrderHistory from './pages/OrderHistory';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Navigation from './functions/Navigation';
import Login from './pages/Login';

//App is just getting routers up and loaded
//Everything else will be done on their own pages or in the function folder

//Also I hope we can get things clear
//the CssPage is for all css (expect app.css)
//the pages folder is for all pages
//and the functions folder is for all functions which will be used globally

function App() {
  //The list is done here so we can use it on other pages
  // with the add button for the order page and remove for the cart page
  //the cost list will set a cost for the item; with items and cost being connected by list placement
  const [items, setItems] = useState([]);
  
  //the difference between the two const, is one array keeps track of each purchase to a value
  //so if the user pops one an item from the array with the remove section, it also pops the cost
  //and then in the cart area; we will simply just do the math there for cost
  const [costArray, setCostArray] = useState([]);
  const [cost, setCost] = useState(0);

  //this adds an item
  const addItem = (item) => {
    setItems ([...items, item]);
  }

  //this removes an item as well as the cost
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));

    const removedCost = costArray[index];
    setCostArray(items.filter((_, i) => i !== index));

    setCost(prevCost => prevCost - removedCost);
  }

  const removeAllItems = () => {
    setItems([]);
  }

  return (
    <Router>
      <div>
        <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Order" element={<Order addItem={addItem} setCostArray={setCostArray} setCost={setCost}/>} />
        <Route path="/About" element={<About />} />
        <Route path="/Cart" element={<Cart items={items} removeItem={removeItem} removeAll={removeAllItems} setCostArray={setCostArray} costArray={costArray} setCost={setCost} cost={cost} />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/OrderHistory" element={<OrderHistory />} />
      </Routes>
      </div>
    </Router>
  )
}

export default App;