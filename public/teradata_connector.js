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
    return connection;
  } catch (error) {
    console.error('Error connecting to Teradata:', error);
    throw error;
  }
}

async function disconnectFromTeradata(con) {
  try {
    connection = await con.close();
    console.log('Disconnected from Teradata');
    return "closed";
  } catch (error) {
    console.error('Error disconnecting from Teradata:', error);
    throw error;
  }
}

function setConnection(con)
{
  if(con == 'closed')
    connection = undefined;
  connection = con;
  return connection;
}

function getConnection()
{
  console.log(connection.query);
  return connection;
}


module.exports = {connectToTeradata , disconnectFromTeradata , getConnection , setConnection};
