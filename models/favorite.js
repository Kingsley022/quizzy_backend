const mongoose  = require('mongoose');

// Favorite schema
const favoriteSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    favorite: {type:String, required:true},
    score: {type:Number, required:true},
    time: {type: Date, default: Date.now}
});

//Modifying the Time 
favoriteSchema.set('toJSON', {
    transform: function (doc, ret) {
      if (ret.time) {
        ret.time = ret.time.toISOString().slice(0, 10);
      }
    }
});

//model
const Favorite =  mongoose.model("Favorite", favoriteSchema);

exports.Favorite = Favorite;