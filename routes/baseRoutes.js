const express = require('express');
const baseController = require('../app/controllers/baseController');

const router = express.Router();

// Base routes
router.get('/my-bases', baseController.getMyBases);
router.get('/base/:id', baseController.getBaseById);
router.get('/bases', baseController.getAllBases);
router.post('/base', baseController.createBase);
router.patch('/base/:id', baseController.updateBase);
router.delete('/base/:id', baseController.deleteBase);

module.exports = router;
