//using the express router to create routes
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');


// @route   GET /api/posts/test
// @desc    Test posts route
//@access   Public
router.get('/test', (req,res) => res.json({msg: "posts works"}));

// @route   POST /api/posts
// @desc    Create Post
//@access   Private
router.post('/', passport.authenticate('jwt', {session: false}), (req,res) => {

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        user: req.user.id
    });

    newPost.save()
    .then(post => res.json(post));
});

// @route   GET /api/posts
// @desc    Get Posts
//@access   Public
router.get('/', (req, res) => {
    Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404));
});

// @route   GET /api/posts/:id
// @desc    Get Post by id
//@access   Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ noPostFound: 'no post found with that id' }))
});

// @route   DELETE /api/posts/:id
// @desc    Delete Post
//@access   Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    Profile.findOne({ user: req.user.id })
     .then(profile => {
         Post.findById(req.params.id)
          .then(post => {
              //check for post owner
              if(post.user.toString() != req.user.id) {
                return res.status(401).json({ notauthorized: 'user not authorised' })
              }

              //delete
              post.remove().then(() => res.json({ success: true }))
          })
          .catch(err => res.status(404).json({ postnotfound: 'post not found' }))
     })
});

// @route   POST /api/posts/like/:id
// @desc    Like Post
//@access   Private
router.post(
    '/like/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
            .then(post => {
                //check if the user already has liked the post
                if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {

                    return res.status(400).json({ alreadyLiked: 'user already liked this post' });
                }

                //add the user id to the likes array
                post.likes.unshift({ user: req.user.id });

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'post not found' }));
        })
    }
)

// @route   POST /api/posts/unlike/:id
// @desc    unLike Post
//@access   Private
router.post(
    '/unlike/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
            .then(post => {
                //check if the user already has liked the post
                if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {

                    return res.status(400).json({ notLiked: 'you have not yet liked this post' });
                }

                //get remove index
                const removeIndex = post.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id);

                //splice it out of the array
                post.likes.splice(removeIndex, 1)

                //save
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'post not found' }));
        })
    }
)

// @route   POST /api/posts/comment/:id (id = postid since we should know on which post the user is commenting)
// @desc    Add comment to Post
//@access   Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    Post.findById(req.params.id)
     .then(post => {
         const newComment = {
             text: req.body.text,
             name: req.body.name,
             user: req.user.id
         }

         //add to comment array
         post.comments.unshift(newComment);

         //save
         post.save().then(post => res.json(post));
     })
     .catch(err => res.status(404).json({ postnotfound: 'no post found' }))

});

// @route   DELETE /api/posts/comment/:id/:comment_id
// @desc    remove comment from Post
//@access   Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req,res) => {
    Post.findById(req.params.id)
     .then(post => {
         //check to see if the comment exists
         if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
            return res.json(404).json({ commentnotfound: 'comment not found' })
         }

         //get remove index for the comment to be deleted
         const removeIndex = post.comments
            .map(items => item._id.toString())
            .indexOf(req.params.comment_id)

        //splice comment out of the array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
     })
     .catch(err => res.status(404).json({ postnotfound: 'no post found' }))
     
});




module.exports = router;