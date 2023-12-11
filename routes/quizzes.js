const mongoose =  require('mongoose');
const express = require('express');
const router =  express.Router();
const {Quiz} = require('../models/quiz');


//Creating a new Quiz
router.post('/', async (req, res) => {

    let quiz = new Quiz({
        creatorId: req.body.creatorId,
        creatorName: req.body.creatorName,
        keyword: req.body.keyword,
        category: req.body.category,
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime),
        questions: req.body.questions,
        timeCreated: req.body.timeCreated
    });

    quiz = await quiz.save();
    res.send(quiz);
});

//Getting all Quizzes
router.get('/', async (req, res) => {
    const quiz = await Quiz.find();
    res.send(quiz);
});

//Getting a quiz
router.get('/:id', async (req, res) => {
    const quiz =  await Quiz.findById(req.params.id);
    if(!quiz) return res.status(404).send("Invalid User");
    const response = {
        keyword: quiz?.keyword,
        questions: quiz?.questions
    }
    res.send(response);
});

// Getting all quizzes by specific user
router.get('/creator/:id', async (req, res) => {
    const creatorId = decodeURIComponent(req.params.id);
    const quiz = await Quiz.find({ creatorId: creatorId }).select('_id creatorName keyword category creatorId startTime endTime timeCreated');
    console.log(quiz);
    res.send(quiz);
});

//Deleting a Quiz
router.delete('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).send('Quiz not found');

        console.log('quiz.creatorId:', quiz.creatorId);
        console.log('req.user._id:', req.params.id);

        // Converting both values to string before comparing
        if (String(quiz._id) !== String(req.params.id)) {
            return res.status(401).send('Access denied');
        }
        await quiz.deleteOne();
        res.send(quiz);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;