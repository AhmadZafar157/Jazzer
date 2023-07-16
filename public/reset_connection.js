const TDCredentials = require('../app/models/tdCredential');

async function resetConnection(req , res)
{
    await TDCredentials.updateMany({}, { "status" : false });
}

module.exports = resetConnection;