// Global variables for route functions
var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const team = require('../modules/team');
const laptops = require('../modules/laptops');
const url = require('url');
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// GETS complete list of team members
router.get('/laptops/team', (request, response, next) => {

  let get_params = url.parse(request.url, true).query;
  console.log('got into team');

  // Confirm that there are no arguments in the request query
  if (Object.keys(get_params).length == 0) {
    console.log('no params');
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(team.list()));
  } else {
    next(createError(404));
  }
});

// GET all laptops based off location. Specifically, location is either Durham
// or Raliegh, else, return a 404 error.
router.get('/laptops/all/:location', (request, response, next) => {
  const param = request.params.location.toLowerCase();
  console.log('got into /laptops/all/:location ' + param);

  if (param === 'durham') {
    writeHeaders(0.08);
  } else if (param === 'raleigh') {
    writeHeaders(0.075);
  } else {
    next(createError(404));
  }

  // Calculate Tax Rate based off location
  function writeHeaders(tax_rate) {
    const result = laptops.calculate_price(tax_rate);
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  }

});

// POST request to add a laptop to laptops.json
router.post('/laptops/add', function (request, response) {
  console.log('in add');
  
  // Read in all data from laptops.json so we can add the new laptop
  fs.readFile('./data/laptops.json', function (err, data) {
    var object = request.body;
    object = JSON.stringify(object);
    object = JSON.parse(object);
    var json = JSON.parse(data);
    json.push(object);

    // Write in all data plus the new laptop back to laptops.json
    fs.writeFile('./data/laptops.json', JSON.stringify(json), function (err) {
      if (err) return console.log(err);
    });
  });
  
  response.send("Success!");
});

module.exports = router;