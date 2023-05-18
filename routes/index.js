 const express=require('express');

 const router=express.Router();
 const passport=require('passport');
 
 const usersController=require('../controllers/user_controller');
 const home_Controller=require('../controllers/home_controller');
 

 console.log('router loaded fdgfd');


 router.get('/', home_Controller.home);

//  router.use('/users',require('./user'));


//  router.post('/users/create-session', passport.authenticate(
//     'local',
//         {failureRedirect :'/users/sign-in'},
// ), usersController.createSession);

//mongo store is used to store the session cookies in the db

router.use('/users', require('./user'));
router.use('/posts', require('./posts'))
router.use('/comments',require('./comments'));
 

 module.exports=router;