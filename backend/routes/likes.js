const express = require('express');
const router = express.Router();
const ctrlLikes = require('../controllers/likes');
const Likes = require('../models/likes');
const auth =  require('../middleware/auth');


router.post('/',auth, ctrlLikes.LikedPost);


module.exports = router;