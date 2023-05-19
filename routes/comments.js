const  express=require('express');
const router=express.Router();
const passport=require('passport');

const commentsController=require('../controllers/comments_controller');
// const { route } = require('./user');

// router.post('/comments', (req, res) => {
//     // handle POST request
//     passport.checkAuthentication, commentsController.create;
//   });

router.post('/create', passport.checkAuthentication, commentsController.create);
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

module.exports=router;