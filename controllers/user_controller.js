const User=require('../models/user');

module.exports.profile= function profile(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
    // res.end('<h1>User Profile</h1>');
    
}

//render the Sign Up Page
module.exports.signUp=function(req, res){
    return res.render('user_sign_up', {
        title :"Codeial | Sign In"

    })
}

//render the Sign In Page
module.exports.signIn=function(req, res){
    return res.render('user_sign_in', {
        title :"Codeial | Sign In"

    })
}


//get the SignUp data
module.exports.create = function(req, res){

    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email})
    .then(function(user){
        if (user){
            return res.redirect('back');
        } else {
            return User.create(req.body);
        }
    })
    .then(function(user){
        return res.redirect('/users/sign-in');
    })
    .catch(function(err){
        console.log('error in signing up user:', err);
        return res.redirect('back');
    });
}



// Sign in and create a session for the user
module.exports.createSession = function(req, res){

    // steps to authenticate
    // find the user
    User.findOne({email: req.body.email})
    .then(function(user){
        if (!user) {
            // handle user not found
            return res.redirect('back');
        }
        // handle user found
        if (user.password != req.body.password){
            return res.redirect('back');
        }
        // handle session creation
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
    })
    .catch(function(err){
        console.log('error in finding user in signing in', err);
        return res.redirect('back');
    });
}
//show details of signed in user
const user=require('../models/user');
module.exports.profile = function(req, res) {
    if(req.cookies.user_id) {
        User.findById(req.cookies.user_id)
            .then(function(user) {
                if(user) {
                    return res.render('user_Profile', {
                        title: "user profile",
                        user: user
                    });
                } else {
                    return res.redirect('/users/sign-in');
                }
            })
            .catch(function(err) {
                console.log('error in finding user in profile:', err);
                return res.redirect('/users/sign-in');
            });
    } else {
        return res.redirect('/users/sign-in');
    }
}




