const Post = require('../models/post');
const Comment= require('../models/comment');

module.exports.create = function(req, res) {
    Post.create({
        content: req.body.content,
        
        user: req.user._id,
       

    })
    .then(function(post) {
        return res.redirect('back');
    })
    .catch(function(err) {
        console.log('Error in creating post', err);
        return;
    });
}

module.exports.destroy = async function(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            if (post.user == req.user.id) {
                await Post.deleteOne({ _id: req.params.id });
                await Comment.deleteMany({ post: req.params.id });
            }
        }
        return res.redirect('back');
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
};


