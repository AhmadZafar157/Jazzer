const {getConnection} = require('./teradata_connector');

async function create_base(query , name)
{
    const con = getConnection();
    console.log("QUERY : " + query);
    try{
        var data = await con.query(query);
        console.log("actual query for base : " + JSON.stringify(data) + data);
    }catch(err)
    {
        console.log("Please check your connection -> " + err.message);
        data = "-1000";
    }
    console.log("Insertion result : " + JSON.stringify(data));
    return await parseInt(data,10);
}

module.exports = create_base;