const Team = require('../models/team');
const generateResponse = require('../../public/generate_response');

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const { name, shortCode, stakeholderOptions, maskingOptions } = req.body;
    const team = new Team({
      name,
      shortCode,
      stakeholderOptions,
      maskingOptions,
    });
    await team.save();
    response = generateResponse(200 , "Team created successfully!" , "" , team);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
    res.send(response);
  }
};

// Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    response = generateResponse(200 , "All Teams!" , "" , teams);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
    res.send(response);
  }
};

// Get a single team by ID
exports.getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    if (!team) {
        response = generateResponse(400 , "Team not found!" , "" , "");
        res.send(response);
        return;
    }
    response = generateResponse(200 , "Team found successfully!" , "" , team);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
    res.send(response);
  }
};

// Update a team
exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, shortCode, stakeholderOptions, maskingOptions } = req.body;

    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      {
        name,
        shortCode,
        teamMemberIds,
        stakeholderOptions,
        maskingOptions,
      },
      { new: true }
    );

    if (!updatedTeam) {
        response = generateResponse(400 , "Team not found!" , "" , "");
        res.send(response);
        return;
    }
    response = generateResponse(200 , "Team updated successfully!" , "" , updatedTeam);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
    res.send(response);
  }
};

// Delete a team
exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeam = await Team.findByIdAndDelete(id);
    if (!deletedTeam) {
        response = generateResponse(400 , "Team not found!" , "" , "");
        res.send(response);
        return;
    }
    response = generateResponse(200 , "Team deleted successfully!" , "" , deletedTeam);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
    res.send(response);
  }
};
