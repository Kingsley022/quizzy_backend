const mongoose = require('mongoose');
const express = require('express');
const router =  express.Router();
const{validate, QuizRecord} = require('../models/quizRecord');


// Saving a new record
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let record = new QuizRecord({
        userId: req.body.userId,
        name: req.body.name,
        keyword: req.body.keyword,
        quizScore: req.body.quizScore,
        date: req.body.date
    });

    record = await record.save();
    res.send(record);
});

// Getting all records
router.get('/', async (req, res) => {
    const records = await QuizRecord.find();
    res.send(records);
  });

// Getting all record for specific user
router.get('/user/:id', async (req, res) =>{
    const userId = decodeURIComponent(req.params.id);
    const record = await QuizRecord.find({ userId: userId });
    console.log(record);
    res.send(record);
});

module.exports = router;