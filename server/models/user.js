const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    fname:{type:String, required:true},
    lname:{type:String,required:true},
    email:{type: String,required:true},
    pass:{type: String,required:true},
    verified:{type:Boolean, default:false}
})

const User = new mongoose.model('User', userSchema);
module.exports = User;