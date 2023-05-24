const Post = require('../models/post');
const Comment= require('../models/comment');

module.exports.create = function(req, res) {
    Post.create({
        content: req.body.content,
        
        user: req.user._id,
    })
    .then(function(post) {

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'post created!'
            });
        }
        

        req.flash('success','Post Published!')
        return res.redirect('back');
    })
    .catch(function(err) {
        req.flash('error', err);
        return res.redirect('back');
    });
}

module.exports.destroy = async function(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            if (post.user == req.user.id) {
                req.flash('success', 'Post and assocoated comments deleted');
                await Post.deleteOne({ _id: req.params.id });
                await Comment.deleteMany({ post: req.params.id });
            }
        }
        req.flash('error', 'You cannot delete the post!');
        return res.redirect('back');
    } catch (err) {
       req.flash('error', err);
        return res.redirect('back');
    }
};


