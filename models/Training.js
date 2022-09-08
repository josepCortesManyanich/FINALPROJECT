const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const trainingSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['pads','airbike','tabata','sparring']
    },
    image:{
        type:String,
    },
    date:{
        type: String,
    },
   
        },
    {
    timestamps: true
    });
    

module.exports = model("Training", trainingSchema);


