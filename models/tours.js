var mongoose = require('mongoose');
var cfg = require('../config');
var twilio = require('twilio');

var tourSchema = new mongoose.Schema({
  tourName:String,
  status : { type: String, default: 'Ready' },
  notificationStatus : { type: String, default: 'None' },
  startDriver: { type: Object, default: {'phone': '+12028219726'} }
});

tourSchema.methods.sendSmsNotification = function (message, statusCallback , callback) {

  var client = new twilio.RestClient(cfg.twilioAccountSid, cfg.twilioAuthToken);
  var self = this;
  var options = {
    to:  self.startDriver.phone,
    from: cfg.twilioPhoneNumber,
    body: message,
    statusCallback: statusCallback
  };

  client.sendMessage(options, function(err, response) {
    if (err) {
        console.error(err);
    } else {
      var masked = self.start.phone.substr(0,
        self.start.phone.length - 5);
      masked += '*****';
      console.log('Message sent to ' + masked);
    }
  });

  if (callback) {
    callback.call(self);
  }
};

var tour = mongoose.model('tour', tourSchema);
module.exports = tour;
