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
    if(con == undefined)
    {
      response = generateResponse(400 , "Connect to Teradata!" , "" , "");
      res.send(response);
      return;
    }
    const base = new Base(req.body);
    base.user_id = req.userId;
    user = await User.findById(req.userId);
    const originalString = user.name;
    const firstSpaceIndex = originalString.indexOf(' ');
    const extractedString = originalString.substr(0, firstSpaceIndex);
    base.base_query = (await generateQuery(req.body , extractedString))[1];
    console.log("heyy : " + base.base_query);
    base.count = await get_count((await generateQuery(req.body , extractedString))[0]);
    const createdBase = await create_base(base.base_query , extractedString);
    if(base.count === -1000 || createdBase === -1000)
    {
      response = generateResponse(400 , "Connect to Teradata!" , "" , "");
      res.send(response);
      return;
    }
    await base.save();
    response = generateResponse(200 , "Created base successfully!" , "" , base);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
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
      bases = await Base.find();
    }
    response = generateResponse(200 , "All bases!" , "" , bases);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
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
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
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
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
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
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
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
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
    res.send(response);
  }
};

module.exports = exports;
