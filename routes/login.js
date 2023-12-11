const mongoose = require('mongoose');
const express = require('express');
const{User} = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');


// logging a user
router.post('/', async (req, res) => {
    const {error}= validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email');

    const validPassword = bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password');

    // Store user details in session
    req.session.user = {
        _id: user._id,
        firstname: user.firstname,
        email: user.email
    };

    const token = jwt.sign({user:user}, 'jwtPrivateKey');
    res.cookie('token', token, { httpOnly: true });
    res.send(token);
});


// Validation
const validateUser = async (user) =>{
    const schema = Joi.object({
        email: Joi.string().required().min(5).max(255).required().email(),
        password: Joi.string().required().min(8),
    });

    try {
        await schema.validateAsync(user);
    } catch (error) {
        throw new Error(error.details[0].message);
    }
}

module.exports = router;