const Post = require('../models/post');
const User = require('../models/user');

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

    const all_users = await User.find({}); // Fetch all user data

    return res.render('home', {
      title: 'Codeial | Home',
      posts: posts,
      all_users: all_users // Pass the user data array to the view
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};
