var express = require('express');
var router = express.Router();
var tour = require('../models/tours');

// GET: /tours
router.get('/', function(req, res, next) {

  tour.find().then(function (tours) {
    console.log("bob", tours);
    res.render('tours/index', { tours });
  });

});

// GET: /tours/4
router.get('/:tourId/show', function(req, res, next) {
  console.log("tour/show");
  var tourId = req.params.tourId;
  tour.findOne({_id: tourId }).then(function (tour) {
    res.render('tours/show', { tour : tour });
  });
});

// POST: /tours/4/pickup
router.post('/:tourId/pickup', function(req, res, next) {

  var tourId = req.params.tourId;

  tour.findOne({_id: tourId }).then(function (tour) {
    tour.status = 'Shipped';
    tour.notificationStatus = 'Queued';
    tour.save();

    tour.sendSmsNotification('Your clothes will be sent and will be delivered in 20 minutes', getCallbackUri(req) );
    res.redirect(`/tours/${tourId}/show`);
  });
});

// POST: /tours/4/deliver
router.post('/:tourId/deliver', function(req, res, next) {

  var tourId = req.params.tourId;

  tour.findOne({_id: tourId }).then(function (tour) {
    tour.status = 'Delivered';
    tour.notificationStatus = 'Queued';
    tour.save();

    tour.sendSmsNotification('Your clothes have been delivered', getCallbackUri(req) );
    res.redirect(`/tours/${tourId}/show`);
  });
});


// POST: /tours/4/status/update
router.post('/tours/:tourId/status/update', function(req, res, next) {

  var tourId = req.params.tourId;
  var notificationStatus = req.body.MessageStatus;

  tour.findOne({_id: tourId }).then(function (tour) {
    tour.notificationStatus = notificationStatus.charAt(0).toUpperCase() + notificationStatus.slice(1);
    tour.save();
    res.sendStatus(200);
  });
});

function getCallbackUri (req){
  var host = req.headers.host;
  return `http://${host}/tours/${req.params.tourId}/status/update`
};

module.exports = router;
