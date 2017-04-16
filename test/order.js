// require('./connectionHelper');
// var expect = require('chai').expect;
// var supertest = require('supertest');
// var app = require('../app.js');
// var tour = require('../models/tour');
// var agent = supertest(app);
//
// describe('tour', function () {
//
//   var tour = {};
//
//   beforeEach(function(done) {
//     tour.collection.remove();
//     var tours = [
//       { customerName: 'Vincent Vega',   customerPhoneNumber: '+17654532001',  status : 'Ready', notificationStatus : 'None' },
//       { customerName: 'Mia Wallace',   customerPhoneNumber: '+17654532002' , status : 'Ready', notificationStatus : 'None'  },
//     ];
//     tour.collection.insert(tours);
//     tour.findOne().then(function(ord){ tour = ord;done();});
//   });
//
//   describe('GET /tour', function () {
//     it('list all tours', function (done) {
//       agent
//         .get('/tours')
//         .expect(function (response) {
//           expect(response.text).to.contain('Vincent Vega');
//           expect(response.text).to.contain('Mia Wallace');
//         })
//         .expect(200, done);
//     });
//   });
//
//   describe('GET to /tours/:tourId/show', function () {
//     it('shows an tour detail', function (done) {
//       agent
//         .get(`/tours/${tour.id}/show`)
//         .expect(function (response) {
//           expect(response.text).to.contain(tour.customerName);
//           expect(response.text).to.contain(tour.status);
//           expect(response.text).to.contain(tour.notificationStatus);
//         })
//         .expect(200, done);
//     });
//   });
//
//   describe('POST /tours/:tourId/pickup', function () {
//     it('changes the status of an tour to Shipped', function (done) {
//       agent
//         .post(`/tours/${tour.id}/pickup`)
//         .expect(function(response) {
//           tour.findOne({_id: tour.id})
//             .then(function (tour) {
//               expect(tour.status).to.contain('Shipped');
//             });
//         })
//         .expect(302, done);
//     });
//   });
//
//   describe('POST /tours/:tourId/deliver', function () {
//     it('changes the status of an tour to Delivered', function (done) {
//       agent
//         .post(`/tours/${tour.id}/deliver`)
//         .expect(function(response) {
//           tour.findOne({_id: tour.id})
//             .then(function (tour) {
//               expect(tour.status).to.contain('Delivered');
//             });
//         })
//         .expect(302, done);
//     });
//   });
//
//   describe('POST /tours/:tourId/status/update', function () {
//     it('changes the notification status of an tour to Sent(capitalized)', function (done) {
//       agent
//         .post(`/tours/${tour.id}/status/update`)
//         .type('form')
//         .send({
//           MessageStatus: 'sent',
//         })
//         .expect(function(response) {
//           tour.findOne({_id: tour.id})
//             .then(function (tour) {
//               expect(tour.notificationStatus).to.contain('Sent');
//             });
//         })
//         .expect(200, done);
//     });
//   });
// });
