 const express=require('express');
 const passport=require('passport');

 const router=express.Router();
 const home_Controller=require('../controllers/home_controller');
 
 
 const usersController=require('../controllers/user_controller');
 
 

 console.log('router loaded ');


 router.get('/', home_Controller.home);
router.use('/users', require('./user'));
router.use('/posts', require('./posts'))
router.use('/comments',require('./comments'));

router.use('/api', require('./api'));
 

 module.exports=router;