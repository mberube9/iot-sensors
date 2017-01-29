// LENNOX POLLING
var request = require('request');

function Record(api_url, time, lennox_url, lennox_auth)
{
  request({url: lennox_url, headers: {"Authorization" : lennox_auth}}, function (error, response, body) {
    if(error) throw error;

    // PARSE LENNOX API CALL RESPONSE
    json_get = JSON.parse(body);

    // CREATE A NEW JSON FOR THE API_CALLBACK TO IOT DATABASE
    var json_post = {};
    json_post.Device_id = 'Lennox'
    json_post.Time = time;
    json_post.Away_Mode = json_get.tStatInfo[0].Away_Mode;
    json_post.ConnectionStatus = json_get.tStatInfo[0].ConnectionStatus;
    json_post.Cool_Set_Point = json_get.tStatInfo[0].Cool_Set_Point;
    json_post.Fan_Mode = json_get.tStatInfo[0].Fan_Mode;
    json_post.Heat_Set_Point = json_get.tStatInfo[0].Heat_Set_Point;
    json_post.Indoor_Humidity = json_get.tStatInfo[0].Indoor_Humidity;
    json_post.Indoor_Temp = json_get.tStatInfo[0].Indoor_Temp;
    json_post.Operation_Mode = json_get.tStatInfo[0].Operation_Mode;
    json_post.Program_Schedule_Mode = json_get.tStatInfo[0].Program_Schedule_Mode;
    json_post.Program_Schedule_Selection = json_get.tStatInfo[0].Program_Schedule_Selection;
    json_post.System_Status = json_get.tStatInfo[0].System_Status;
    console.log(json_post);
    request.post(api_url).form(json_post);

  });
}

module.exports.record = Record;
