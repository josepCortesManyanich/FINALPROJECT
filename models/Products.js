const mongoose = require('mongoose')
const {Schema, model} = mongoose;
const productSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    image:{
        type: String,
    },

})

module.exports = mongoose.model('Product', productSchema);
