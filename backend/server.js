import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import Order from './models/Order.js';

const app = express();
const PORT = process.env.CONNECTION_PORT;

// Middleware setup
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;

// Connects to the Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err.message));

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Connection Check
app.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
});

//Starting Login Section
//for login in
//first: checks if the user is already in the database
//second: hashes the password
//third: adds the user to the database
app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: 'Invalid username or password'});
        }

        const token = jwt.sign({username: user.username}, SECRET_KEY, {expiresIn: '1h'});

        res.status(200).json({token});
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({message: 'Server error'});
    }
});

//For sign up; 
//Checks first: if the user has signed up; 
//second: checks if the password is the same as the the account
//third: allows the user in depeneded on the requirements
app.post('/signup', async (req, res) => {
    try {
        const {username, password} = req.body;
        const existingUser = await User.findOne({username});

        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({username, password: hashedPassword});
        await newUser.save();

        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({message: 'Server error'});
    }
});

//Starting... Order History
//first: checks if the username or order is fullfilled
//second: creates the new order assisting the username to the order
app.post('/storeOrder', async (req, res) => {
    try {
        const {username, items, deliveryType, paymentType, totalCost} = req.body;

        if (!username || !items || !deliveryType || !paymentType || !totalCost) {
            return res.status(400).json({message: 'Missing required fields'});
        }

        const user = await User.findOne({username});

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const newOrder = new Order({username, items, deliveryType, paymentType, totalCost});

        await newOrder.save();

        res.status(201).json({message: 'Order stored successfully', order: newOrder});
    } catch (error) {
        console.error('Error during order storage:', error.message);
        res.status(500).json({message: 'Server error'});
    }
});

//order getter
//first checks if the call is legal
//second gets the order from the orders database
//displays if the orders (or nothing)
app.get('/getOrders/:username', async (req, res) => {
    try {
        const {username} = req.params;

        if (!username) {
            return res.status(400).json({message: 'Username is required'});
        }

        const orders = await Order.find({username: username});

        if (orders.length > 0) {
            return res.status(200).json({orders});
        } else {
            return res.status(404).json({message: 'No orders found for this user'});
        }
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});