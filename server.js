const express = require('express')
const passport = require('passport')
const session = require('express-session');
const dotenv = require("dotenv");
const router = express.Router();
const hbs= require('hbs')
const UserModel = require("./models/database");
const app = express()
require('./auth.js')
router.get('/',passport.authenticate('facebook',{scope:'email'}));

router.get('/callback',passport.authenticate('facebook',{
failureRedirect:'/auth/facebook/error',    
}),
function (req,res){
res.redirect('/auth/facebook/suceess');
}
);
router.get('/sucess',async(req,res)=>{
    const userInfo = {
        id: req.session.passport.user.id,
        displayName: req.session.passport.user.displayName,
        provider: req.session.passport.user.provider,
    }
}
