const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//authentication using passport

passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      function (email, password, done) {
        User.findOne({ email })
          .then((user) => {
            if (!user || user.password !== password) {
              console.log("Invalid Username/Password");
              return done(null, false);
            }
            return done(null, user);
          })
          .catch((err) => {
            console.log("Error in finding user --> Passport");
            return done(err);
          });
      }
    )
  );

//serializing the user to decide which key to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
//deserializing
passport.deserializeUser(function (id, done) {
    User.findById(id)
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        console.log("Error in finding user --> passport");
        return done(err);
      });
  });

//check if the user is authenticated 
passport.checkAuthentication=function(req, res, next){
        //if user is singned in, then pass on the request to the next function(controller action)

        if(req.isAuthenticated()){
            return next();
        }
        //if the user is not signed in
        return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req, res ,next){
        if(req.isAuthenticated()){
            //req.user contains the current signed in user from the session cookies and we are just sending this to the locals for the views
            res.locals.user=req.user;
        }
        next();
}




module.exports = passport;
