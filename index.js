require('marko/node-require').install();
var express = require('express');
var app = express();
var moment = require('moment');

var Sequelize = require('sequelize');
var _ = require('lodash');


var sequelize = new Sequelize('myflights', 'doesn\'', 'matter', {
  dialect: 'sqlite',
  storage: './flights.sqlite'
});

var Flight = sequelize.define('flight', {
  from: Sequelize.STRING,
  to: Sequelize.STRING,
  distance: Sequelize.INTEGER,
  date: Sequelize.INTEGER 
});

app.use(express.static('static'));

app.get('/', function(req, res) {
  var home = require('./templates/home.marko');
  var totalMiles = 0;

  Flight.all().then(function(flights) {
    flights = _.map(flights, function(flight) {
      totalMiles += flight.distance;
      return {from: flight.from, to: flight.to, distance: flight.distance, date: moment.unix(flight.date).calendar()};
    }); 

    home.render({totalMiles: totalMiles, flights: flights}, function(err, output) {
      res.send(output);
    });
  });

});

app.listen(3000, function () {
  sequelize.sync().then(function() {
    console.log("Ready for stuffs!!!"); 
  });
});
