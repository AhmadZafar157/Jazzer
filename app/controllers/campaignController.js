const Campaign = require('../models/campaign');
const executeCampaign = require('../../public/run_campaign');
const User = require('../models/user');
const generateResponse = require('../../public/generate_response');


// Non-CVM users to request CVM approval
// exports.requestApproval = async (req, res) => {
//     const {id} = req.params;
//     try {
//         const campaign = await Campaign.findByIdAndUpdate(id, {"status" : "In Progress"}, { new: true });
//         if (!campaign) {
//           response = generateResponse(400 , "Campaign not found!" , "" , "");
//           res.send(response);
//           return;
//         }
//         response = generateResponse(200 , "Request parked successfully!" , "" , "");
//         res.send(response);
//     }catch (error) {
//       response = generateResponse(500 , "Unable to park request, Something went wrong!" , error , "");
//       res.send(response);
//     }
// }

// Execute the campaign
exports.execute = async (req, res) => {
    const {id} = req.params;
    const campaign = await Campaign.findById(id);
    if(!campaign)
    {
      response = generateResponse(400 , "Campaign not found!" , "" , "");
      res.send(response);
      return;
    }
    try{
      const user = await User.findById(req.userId);
      const originalString = user.name;
      const firstSpaceIndex = originalString.indexOf(' ');
      const extractedString = originalString.substr(0, firstSpaceIndex);
      result = await executeCampaign(campaign , extractedString);
      console.log("result : " + result);
      if (result === 100)
      {
        console.log("got here !");
        campaign.status = "Executed";
        await campaign.save();
        response = generateResponse(200 , "Campaign executed successfully!" , "" , campaign);
        return res.send(response);
      }
      response = generateResponse(500 , "Unable to run campaign, Something went wrong!" , error , "");
      return res.send(response);
    }catch(error)
    {
      response = generateResponse(500 , "Unable to run campaign, Something went wrong!" , error , "");
      res.send(response);
    }
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
    // if(req.body.submissionType === 'parkRequest')
    // {
    //   campaign.status = "In Progress";
    // }
    console.log("changing campaign status !");
    await campaign.save();
    response = generateResponse(200 , "Campaign created successfully!" , "" , campaign);
    res.send(response);
    return;
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error , "");
    res.send(response);
  }
};

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    var campaigns;
    const user = await User.findById(req.userId);
    if(user.user_type === 'non_cvm_type')
    {
      campaigns = await Campaign.find({ user_id: req.userId });
    }
    else if (user.user_type === 'cvm_type')
    {
      campaigns = await Campaign.find();
    }
    response = generateResponse(200 , "Campaigns!" , "" , campaigns);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
    res.send(response);
  }
};

// Get a campaign by ID
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      response = generateResponse(400 , "Campaign not found!" , "" , "");
      res.send(response);
      return;
    }
    response = generateResponse(200 , "Campaign!" , "" , campaign);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error , "");
    res.send(response);
  }
};

// Update a campaign by ID
exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!campaign) {
      response = generateResponse(400 , "Campaign not found!" , "" , "");
      res.send(response);
      return;
    }
    response = generateResponse(200 , "Updated Campaign!" , "" , campaign);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error , "");
    res.send(response);
  }
};

// Delete a campaign by ID
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      response = generateResponse(400 , "Campaign not found!" , "" , "");
      res.send(response);
      return;
    }
    response = generateResponse(200 , "Campaign deleted successfully!" , "" , "");
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error , "");
    res.send(response);
  }
};

// Get all campaigns created by the authenticated user
exports.getMyCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ user_id: req.userId });
    response = generateResponse(200 , "My Campaigns!" , "" , campaigns);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error , "");
    res.send(response);
  }
};
