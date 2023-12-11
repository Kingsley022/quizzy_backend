const mongoose  = require('mongoose');
const Joi  =  require('joi');

// Quiz Review schema
const ReviewSchema = new mongoose.Schema({
    creatorName: {type:String, required:true},
    creatorId: {type:String, required:true},
    keyword: {type:String, required:true},
    category: {type:String, required:true},
    questions: { type: [Object], required: true },
    startTime: {type:Date, required:true},
    endTime: {type:Date, required:true},
    timeCreated: {type: Date, default: Date.now}
});

//Modifying the Time created
ReviewSchema.set('toJSON', {
    transform: function (doc, ret) {
      if (ret.timeCreated) {
        ret.timeCreated = ret.timeCreated.toISOString().slice(0, 10);
      }
    }
});

//model
const QuizzesOnHold =  mongoose.model("QuizzesOnHold", ReviewSchema);

//Validating Quiz
const validate = async (quiz) =>{
    const schema =  Joi.object({
        creatorName: Joi.string().required(),
        creatorId: Joi.string().required(),
        keyword: Joi.string().required(),
        category: Joi.string().required(),
        questions: Joi.array().required(),
        startTime: Joi.date().required(),
        endTime: Joi.date().required()
    });

    try{
        await schema.validateAsync(quiz);
    }catch(error){
        throw new Error(error.details[0].message);
    }
}

exports.QuizzesOnHold = QuizzesOnHold;
exports.validate = validate;