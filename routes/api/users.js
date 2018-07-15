//using the express router to create routes

const express = require('express');
const router = express.Router();


// @route   GET /api/users/test
// @desc    Test users route
//@access   Public
router.get('/test', (req,res) => res.json({msg: "user works"}));

module.exports = router;