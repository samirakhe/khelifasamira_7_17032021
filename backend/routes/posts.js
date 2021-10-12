const express = require('express');
const router = express.Router();
const ctrlPosts = require('../controllers/posts');
const post = require('../models/posts');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');



router.get('/', ctrlPosts.getAllposts);
router.get('/:id',auth , ctrlPosts.getOnePost);
router.post('/',auth, ctrlPosts.createPosts);
router.put('/:id',auth, ctrlPosts.modifyPosts);
router.delete('/:id',auth, ctrlPosts.deletePosts);
router.delete('/admin/:id',auth, admin, ctrlPosts.deletePostsbyAdmin);


module.exports = router;