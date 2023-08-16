const odbc = require('odbc');

var connection;

async function connectToTeradata(credentials) {
  try {
    const connectionConfig = {
      connectionString: `DRIVER=Teradata;DBCNAME=${credentials.host};DATABASE=${credentials.database};UID=${credentials.username};PWD=${credentials.password}`,
      connectionTimeout: 5000,
      loginTimeout: 10, 
    };
    connection = await odbc.connect(connectionConfig);
    console.log("Connected to Teradata");
    console.log("printing connection in next line : ");
    console.log(connection);
    return connection;
  } catch (error) {
    console.error('Error connecting to Teradata:', error);
    throw error;
  }
}

async function disconnectFromTeradata(con) {
  try {
    if(con === undefined || con === "TDnotConnected")
    {
      console.log("Already Disconnected !");
      return "closed";
    }
    connection = await con.close();
    return "closed";
  } catch (error) {
    console.error('Error disconnecting from Teradata:', error);
    throw error;
  }
}

function setConnection(con)
{
  if(con == 'closed' || con == "TDnotConnected")
    connection = undefined;
  connection = con;
  return connection;
}

function getConnection()
{
  if(connection === undefined)
  {
    return "TDnotConnected";
  }
  else
  {
    return connection;
  }
}


module.exports = {connectToTeradata , disconnectFromTeradata , getConnection , setConnection};
