const express = require('express');
const router = express.Router();
const ctrlComm = require('../controllers/commentaires');
const commentaire = require('../models/commentaires');

router.get('/', ctrlComm.getAllCom);
router.post('/', ctrlComm.createComm);
router.put('/:id', ctrlComm.modifyComm);
router.delete('/:id', ctrlComm.deleteComm);


module.exports = router;