const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        default: null,
    },
    lastname:{
        type:String,
        default: null,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    token:{
        type:String
    }
})

module.exports = mongoose.model('user',userSchema) 

 // !! even if u use 'U' for user mongodb stores in small letter , so better used small letters
// !! and append s to Eg: 'users"