const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const eventSchema = new Schema({
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
    usersAttending: {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],
     }
    },
    {
    timestamps: true
    });
    

module.exports = model("Event", eventSchema);