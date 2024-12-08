//please input your server code here
//chou your code is in appmovement1

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 5000;

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', //Replace Render URL
    methods: ['GET', 'POST'],
    credentials: true,
}));

const SECRET_KEY = process.env.SECRET_KEY;

//Connects to the Database
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err.message));

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

//Connection Check
app.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
});

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
