const TDCredentials = require('../models/tdCredential');
const { connectToTeradata, disconnectFromTeradata, getConnection , setConnection} = require('../../public/teradata_connector');
const generateResponse = require('../../public/generate_response');





// Connect to Teradata
exports.connect = async (req, res) => {
  try {
    const { id } = req.params;
    var tdCredential = await TDCredentials.findById(id);
    if (!tdCredential) {
      response = generateResponse(400 , "Credentials not found!" , "" , "");
      res.send(response);
      return;
    }
    const connectedTd = await TDCredentials.findOne({"status": true});
    if(connectedTd)
    {
      response = generateResponse(500 , `Already connected with ${connectedTd.username} !` , "" , "");
      res.send(response);
      return;
    }
    try{
      const connection = await connectToTeradata(tdCredential);
      const con = setConnection(connection);
      try{
        tdCredential = await TDCredentials.findByIdAndUpdate(id , {"status" : true}, {new : true});
        console.log("tdcredetials : " + tdCredential);
      }catch(err)
      {
        response = generateResponse(500 , "Could not connect!" , err.message , "");
        res.send(response);
        return;
      }
      response = generateResponse(200 , "Connected to Teradata successfully!" , "" , tdCredential);
      res.send(response);
      return;
    }catch(err)
    {
      response = generateResponse(500 , "Could not establish connection !" , err , "");
      res.send(response);
      return;
    }
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
    res.send(response);
  }
};

// Disconnect from Teradata
exports.disconnect = async (req, res) => {
  try {
    const { id } = req.params;
    var tdCredential = await TDCredentials.findById(id);
    console.log(tdCredential);
    if (!tdCredential) {
      response = generateResponse(400 , "Credentials not found!" , "" , "");
      res.send(response);
      return;
    }
    // get connection obj
    const connection = await getConnection();
    if(connection === undefined)
    {
      response = generateResponse(500 , `Already disconnected from Teradata !` , "" , "");
      res.send(response);
      return;
    }
    // Call the disconnectFromTeradata function and pass the connection as an argument
    const con = await disconnectFromTeradata(connection);
    var check = await setConnection(con);
    if(check == 'closed')
    {
      try{
        tdCredential = await TDCredentials.findByIdAndUpdate(id , {"status" : false}, {new : true});
      }catch(err)
      {
        response = generateResponse(500 , "Could not disconnect!" , err.message , "");
        res.send(response);
        return;
      }
      console.log(tdCredential);
      response = generateResponse(200 , "Disconnected from Teradata successfully!" , "" , tdCredential);
      res.send(response);
      return;
    }
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error.message , "");
    res.send(response);
  }
};



// Create a new TD credential
exports.createTDCredential = async (req, res) => {
  try {
    const { host, database, username, password } = req.body;
    var user_id = req.userId;
    const tdCredential = new TDCredentials({ user_id, host, database, username, password });
    const savedTDCredential = await tdCredential.save();
    response = generateResponse(200 , "Created TD credentials!" , "" , savedTDCredential);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error , "");
    res.send(response);
  }
};

// Get all TD credentials
exports.getTDCredentials = async (req, res) => {
  try {
    const tdCredentials = await TDCredentials.find();
    response = generateResponse(200 , "All TD credentials!" , "" , tdCredentials);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error.message , {});
    res.send(response);
  }
};

// Get a specific TD credential by ID
exports.getTDCredential = async (req, res) => {
  try {
    const { id } = req.params;
    const tdCredential = await TDCredentials.findById(id);
    if (!tdCredential) {
      response = generateResponse(400 , "TD credentials not found!" , "" , "");
      res.send(response);
      return;
    }
    response = generateResponse(200 , "TD credentials!" , "" , tdCredential);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error , "");
    res.send(response);
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
      response = generateResponse(400 , "TD credentials not found!" , "" , "");
      res.send(response);
      return;
    }
    response = generateResponse(200 , "Updated TD credentials!" , "" , updatedTDCredential);
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error , "");
    res.send(response);
  }
};

// Delete a TD credential
exports.deleteTDCredential = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTDCredential = await TDCredentials.findByIdAndDelete(id);
    if (!deletedTDCredential) {
      response = generateResponse(400 , "TD credentials not found!" , "" , "");
      res.send(response);
      return;
    }
    response = generateResponse(200 , "TD credentials deleted successfully!" , "" , "");
    res.send(response);
  } catch (error) {
    response = generateResponse(500 , "Something went wrong!" , error , "");
    res.send(response);
  }
};
