const Team = require('../models/team');
const generateResponse = require('../../public/generate_response');
const User = require('../models/user');

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
    response = generateResponse(500 , "Something went wrong, creating the team!" , error.message , "");
    res.send(response);
  }
};

// Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    user = await User.findById(req.userId);
    console.log(user.user_type);
    if(user.user_type === 'super_admin')
      var teams = await Team.find();
    else if (user.user_type === 'cvm_type' || user.user_type === 'non_cvm_type')
    {
      var teams = await Team.findById(user.team_id);
    }
    response = generateResponse(200 , "All Teams!" , "" , teams);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong getting all the teams!" , error.message , "");
    res.send(response);
  }
};

// Set capping for a team
exports.setCapping = async (req , res) => {
  const user = await User.findById(req.userId);
  if(req.body.capping)
    var team = await Team.findByIdAndUpdate(user.team_id , {capping : req.body.capping} , {new : true});
  if(!team)
  {
    console.log("Failed to change capping for the team !");
    response = generateResponse(500 , "Something went wrong, unable to update capping!" , error.message , "");
    res.send(response);
    return;
  }
  response = generateResponse(200 , "Updated -capping successfully!" , "" , team);
  res.send(response);
}



// Get a single team by ID
exports.getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("I am the team id : " + id);
    const team = await Team.findById(id);
    if (!team) {
        response = generateResponse(400 , "Team not found!" , "" , "");
        res.send(response);
        return;
    }
    response = generateResponse(200 , "Team found successfully!" , "" , team);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong, getting the team by ID!" , error.message , "");
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
    response = generateResponse(500 , "Something went wrong, updating the team!" , error.message , "");
    res.send(response);
  }
};

// add stakeholder maskings
exports.addStakeholder = async(req , res) => {
  try{
    let user = await User.findById(req.userId);
    var team = await Team.findById(user.team_id);
  }
  catch(error)
  {
    console.log("User / team not found!");
    response = generateResponse(500 , "User / Team not found!" , error.message , "");
    res.send(response);
    return;
  }
  let len = req.body.stakeholderList.length;
  for(let i = 0 ; i < len ; i++)
  {
    team.stakeholderOptions.push(req.body.stakeholderList[i]);
  }
  try{
    team.save();
  }
  catch(error)
  {
    response = generateResponse(500 , "Stakeholder(s) could not be added !" , error.message , "");
    res.send(response);
    return;
  }
  response = generateResponse(200 , "Stakeholders added successfully!" , "" , team);
  res.send(response);
}


exports.addMasking = async (req , res) => {
  try{
    let user = await User.findById(req.userId);
    var team = await Team.findById(user.team_id);
  }
  catch(error)
  {
    console.log("User / team not found!");
    response = generateResponse(500 , "User / Team not found!" , error.message , "");
    res.send(response);
    return;
  }
  let len = req.body.maskingOptions.length;
  for(let i = 0 ; i < len ; i++)
  {
    team.maskingOptions.push(req.body.maskingOptions[i]);
  }
  try{
    team.save();
  }
  catch(error)
  {
    response = generateResponse(500 , "Masking(s) could not be added !" , error.message , "");
    res.send(response);
    return;
  }
  response = generateResponse(200 , "Maskings added successfully!" , "" , team);
  res.send(response);
}

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
    response = generateResponse(500 , "Something went wrong, deleting the team!" , error.message , "");
    res.send(response);
  }
};
