const passport = require('passport');
const dotenv = require("dotenv");
const UserModel = require("./models/database");
const router = express.Router();
const GitHubStrategy= require( 'passport-github' ).Strategy;
require('dotenv').config()
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback",
    passReqToCallback  : true
  }, 
  async function( accessToken, refreshToken, profile, cb) {
    const user = await UserModel.findOne({
      accountId: profile.id,
      provider: 'facebook',
    });
    if(!user){
      console.log('Adding new facebook user to DB..');
      const user = new UserModel({
        accountId : profile.id,
        name: profile.displayName,
        provider: profile.provider,
      });
      await user.save();
      return cb(null,profile);
    }else{
      console.log('Facebook user already exist in db..');
      return cb(null,profile);
    }
    
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});


//Fetches Session details using session id.
passport.deserializeUser(function (user, done) {
      done(null, user);
  });