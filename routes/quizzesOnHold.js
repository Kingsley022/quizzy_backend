const mongoose =  require('mongoose');
const express = require('express');
const router =  express.Router();
const {validate, QuizzesOnHold} = require('../models/quizzesOnHold');
const auth = require('../middleware/auth');

//Creating a new QuizzesOnHold
router.post('/', async (req, res) => {
    const {error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let quiz = new QuizzesOnHold({
        creatorId: req.body.creatorId,
        creatorName: req.body.creatorName,
        keyword: req.body.keyword,
        category: req.body.category,
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
        questions: req.body.questions
    });

    quiz = await quiz.save();
    res.send(quiz);
});

//Getting all Quizzes
router.get('/', async (req, res) => {
    const quiz = await QuizzesOnHold.find();
    res.send(quiz);
});

//Deleting a Quiz
router.delete('/:id', async (req, res) => {
    try {
        const quiz = await QuizzesOnHold.findById(req.params.id);
        if (!quiz) return res.status(404).send('Quiz not found');
        
        await quiz.deleteOne();
        res.send(quiz);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;