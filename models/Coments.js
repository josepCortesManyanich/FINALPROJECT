const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const comentsSchema = new Schema({
    comentary: {
        type: String,
        required: true
        
    }
},
{
  timestamps: true
});

module.exports = model("Coment", comentsSchema);