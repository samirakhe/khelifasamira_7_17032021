const express = require('express');
const router = express.Router();
const ctrlPosts = require('../controllers/posts');
const post = require('../models/posts');

router.get('/', ctrlPosts.getAllposts);
router.post('/', ctrlPosts.createPosts);
router.put('/:id', ctrlPosts.modifyPosts);
router.delete('/:id', ctrlPosts.deletePosts);


module.exports = router;