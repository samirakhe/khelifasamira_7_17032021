const express = require('express');
const router = express.Router();
const ctrlComm = require('../controllers/commentaires');
const commentaire = require('../models/commentaires');
const auth = require('../middleware/auth');

router.get('/', ctrlComm.getAllCom);
router.post('/', auth, ctrlComm.createComm);
router.put('/:id',auth, ctrlComm.modifyComm);
router.delete('/:id',auth, ctrlComm.deleteComm);


module.exports = router;