const mongoose = require('mongoose');

const leaderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: {type: String, required: true},
  totalScore: { type: Number, required: true },
});

const Leader = mongoose.model('Leader', leaderSchema, "LeadersBoard");

module.exports = Leader;