       const Post=require('../models/post');
   


    module.exports.home = async function(req, res) {
        try {
          const posts = await Post.find({})
            .populate({
              path: 'user',
              select: 'name email'
            })
            .populate({
              path: 'comments',
              populate: {
                path: 'user',
                select: 'name email'
              }
            });
      
          return res.render('home', {
            title: 'Codeial | Home',
            posts
          });
        } catch (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
      };
      
    
    
        
          
        