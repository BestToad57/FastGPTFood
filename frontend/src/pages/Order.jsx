import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate, } from "react-router-dom";
import Navigation from "../functions/Navigation";
import "../CssPages/Order.css";

//image imports section
import Burger from '../images/foodFolder/burger.jpg';
import doubleBurger from '../images/foodFolder/DB.webp';
import chickenBurger from '../images/foodFolder/CB.webp';
import doubleChickenBurger from '../images/foodFolder/doubleCB.jpg';
import GSDDB from '../images/foodFolder/GSDDB.png';
import fries from '../images/foodFolder/fries.jpg';
import onionRings from '../images/foodFolder/rings.jpg';
import nuggets from '../images/foodFolder/nuggets.jpg';
import fingers from '../images/foodFolder/fingers.jpg';
import springRolls from '../images/foodFolder/springrolls.jpg';
import water from '../images/foodFolder/water.webp';
import cola from '../images/foodFolder/cola.jpg';
import spright from '../images/foodFolder/spright.webp';
import fanta from '../images/foodFolder/fanta.webp';
import milkshake from '../images/foodFolder/milkshake.jpeg';

//cart button creation
function CartButton() {
    const navigate = useNavigate();
  
    const moveButton = () => {
      navigate("/Cart");
    };
  
    return (
      <div>
        <button onClick={moveButton}>Order</button>
      </div>
    );
}

function Order({ addItem, setCostArray, setCost }) {
    const [currentState, setCurrentState] = useState("menu"); //the states are menu, toppings, size, and add item to cart | this is better than firing 50 trigger states omg
    const [addedText, setAddedText] = useState(""); //displayed text
    const [timerTriggerText, setTimerTriggerText] = useState(true); //display text for a set amount of time
    const [rememberItem, setRememberItem] = useState(-1);//this remembers the index, not the actual item
    const [selectedToppings, setSelectedToppings] = useState([]); //remembers the toppings 
    const [toppingsCost, setToppingsCost] = useState(0); //remembers how many toppings are on the burger
    
    //menu related const
    const menuItems = [ 
        {name: "Burger", price: 4.59, image: Burger},
        {name: "Double Burger", price: 4.89, image: doubleBurger},
        {name: "Chicken Burger", price: 8.59, image: chickenBurger},
        {name: "Double Chicken Burger", price: 4.89, image: doubleChickenBurger},
        {name: "Ghostly Spicy Double Dare Burger", price: 6.99, image: GSDDB},
        {name: "Fries", price: 3.39, image: fries},
        {name: "Onion Rings", price: 3.99, image: onionRings},
        {name: "Chicken Nuggets", price: 2.99, image: nuggets},
        {name: "Chicken Fingers", price: 5.99, image: fingers},
        {name: "Spring Rolls", price: 3.99, image: springRolls},
        {name: "Water", price: 0.99, image: water},
        {name: "Coca Cola", price: 2.99, image: cola},
        {name: "Sprite", price: 2.99, image: spright},
        {name: "Fanta", price: 2.99, image: fanta},
        {name: "Milkshake", price: 3.99, image: milkshake}
    ];

    const menuToppings = ["Lettuce", "Tomato", "Cheese", "Pickles", "Ketchup", "Mayo", "Mustard"];

    //for all side options and drinks
    const sizeItems = ["small", "medium", "large"];
    const sizeCost = [1, 1.25, 1.5]; //muitply for choice of size
    
    //the inetentional add; where the user just has a menu and an add function
    const intentionalAdd = (name) => {
        const menuItemToLower = menuItems.map((item) => item.name.toLowerCase());
        const index = menuItems.findIndex((item) => item.name === name); 

      if (index !== -1) {
          setRememberItem(index); 
  
          //0 - 4; to toppings (since thoses are all burgers)
          //5+ is all size related
          if (index < 6) {
              setCurrentState("toppings");
          } else if (index >= 4) {
              setCurrentState("size");
          }
      } else {
          setAddedText("Item is not on the Menu; please try again.");
          setCurrentState("menu");
          setTimerTriggerText(true); 
      }
  };
  
  //items which have a size dependency (being non-burger items)
    const sizeAdd = (sizeIndex) => {
        if (rememberItem !== -1) {
            const itemName = menuItems[rememberItem]?.name;
            const baseCost = menuItems[rememberItem]?.price;
            const sizeFactor = sizeCost[sizeIndex];
            const totalCost = parseFloat(baseCost * sizeFactor).toFixed(2);

            //Maybe Drinks Afterwards :)
            addItem(`${itemName} - ${sizeItems[sizeIndex]}`);
            setCostArray((prevCostArray) => [...prevCostArray, totalCost]);
            setCost((prevCost) => parseFloat(prevCost) + parseFloat(totalCost));
            setAddedText(`Your ${itemName.toLowerCase()} ${sizeItems[sizeIndex]} has been added to the cart!`);
            
            //reset point
            setCurrentState("menu");
            setRememberItem(-1);
        } else {
            setAddedText(`Your order did not processs try again.`);

            //still reset point
            setCurrentState("menu");
            setRememberItem(-1);
        }
    }

    //user is allowed to click as many toppings as they want (and de-select as they choose) they pay 0.5 for each topping
    const toppingsAdd = (toppingIndex, isChecked) => {
        const toppingName = menuToppings[toppingIndex];
        const toppingCost = 0.5; 
  
        if (isChecked) {
            setSelectedToppings((prevToppings) => [...prevToppings, toppingName]);
              setToppingsCost((prevCost) => prevCost + toppingCost);
          } else {
              setSelectedToppings((prevToppings) =>
                prevToppings.filter((topping) => topping !== toppingName)
          );
        setToppingsCost((prevCost) => prevCost - toppingCost);
        }
    };

    //commits the item to the cart / cost
    const toppingsFinalPush = () => {
        const itemName = menuItems[rememberItem]?.name;
        const itemCost = menuItems[rememberItem]?.price;
        const totalCost = parseFloat(itemCost + toppingsCost).toFixed(2);

        if (selectedToppings.length === 0) {
            const totalCost = itemCost.toFixed(2);
            addItem(itemName);
            setCostArray((prevCostArray) => [...prevCostArray, totalCost]);
            setCost((prevCost) => parseFloat(prevCost) + parseFloat(totalCost));
            setAddedText(`Your ${itemName.toLowerCase()} has been added to the cart!`);
        } else {
            const toppingsCost = selectedToppings.length * 0.5;
            const totalCost = (itemCost + toppingsCost).toFixed(2);
            addItem(`${itemName} with ${selectedToppings.join(", ")}`);
            setCostArray((prevCostArray) => [...prevCostArray, totalCost]);
            setCost((prevCost) => parseFloat(prevCost) + parseFloat(totalCost));
            setAddedText(`Your ${itemName.toLowerCase()} with ${selectedToppings.join(", ")} has been added to the cart!`);
        }

        //reset
        setCurrentState("menu");
        setRememberItem(-1);
        setSelectedToppings([]);
        setToppingsCost(0);
    }

    //timer to showcase when user have order item and then message go bye bye
    //also now only triggers once upon opening the order page for some reason ?
    useEffect(() => {
        if (timerTriggerText) {
          const timer = setTimeout(() => {
            setTimerTriggerText(false);
          }, 3000);

          return () => clearTimeout(timer);
    } }, [timerTriggerText]);

    return (
        <div>
            <header>
                <Navigation />
            </header>    

            <div>
                <div>
                    {timerTriggerText && (
                        <div>
                            <p>{addedText}</p>
                        </div>
                    )}
                </div>
                <div>
                    {currentState === "menu" && (
                        <div>
                            <MenuView menuItems={menuItems} functionIntentionalAdd={intentionalAdd} />
                        </div>   
                    )}

                    {currentState === "size" && (
                        <div>
                            <SizeView sizeItems={sizeItems} functionSizeAdd={sizeAdd} />
                        </div>
                    )}

                    {currentState === "toppings" && (
                        <div>
                            <ToppingsView menuToppings={menuToppings} functionToppingsAdd={toppingsAdd} toppingsFinalPush={toppingsFinalPush}/>
                        </div>
                    )}
                </div>

                <div>
                    <CartButton />
                </div>
            </div>
        </div>
    );
}

//you have made it to the view section which has been move to down under congrants
//default view which now shows items;prices;and images
const MenuView = ({ menuItems, functionIntentionalAdd }) => {
    return (
        <div>
            <h4 className='MoveItDown'>Menu</h4>
            <p>Please select an item on the menu</p>
            
            <div className="menuSection">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        <img src={item.image} alt={item.name} />
                        <div>
                            <h5>{item.name}</h5>
                            <p>${item.price.toFixed(2)}</p>
                            <button onClick={() => functionIntentionalAdd(item.name)}>
                                Add to Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

//order view for sizes
const SizeView = ({ sizeItems, functionSizeAdd }) => {
    return (
        <div>
            <h4>Please choose a size for your order:</h4>
            <div className="sizeSection">
                {sizeItems.map((size, index) => (
                    <button key={index} onClick={() => functionSizeAdd(index)}>
                    {size}
                    </button>
                ))}
            </div>
        </div>
    );
};

//order view for toppings / burgers
const ToppingsView = ({ menuToppings, functionToppingsAdd, toppingsFinalPush }) => {
    return (
        <div>
            <h4>Please choose the toppings for your order:</h4>
            <div className='toppingsSection'>
                {menuToppings.map((topping, index) => (
                    <div key={index}>
                        <label>
                            <input type="checkbox" onChange={(e) => functionToppingsAdd(index, e.target.checked)} />
                            {topping}
                        </label>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={toppingsFinalPush}>Add to Cart</button>
            </div>
        </div>
    );
};

export default Order;