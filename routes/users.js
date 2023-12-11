const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const{User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

//Updating user password
router.put('/updatepassword', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).send("Invalid User");

    //   const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await User.findByIdAndUpdate(user._id, { $set: { password: hashedPassword }});
      res.send("Password updated successfully");

    }catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
});

// Get details of the currently logged in user
router.get('/me', auth, async (req, res) => {
    res.send(req.user);
    console.log(req.user);
});

//Getting all users
router.get('/', async (req, res) => {
    const users =  await User.find();
    res.send(users);
});

//creating a new user
router.post('/', async (req, res) => {
    const {error}= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered');

    user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        quizzes:[],
        quizrecord:[]
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();
    res.send(user);
});

//Updating user
router.put('/:id', async (req, res) => {
    const user =  await User.findByIdAndUpdate(req.params.id, {firstname: req.body.firstname, 
        lastname: req.body.lastname, email: req.body.email, phoneNumber: req.body.phoneNumber}, {new: true});
    if(!user) return res.status(404).send("Invalid User");
    res.send(user);
});
  
//Deleting a user
router.delete('/:id', async (req, res) => {
    const user =  await User.findByIdAndRemove(req.params.id);
    if(!user) return res.status(404).send("Invalid User");
});

//Getting a user
router.get('/:id', async (req, res) => {
    const user =  await User.findById(req.params.id);
    if(!user) return res.status(404).send("Invalid User");
    res.send(user);
});

module.exports = router;