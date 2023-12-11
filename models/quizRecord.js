const mongoose  = require('mongoose');
const Joi  =  require('joi');

// Record Schema
const recordSchema =  new mongoose.Schema({
    userId: {type:String, required: true},
    name: {type:String, required: true},
    keyword: {type:String, required: true},
    quizScore: {type: Number, required: true},
    date: { 
        type: String,
        default: () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;
            const day = currentDate.getDate();
            return `${day}/${month}/${year}`;
        }
    }
});

// Model
const QuizRecord =  mongoose.model("QuizRecord", recordSchema,'records');

//Validating Record
const validate = async (record) =>{
    const schema =  Joi.object({
        name: Joi.string().required(),
        userId: Joi.string().required(),
        keyword: Joi.string().required(),
        quizScore: Joi.number().required(),
    });

    try{
        await schema.validateAsync(record);
    }catch(error){
        throw new Error(error.details[0].message);
    }
}


exports.QuizRecord = QuizRecord;
exports.validate = validate;