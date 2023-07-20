function generateResponse(status_code , message , error , data)
{
    return {
        "statusCode": status_code,
        "message": message,
        "error": error,
        "data": data
      }
}


module.exports = generateResponse;