const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    fname: {type:String,
        required:true},
    lname: {type:String,
        required:true},
    title:{type:String,
    enum:["Mr", "Mrs", "Miss"]},
     email: {
        
        type: String,
        trim: true,
        lowercase: true,
        uppercase:true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{type:String,required:true}
    

}, { timestamps: true });

module.exports = mongoose.model('AuthorModel', authorSchema)
