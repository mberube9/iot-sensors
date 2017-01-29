var api_url = process.env['API_URL'],
    polling_freq = process.env['POLLING_FREQ'];

var lennox_username = process.env['LENNOX_USER'],
    lennox_password = process.env['LENNOX_PASSWORD'],
    lennox_gatewaysn = process.env['LENNOX_GATEWAYSN'];

try {if (api_url === undefined || polling_freq  === undefined || lennox_username  === undefined || lennox_password  === undefined || lennox_gatewaysn  === undefined) throw "Some mandatory ENV variables were not defined"; }
catch(err){console.log(err); return -1;}

var lennox_url = 'https://services.myicomfort.com/DBAcessService.svc/GetTStatInfoList?GatewaySN=' + lennox_gatewaysn + '&TempUnit=&Cancel_Away=-1',
    lennox_auth = "Basic " + new Buffer(lennox_username + ":" + lennox_password).toString("base64");

var lennox = require('./lennox.js');
var photon = require('./photon.js');
var token = process.env['TOKEN'];

setInterval(function() {

  var time = new Date;
  lennox.record(api_url, time, lennox_url,lennox_auth);

  var device_id = process.env['DEVICE1_ID'],
      device_var = process.env['DEVICE1_VAR1'];
      photon.record(api_url, time, device_id, device_var, token);

  var device_id = process.env['DEVICE2_ID'],
      device_var = process.env['DEVICE2_VAR1'];
      photon.record(api_url, time, device_id, device_var, token);
      
}, polling_freq);
