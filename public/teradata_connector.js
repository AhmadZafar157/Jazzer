const odbc = require('odbc');


async function connectToTeradata(credentials) {
  try {
    const connectionConfig = {
      connectionString: `DRIVER=Teradata;DBCNAME=${credentials.host};DATABASE=${credentials.database};UID=${credentials.username};PWD=${credentials.password}`,
      connectionTimeout: 5000,
      loginTimeout: 10, 
    };

    const connection = await odbc.connect(connectionConfig);
    console.log("Connected to Teradata");
    return connection;
  } catch (error) {
    console.error('Error connecting to Teradata:', error);
    throw error;
  }
}

async function disconnectFromTeradata(connection) {
  try {
    await connection.close();
    console.log('Disconnected from Teradata');
  } catch (error) {
    console.error('Error disconnecting from Teradata:', error);
    throw error;
  }
}


module.exports = {connectToTeradata , disconnectFromTeradata};
