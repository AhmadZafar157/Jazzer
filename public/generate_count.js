const {getConnection} = require('./teradata_connector');

async function get_count(query)
{
    console.log("QUERY : " + query);
    try{
        const con = getConnection();
        var data = await con.query(query);
        data = data[0]['Count(*)'];
    }catch(err)
    {
        console.log("Please check your connection !");
        data = "-1000";
    }
    console.log("Fresh count : " + JSON.stringify(data));
    return await parseInt(data,10);
}

module.exports = get_count;