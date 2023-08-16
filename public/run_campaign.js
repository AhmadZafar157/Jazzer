const {getConnection} = require('./teradata_connector');

async function executeCampaign(camp , userName)
{
    const con = getConnection();
    var data = await con.query("select current_timestamp");
    const key = Object.values(data[0])[0];
    console.log(key);
    console.log("current_timestamp : " + JSON.stringify(data));
    var tableName = "DP_TMP.";
    tableName += `${userName}`;
    const broadcastDate = new Date(camp.BROADCAST_DATE);
    let year = broadcastDate.getFullYear();
    let month = broadcastDate.getMonth() + 1; // Note: JavaScript months are zero-based
    let day = broadcastDate.getDate();

    // Formatting in Teradata format
    const teradataDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

    const timeString = "2023-07-17 00:54:19.450000+00:00";

    const time = new Date(key);

    year = time.getFullYear();
    month = time.getMonth() + 1; // Note: JavaScript months are zero-based
    day = time.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Formatting in Teradata TIMESTAMP format
    const teradataTimestamp = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;


    var query = `Insert INTO DP_TMP.Jazzer(campaign_id,msisdn,gcg_flag,sms_text,broadcast_Date,masking,stakeholder,sms_type,sms_priority,campaign_name,service_code,channel   ,time_stamp) select distinct 100 as CAMPAIGN_ID,B.msisdn MSISDN,0 as GCG_FLAG,'${camp.sms_text}','${teradataDate}' BROADCAST_DATE,'${camp.MASKING}' as MASKING,'${camp.stakeholder}' ,1,1,'${camp.campaign_name}','adhoc','${camp.channel}','${teradataTimestamp}' from  ${tableName} as b where b.MSISDN NOT IN (select distinct access_method_num from DP_DIT.Blacklist_CVM)`;
    console.log("QUERY : " + query);
    try{
        var data = await con.query(query);
        console.log(data);
        data = '100';        //100 means successful execution
    }catch(err)
    {
        console.log(err.message);
        console.log("Please check your connection !");
        data = "-1000";
    }
    console.log("Fresh count : " + JSON.stringify(data));
    return await parseInt(data,10);
}

module.exports = executeCampaign;