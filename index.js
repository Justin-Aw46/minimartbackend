const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.model.js');
const app = express();

//Can use json
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

mongoose.connect("mongodb+srv://awjiajunjustin:D7fRa9xa31Betmyk@backend.n8rpy.mongodb.net/?retryWrites=true&w=majority&appName=Backend")
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Failed to connect to MongoDB', err);
    });

app.get('/', (req, res) => {
    res.send("Hello from Node API");
});


//Create new user
app.post('/api/users', async (req, res) => {
    try  {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


//Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


//get single user
app.get('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


//get single user by username
app.get('/api/user/username/:username', async (req, res) => {
    try {
        const { username } = req.params; 
        const user = await User.findOne({username});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


//update user
app.put('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


//delete user
app.delete('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        
        res.status(200).json({message: "User deleted"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});