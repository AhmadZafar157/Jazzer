const Base = require('../models/base');
const generateQuery = require('../../public/query_generator');
const get_count = require('../../public/generate_count');
const { getConnection } = require('../../public/teradata_connector');

// Create a new base
exports.createBase = async (req, res) => {
  try {
    var con = getConnection();
    if(con == undefined)
    {
      res.json({"Issue" : "Please check your Teradata connection !"});
      return;
    }
    const base = new Base(req.body);
    base.user_id = req.userId;
    base.base_query = (await generateQuery(req.body))[1];
    base.count = await get_count((await generateQuery(req.body))[0]);
    if(base.count === -1000)
    {
      res.json("Please check your Teradata connection !");
    }
    await base.save();
    res.json(base);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bases
exports.getAllBases = async (req, res) => {
  try {
    const bases = await Base.find();
    res.json(bases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific base by ID
exports.getBaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const base = await Base.findById(id);
    if (!base) {
      return res.status(404).json({ error: 'Base not found' });
    }
    res.json(base);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a base
exports.updateBase = async (req, res) => {
  try {
    const { id } = req.params;
    const base = await Base.findByIdAndUpdate(id, req.body, { new: true });
    if (!base) {
      return res.status(404).json({ error: 'Base not found' });
    }
    res.json(base);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a base
exports.deleteBase = async (req, res) => {
  try {
    const { id } = req.params;
    const base = await Base.findByIdAndDelete(id);
    if (!base) {
      return res.status(404).json({ error: 'Base not found' });
    }
    res.json({ message: 'Base deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get bases associated with the current user's userId
exports.getMyBases = async (req, res) => {
  try {
    const userId = req.userId;
    const bases = await Base.find({ user_id: userId });
    res.json(bases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = exports;
