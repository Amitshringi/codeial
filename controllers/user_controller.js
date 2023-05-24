// const User=require('../models/user');
// const user=require('../models/user');
const fs= require('fs');
const path=require('path');




const User = require('../models/user');
const { findById } = require('../models/user');

module.exports.profile = async function(req, res) {
  try {
    const user = await User.findById(req.params.id).exec();
    if (!user) {
      return res.status(404).send('User not found');
    }

    return res.render('user_profile', {
      title: 'User Profile',
      profile_user: user
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};




// show details of signed in user
// module.exports.profile = function(req, res) {
//     if(req.cookies.user_id) {
//         User.findById(req.cookies.user_id)
//             .then(function(user) {
//                 if(user) {
//                     return res.render('user_Profile', {
//                         title: "user profile",
//                         user: user
//                     });
//                 } else {
//                     return res.redirect('/users/sign-in');
//                 }
//             })
//             .catch(function(err) {
//                 console.log('error in finding user in profile:', err);
//                 return res.redirect('/users/sign-in');
//             });
//     } else {
//         return res.redirect('/users/sign-in');
//     }
// }

//render the Sign Up Page
module.exports.signUp=function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up', {
        title :"Codeial | Sign In"

    })
}

//render the Sign In Page
module.exports.signIn=function(req, res){
    if(req.isAuthenticated()){
        
        return res.redirect('/users/profile');
    }
    
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
module.exports.createSession=function(req, res){
  req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

//destroy session

    module.exports.destroySession = function(req, res) {
        req.logout(function(err) {
          req.flash('success', 'you have logged out!');
            if(err) {
                console.log('Error in destroying session:', err);
                return;
            }
            return res.redirect('/');
        });
    }
    

    

    

    
   

    
    
   

module.exports.update = async function(req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);

      User.uploadedAvatar(req, res, function(err) {
        if (err) {
          console.log('*****multerError', err);
        }

        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
          }
          // Save the path of the uploaded file into the avatar field of the user
          user.avatar = User.avatarPath + '/' + req.file.filename;
        }

        user.save()
          .then(() => {
            return res.redirect('back');
          })
          .catch((err) => {
            req.flash('error', err.message);
            return res.redirect('back');
          });
      });
    } catch (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
  } else {
    req.flash('error', 'Unauthorized!');
    return res.status(401).send('Unauthorized');
  }
};

    
    

    
    










