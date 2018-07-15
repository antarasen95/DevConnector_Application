//using the express router to create routes

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs'); // -> we need to ecrypt the password
const keys = require('../../config/keys')
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');



//load User model -> mongoose from models/User.js
const User = require('../../models/User');


// @route   GET /api/users/test
// @desc    Test users route
//@access   Public
router.get('/test', (req,res) => res.json({msg: "user works"}));


// @route   POST /api/users/register
// @desc    Register an user
//@access   Public



router.post('/register', (req,res) =>{

    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  

    //we ll mongoose user model to check if email already exists
    User.findOne({ email: req.body.email}) //we access it through req.body.whateverRequired ->need bodyParser for the same
    .then(user => {

        if(user){
            return res.status(400).json({email: 'email already exists'});
        } else {

            const avatar = gravatar.url(req.body.email, {
 
                s: '200', //size of image
                r: 'pg' ,   //rating
                d: 'mm' //default
            });
            //create a new user -> with the model name "User exported from model/User.js"
            const newUser = new User({

                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash) => {

                    if(err) throw err;
                    newUser.password = hash;

            newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
                })
            })
        }

    })

});

// @route   POST /api/users/Login
// @desc    Login an user / Returning JWT(json web token) Token
//@access   Public

router.post('/login', (req,res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //find user by email -> we ll use our mongoose model "User" created
    User.findOne({email})
    .then(user => {
        //check for existense of user
        if(!user){

            return res.status(404).json({email: 'user email not found'});
        }
    //check password
    //now password which user enters is plain text and password existing in database is hashed
    bcrypt.compare(password, user.password)
    .then(isMatch => {

        if(isMatch){
            //user matched

            const payload = {id: user.id, name: user.name, avatar: user.avatar} //create jwt payload
            //sign token
            jwt.sign(payload,
                     keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => { //want to send this token as a response
                    res.json({
                        success: true,
                        token: 'Bearer' + token
                    });
                    });
            
        }
        else { //if passwords doesnot match
          return res.status(400).json({password: 'password incorrect'});
        }
    })

    });
});

// @route   GET /api/users/current
// @desc    Return current user with a particular token
//@access   Private

router.get('/current', passport.authenticate('jwt', {session: false}), (req,res) => {
   // res.json({msg: 'success'});
  // res.json(req.user);
  res.json({

    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});



module.exports = router;

