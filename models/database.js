const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/facebook",
    { useNewUrlParser: true ,useUnifiedTopology: true },
    console.log("Connected to Database..."))

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
      password:String,    
    
});

module.exports = mongoose.model('User',userSchema, 'User');
