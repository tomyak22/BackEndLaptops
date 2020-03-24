var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const team = require('../modules/team');
const laptops = require('../modules/laptops');
const url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// can process any existing query paramters (e.g.:?firstname=John)
router.get('/laptops/team', (request, response, next) => {

  let get_params = url.parse(request.url, true).query;
  console.log('got into team');

  if (Object.keys(get_params).length == 0) {
    console.log('no params');
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(team.list()));
  } else {
    next(createError(404));
  }
});

// example for using path variable
router.get('/laptops/all/:location', (request, response, next) => {
  const param = request.params.location.toLowerCase();
  console.log('got into /laptops/all/:location ' + param);
  var tax_rate = 0;

  if (param === 'durham') {
    writeHeaders(0.08);
  } else if (param === 'raleigh') {
    writeHeaders(0.075);
  } else {
    next(createError(404));
  }

  function writeHeaders(tax_rate) {
    const result = laptops.calculate_price(tax_rate);
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  }
  
});

module.exports = router;