 const express=require('express');

 const router=express.Router();

 const home_Controller=require('../controllers/home_controller');

 console.log('router loaded');

 router.get('/', home_Controller.home);
 router.use('/users',require('./user'));

 

 module.exports=router;