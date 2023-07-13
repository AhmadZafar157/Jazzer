const TDCredentials = require('../models/tdCredential');
const { connectToTeradata, disconnectFromTeradata, getConnection } = require('../../public/teradata_connector');




// Connect to Teradata
exports.connect = async (req, res) => {
  try {
    const { id } = req.params;
    const tdCredential = await TDCredentials.findById(id);
    if (!tdCredential) {
      return res.status(404).json({ error: 'TD credential not found' });
    }
    try{
      const connection = await connectToTeradata(tdCredential);
    }catch(err)
    {
      res.send(err.message);
    }
    res.json({ message: 'Connected to Teradata successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Disconnect from Teradata
exports.disconnect = async (req, res) => {
  try {
    const { id } = req.params;
    const tdCredential = await TDCredentials.findById(id);
    if (!tdCredential) {
      return res.status(404).json({ error: 'TD credential not found' });
    }
    // get connection obj
    const connection = await getConnection();
    
    // Call the disconnectFromTeradata function and pass the connection as an argument
    await disconnectFromTeradata(connection);
    
    res.json({ message: 'Disconnected from Teradata successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Create a new TD credential
exports.createTDCredential = async (req, res) => {
  try {
    const { host, database, username, password } = req.body;
    var user_id = req.userId;
    const tdCredential = new TDCredentials({ user_id, host, database, username, password });
    const savedTDCredential = await tdCredential.save();
    res.status(201).json(savedTDCredential);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all TD credentials
exports.getTDCredentials = async (req, res) => {
  try {
    const tdCredentials = await TDCredentials.find();
    res.json(tdCredentials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific TD credential by ID
exports.getTDCredential = async (req, res) => {
  try {
    const { id } = req.params;
    const tdCredential = await TDCredentials.findById(id);
    if (!tdCredential) {
      return res.status(404).json({ error: 'TD could not found' });
    }
    res.json(tdCredential);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a TD credential
exports.updateTDCredential = async (req, res) => {
  try {
    const { id } = req.params;
    var user_id = req.userId;
    const { host, database, username, password } = req.body;
    const updatedTDCredential = await TDCredentials.findByIdAndUpdate(
      id,
      { user_id, host, database, username, password },
      { new: true }
    );
    if (!updatedTDCredential) {
      return res.status(404).json({ error: 'TD credential not found' });
    }
    res.json(updatedTDCredential);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a TD credential
exports.deleteTDCredential = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTDCredential = await TDCredentials.findByIdAndDelete(id);
    if (!deletedTDCredential) {
      return res.status(404).json({ error: 'TD credential not found' });
    }
    res.json({ message: 'TD credential deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
