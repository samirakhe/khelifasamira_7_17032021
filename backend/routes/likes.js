const express = require('express');
const router = express.Router();
const ctrlLikes = require('../controllers/likes');
const Likes = require('../models/likes');


router.post('/', ctrlLikes.LikedPost);


module.exports = router;