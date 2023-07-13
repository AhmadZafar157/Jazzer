const Campaign = require('../models/campaign');
const generateInsertQuery = require('../../public/query_generator');



// Non-CVM users to request CVM approval
exports.requestApproval = async (req, res) => {
    const {id} = req.params;
    try {
        const campaign = await Campaign.findByIdAndUpdate(id, {"status" : "In Progress"}, { new: true });
        if (!campaign) {
          return res.status(404).json({ error: 'Campaign not found' });
        }
        res.send("Request Parked");
    }catch (error) {
        res.status(500).json({ error: "Unable to park request !" });
    }
}

// Execute the campaign
exports.executeCampaign = async (req, res) => {
    // steps to execute campaign
    // create DP_TMP.targetBase  query
    // create insert query
}

// Add base to a campaign
exports.addBase = async (req, res) => {

}

// Purge base from a campaign
exports.purgeBase = async (req, res) => {

}

// Create a new campaign
exports.createCampaign = async (req, res) => {
  try {
    const campaign = new Campaign({
      ...req.body,
      user_id: req.userId, // Set the user_id based on the authenticated user
    });
    await campaign.save();
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a campaign by ID
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a campaign by ID
exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a campaign by ID
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all campaigns created by the authenticated user
exports.getMyCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ user_id: req.userId });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
