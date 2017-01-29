
// ACCUWEATHER POLLING
var request = require('request');

function Record(api_url, time, accuweather_milford_url)
{
  request({url: accuweather_milford_url}, function (error, response, body) {
    if(error) throw error;

    // PARSE LENNOX API CALL RESPONSE
    json_get = JSON.parse(body);

    // CREATE A NEW JSON FOR THE API_CALLBACK TO IOT DATABASE
    var json_post = {};
    json_post.Device_id = "accuweather_milford"
    json_post.Time = time;
    json_post.WeatherText = json_get[0].WeatherText;
    json_post.Temperature = json_get[0].Temperature.Metric.Value;
    
    console.log(json_post);
    request.post(api_url).form(json_post);

  });
}

module.exports.record = Record;
