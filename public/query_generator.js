async function generateQuery(filterCriterion)
{
    var query = "select count(*) from DP_VEW.profile_ads_unica where ";
    var Query = "select top 10* from DP_VEW.profile_ads_unica where ";
    // first step : Iterate over all attributes in filterCriterion
    // second step : check if attribute is sub_offering_group_w1, [number], [string]
    // third step : if attribute is sub_offer... enhance query with value in attr
    // fourth step : if attr is [string], find len of array and concat in str
    // fifth step : if attr is [number], if ind[1]=NULL concat str with '=', if both ind not null concat BTW query
    var checker = false;
    // first step
    var length = Object.keys(filterCriterion).length;
    for(let key in filterCriterion)
    {
        if(key === 'base_name' || key === 'base_query' || key === 'count' || key === 'user_id')
        {
            console.log("base_name or base_query or count or user_id was sent in the body via request !");
        }
        else if(key === 'sub_offering_group_w1')
        {
            if(checker === true)
            {
                query += ' AND ';
                Query += ' AND ';
            }
            query += `${key} = '${filterCriterion[key]}'`;
            Query += `${key} = '${filterCriterion[key]}'`;
            checker = true;
        }
        else if (typeof(filterCriterion[key][0])  === "number")
        {
            if(checker === true)
            {
                query += ' AND ';
                Query += ' AND ';
            }
            // Handling number array here
            const numArray = filterCriterion[key];
            if(numArray.length === 2 && numArray[0] != null && numArray[1] != null)
            {
                query += `${key} BETWEEN ${filterCriterion[key][0]} AND ${filterCriterion[key][1]}`;
                Query += `${key} BETWEEN ${filterCriterion[key][0]} AND ${filterCriterion[key][1]}`;
            }
            else if(numArray.length === 2 && numArray[0] != null && numArray[1] == null)
            {
                query += `${key} = '${filterCriterion[key][0]}'`;
                Query += `${key} = '${filterCriterion[key][0]}'`;
            }
            checker = true;
        }
        else if (typeof(filterCriterion[key][0])  === "string") 
        {
            if(checker === true)
            {
                query += ' AND ';
                Query += ' AND ';
            }
            query += `${key} IN (`;
            Query += `${key} IN (`;
            // Handling number array here
            const stringArray = filterCriterion[key];
            let firstIteration = 0;
            for(let value in stringArray)
            {
                if(firstIteration === 0)
                {
                    query += `'${stringArray[value]}'`;
                    Query += `'${stringArray[value]}'`;
                    firstIteration = 1;
                }
                else
                {
                    query += `,'${stringArray[value]}'`;
                    Query += `,'${stringArray[value]}'`;
                }
            }
            query += ')';
            Query += ')';
            checker = true;
        }
        else
        {
            console.log("An attribute from base was passed via req.body that does not exist in the system !");
        }
    }
    return [query , Query];
}

module.exports = generateQuery;