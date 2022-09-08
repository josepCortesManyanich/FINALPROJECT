const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const trainingSchema = new Schema({
    name: {
        type: String,
        required: true
        
    },
    image:{
        type:String,
    },
    date:{
        type: String,
    },
    category:{
        type: String,
        enum: ['pads','airbike','tabata','sparring']
    }, 
    usersAttending: {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],
     }
    },
    {
    timestamps: true
    });
    

module.exports = model("Training", trainingSchema);


