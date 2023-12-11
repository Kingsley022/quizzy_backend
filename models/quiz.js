const mongoose  = require('mongoose');
const Joi  =  require('joi');

// Quiz schema
const quizSchema = new mongoose.Schema({
    creatorName: {type:String, required:true},
    creatorId: {type:String, required:true},
    keyword: {type:String, required:true},
    category: {type:String, required:true},
    questions: { type: [Object], required: true },
    startTime: {type:Date, required:true},
    endTime: {type:Date, required:true},
    timeCreated: {type:String, required:true}
});

//model
const Quiz =  mongoose.model("Quiz", quizSchema);
exports.Quiz = Quiz;