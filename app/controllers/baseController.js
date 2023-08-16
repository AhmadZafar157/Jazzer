const Base = require('../models/base');
const generateQuery = require('../../public/query_generator');
const get_count = require('../../public/generate_count');
const { getConnection } = require('../../public/teradata_connector');
const generateResponse = require('../../public/generate_response');
const User = require('../models/user');
const create_base = require('../../public/generate_base');


// Create a new base
exports.createBase = async (req, res) => {
  try {
    var con = getConnection();
    if(con == "TDnotConnected")
    {
      response = generateResponse(400 , "Connect to Teradata!" , "" , "");
      res.send(response);
      return;
    }
    console.log("came till here!");
    //checking if base name is unique to create a unique table
    const preExistingBase = await Base.find({"base_name" : req.body.base_name});
    if(preExistingBase.length > 0)
    {
      response = generateResponse(400 , "A base with the same name already exists !" , "" , "");
      res.send(response);
      return;
    }
    const base = new Base(req.body);
    if(base)
      base.user_id = req.userId;
    else
    {
      console.log("base object not able to assign to 'base' !");
    }
    user = await User.findById(req.userId);
    if(user)
      base.team_id = user.team_id;
    else
    {
      console.log("could not find the user in session !");
    }
    base.base_query = (await generateQuery(req.body , base.base_name))[1];
    if(base.base_query)
      console.log("QUERY TO GENERATE BASE : " + base.base_query);
    else
    {
      console.log("base query not generated properly !");
    }
    base.count = await get_count((await generateQuery(req.body , base.base_name))[0]);
    if(base.count)
      var createdBase = await create_base(base.base_query , base.base_name);
    else
    {
      console.log(`base count not calculated properly => count : ${base.count}`);
    }
    if(base.count === -1000 || createdBase === -1000)
    {
      console.log("base count = -1000 or created base = -1000");
      response = generateResponse(400 , "Connect to Teradata!" , "" , "");
      res.send(response);
      return;
    }
    await base.save();
    response = generateResponse(200 , "Created base successfully!" , "" , base);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong, creating base!" , error.message , "");
    res.send(response);
  }
};

// Get all bases
exports.getAllBases = async (req, res) => {
  try {
    var bases;
    const user = await User.findById(req.userId);
    if(user.user_type === 'non_cvm_type')
    {
      bases = await Base.find({ user_id: user._id });
    }
    else if (user.user_type === 'cvm_type')
    {
      var teamId = user.team_id;
      bases = await Base.find({ team_id: teamId});
    }
    else if (user.user_type === 'super_admin')
    {
      bases = await Base.find();
    }
    response = generateResponse(200 , "All bases!" , "" , bases);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong, getting all bases!" , error.message , "");
    res.send(response);
  }
};

// Get a specific base by ID
exports.getBaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const base = await Base.findById(id);
    if (!base) {
      response = generateResponse(400 , "Base not found!" , "" , "");
      res.send(response);
      return;
    }
    response = generateResponse(200 , "Base!" , "" , base);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong, getting base by ID!" , error.message , "");
    res.send(response);
  }
};

// Update a base
exports.updateBase = async (req, res) => {
  try {
    const { id } = req.params;
    const base = await Base.findByIdAndUpdate(id, req.body, { new: true });
    if (!base) {
      response = generateResponse(400 , "Base not found!" , "" , "");
      res.send(response);
      return;
    }
    response = generateResponse(200 , "Success!" , "" , base);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong, updating base!" , error.message , "");
    res.send(response);
  }
};

// Delete a base
exports.deleteBase = async (req, res) => {
  try {
    const { id } = req.params;
    const base = await Base.findByIdAndDelete(id);
    if (!base) {
      response = generateResponse(400 , "Base not found!" , "" , "");
      res.send(response);
      return;
    }
    response = generateResponse(200 , "Success!" , "" , base);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong, deleting base!" , error.message , "");
    res.send(response);
  }
};

// Get bases associated with the current user's userId
exports.getMyBases = async (req, res) => {
  try {
    const userId = req.userId;
    const bases = await Base.find({ user_id: userId });
    if(!bases)
    {
      response = generateResponse(400 , "Bases not found!" , "" , "");
      res.send(response);
      return;
    }
    response = generateResponse(200 , "Success!" , "" , bases);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong, getting my bases!" , error.message , "");
    res.send(response);
  }
};

module.exports = exports;
