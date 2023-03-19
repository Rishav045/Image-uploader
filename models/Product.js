const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name cannot be empty']
    },
    price:{
        type:Number,
        required:[true, 'price cannot be empty']
    },
    image:{
        type:String,
        required:[true,'image is required']
    }
});

module.exports= mongoose.model('Product',productSchema)