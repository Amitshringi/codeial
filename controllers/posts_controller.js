const Post = require('../models/post');

module.exports.create = function(req, res) {
    Post.create({
        content: req.body.content,// yha comment krn ah
        
        user: req.user._id,
        // comments :req.user.comments//ye extra likha h

    })
    .then(function(post) {
        return res.redirect('back');
    })
    .catch(function(err) {
        console.log('Error in creating post', err);
        return;
    });
}
