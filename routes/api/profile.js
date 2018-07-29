//using the express router to create routes
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');
//we will use passport for a private route

//load profile model
const Profile = require('../../models/Profile');
//load user model
const User = require('../../models/User');

// @route   GET /api/profile/test
// @desc    Test profile route
//@access   Public
router.get('/test', (req,res) => res.json({msg: "profile works"}));

// @route   GET /api/profile/
// @desc    Get current Users Profile
//@access   Private
router.get('/', passport.authenticate('jwt', { session: false }), (req,res) => {
    const errors = {}

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        if(!profile){
            errors.noprofile = 'there is no profile for this user';
            return res.status(404).json(errors);
        }
        //if there is a profile
        res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST /api/profile/
// @desc    create User Profile
//@access   Private
router.post('/', passport.authenticate('jwt', { session: false }), (req,res) => {
    
    //get fields
    const profileFields = {};
    profileFields.user = req.user.id;

    //invites
    profileFields.invites = {}
    if(req.body.businessUnit) profileFields.invites.businessUnit = req.body.businessUnit;
    if(req.body.racf) profileFields.invites.racf = req.body.racf;
    if(req.body.offering) profileFields.invites.offering = req.body.offering;
    if(req.body.subject) profileFields.invites.subject = req.body.subject;
    if(req.body.status) profileFields.invites.status = req.body.status;
    

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        if(profile) {
            console.log(profile);
        } else {
            //create profile or save profile
            new Profile(profileFields).save().then(profile => res.json(profile));

        }
    })
    .catch(err => res.status(404).json(err));
});


module.exports = router;