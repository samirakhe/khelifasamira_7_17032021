const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/users');
const user = require('../models/user');

router.get('/', ctrlUser.getAllusers);
router.post('/', ctrlUser.createUsers);
router.put('/:id', ctrlUser.modifyUsers);
router.delete('/:id', ctrlUser.deleteUsers);


module.exports = router;