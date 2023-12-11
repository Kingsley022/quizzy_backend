const mongoose  = require('mongoose');
const express = require('express');
const router = express.Router();
const {Message} = require('../models/message');

//Creating a new Message
router.post('/', async (req, res) => {

    let message = new Message({
        recipientId: req.body.recipientId,
        message: req.body.message
    });

    message = await message.save();
    res.send(message);
});

//Getting all messages
router.get('/', async (req, res) => {
    const message = await Message.find();
    res.send(message);
});

// Getting all messages for a specific user
router.get('/me/:id', async (req, res) => {
    const userId = decodeURIComponent(req.params.id);
    const messages = await Message.find({ recipientId: userId });
    res.send(messages);
});

//Deleting a Message
router.delete('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).send('Message not found');

        // Converting both values to string before comparing
        if (String(message._id) !== String(req.params.id)) {
            return res.status(401).send('Access denied');
        }
        const deletedMessage = await message.deleteOne();
        res.send(deletedMessage);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;