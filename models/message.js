const mongoose  = require('mongoose');

// Message schema
const messageSchema = new mongoose.Schema({
    recipientId: {type:String, required:true},
    message: {type:String, required:true},
    time: {type: Date, default: Date.now}
});


//Modifying the Time 
messageSchema.set('toJSON', {
    transform: function (doc, ret) {
      if (ret.time) {
        ret.time = ret.time.toISOString().slice(0, 10);
      }
    }
});

//model
const Message =  mongoose.model("Message", messageSchema);

exports.Message = Message;