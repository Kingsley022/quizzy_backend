const mongoose = require('mongoose');
const Joi = require('joi');

//user schema
const userSchema = new mongoose.Schema({
    firstname: {type:String, required: true},
    lastname: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    phoneNumber: {type:String, required: true},
    password: {type:String, required: true},
    publishedQuizzes:[],
    quizRecords:[]
});

//model
const User = mongoose.model('User', userSchema);

//validating user
const validateUser = async (user) => {
    const schema = Joi.object({
      firstname: Joi.string().required().min(2).max(50),
      lastname: Joi.string().required().min(2).max(50),
      email: Joi.string().required().min(5).max(255).email(),
      phoneNumber: Joi.string().required(),
      password: Joi.string().required().min(8)
    });
  
    try {
      await schema.validateAsync(user);
    } catch (error) {
      throw new Error(error.details[0].message);
    }
}

//exporting
exports.User = User;
exports.validate = validateUser;