const express = require('express');
const router = express.Router();

const campaignController = require('../app/controllers/campaignController');

// Create a campaign
router.post('/campaign', campaignController.createCampaign);

// Get all campaigns
router.get('/campaigns', campaignController.getAllCampaigns);

// Get my campaigns
router.get('/my-campaigns', campaignController.getMyCampaigns);

// Get a single campaign by ID
router.get('/campaign/:id', campaignController.getCampaignById);

// Update a campaign
router.patch('/campaign/:id', campaignController.updateCampaign);

// Delete a campaign
router.delete('/campaign/:id', campaignController.deleteCampaign);

module.exports = router;
