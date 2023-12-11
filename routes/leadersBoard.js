const express = require('express');
const router = express.Router();
const Leader = require('../models/leader');
const { QuizRecord, validate } = require('../models/quizRecord');

router.get('/', async (req, res) => {
    try {
      const scores = await QuizRecord.aggregate([
        {
          $group: {
            _id: '$userId',
            name: { $first: '$name' },
            totalScore: { $sum: '$quizScore' },
          },
        },
        {
          $sort: { totalScore: -1 }, // Sort the documents by totalScore in descending order
        },
        {
          $limit: 10, // Limit the results to only the top ten documents
        },
      ]).exec();
  
      await Leader.deleteMany();
      const leaders = await Leader.create(scores);
      res.send(leaders);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

module.exports = router;
