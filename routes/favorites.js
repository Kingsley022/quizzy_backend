const mongoose  = require('mongoose');
const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/favorite');

// Adding a new favorite
router.post('/', async (req, res) => {

    let favorite = new Favorite({
        userId: req.body.userId,
        favorite: req.body.favorite,
        score: req.body.score
    });

    favorite = await favorite .save();
    res.send(favorite );
});

// Getting all favorite for a specific user
router.get('/me/:id', async (req, res) => {
    const userId = decodeURIComponent(req.params.id);
    const favorites = await Favorite.find({ userId });
    res.send(favorites);
});

//Deleting a favorite
router.delete('/:id', async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        if (!favorite) return res.status(404).send('Favorite not found');

        const deletedFavorite = await favorite.deleteOne();
        res.send(deletedFavorite);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;