const passport = require("passport");
const googleStategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const { profile } = require("console");

passport.use(
    new googleStategy(
      {
        clientID: "544864057728-eiag1o2ic92u47obcjrbhrnoo1fpec30.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const user = await User.findOne({ email: profile.emails[0].value }).exec();
          
          if (user) {
            return done(null, user);
          } else {
            const newUser = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            });
  
            return done(null, newUser);
          }
        } catch (err) {
          console.log("Error in Google Strategy passport:", err);
          return done(err);
        }
      }
    )
  );
  

module.exports=passport;