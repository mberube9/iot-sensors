// PHOTON POLLING
var request = require('request');
var Particle = require('particle-api-js');
var particle = new Particle();

function Record(api_url, time, device_id, device_var, token)
{
  var json_post = {};

  particle.getVariable({ deviceId: device_id, name: device_var, auth: token }).then(function(data) {
    //console.log('Device variable retrieved successfully:', data);

    json_post.Time = time;
    json_post.Device_id = device_id;
    json_post.Device_var = device_var;
    json_post.Data = data.body.result;
    console.log(json_post);
    request.post(api_url).form(json_post);
  }, function(err) {
    console.log('An error occurred while getting attrs:', err);
  });

}

module.exports.record = Record;
