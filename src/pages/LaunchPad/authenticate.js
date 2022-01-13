var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser((user,done) => {
    done(null,user);
})



passport.use(new GoogleStrategy({
    clientID: "602312248322-pa9sd8b1ooc8ut5ueasfd57a1klnnrhu.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {

    //Register user here
    console.log(profile); 
    cb(null,profile);
    
  }
));
