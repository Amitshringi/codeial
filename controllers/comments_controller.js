const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
    try {
        const post = await Post.findById(req.body.post);
        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.Post,
                user: req.user._id
            });
            post.comments.push(comment);
            await post.save();
            return res.redirect('/');
        }
    } catch(err) {
        console.error(err);
        return res.redirect('back');
    }
};