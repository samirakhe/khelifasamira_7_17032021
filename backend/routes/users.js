const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/users');
const user = require('../models/user');
const auth = require('../middleware/auth');

router.get('/', ctrlUser.getAllusers);
router.post('/signup', ctrlUser.createUsers);
router.get('/:id', ctrlUser.getOneUser);
router.post('/login', ctrlUser.login);
router.put('/:id', ctrlUser.modifyUsers);
router.delete('/:id', ctrlUser.deleteUsers);


module.exports = router;