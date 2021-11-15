const express = require('express');
const router = express.Router();
const ctrlPosts = require('../controllers/posts');
const post = require('../models/posts');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('../middleware/multer-config');




router.get('/', ctrlPosts.getAllposts);
router.get('/:id',auth , ctrlPosts.getOnePost);
router.post('/',auth,multer, ctrlPosts.createPosts);
router.put('/:id',auth,multer, ctrlPosts.modifyPosts);
router.delete('/:id',auth, ctrlPosts.deletePosts);
router.delete('/admin/:id',auth, admin, ctrlPosts.deletePostsbyAdmin);


module.exports = router;