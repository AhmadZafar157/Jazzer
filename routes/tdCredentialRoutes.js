const express = require('express');
const router = express.Router();
const tdCredentialController = require('../app/controllers/tdCredentialController');

// Connect to Teradata
router.post('/connect/:id' , tdCredentialController.connect);

// Disconnect from Teradata
router.post('/disconnect/:id', tdCredentialController.disconnect);

// Create a new TD credential
router.post('/tdcredential', tdCredentialController.createTDCredential);

// Get all TD credentials
router.get('/tdcredentials', tdCredentialController.getTDCredentials);

// Get a specific TD credential by ID
router.get('/tdcredential/:id', tdCredentialController.getTDCredential);

// Update a TD credential
router.patch('/tdcredential/:id', tdCredentialController.updateTDCredential);

// Delete a TD credential
router.delete('/tdcredential/:id', tdCredentialController.deleteTDCredential);

module.exports = router;
