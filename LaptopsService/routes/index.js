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

// can process any existing query paramters (e.g.:?firstname=John)
router.get('/laptops/all', (request, response, next) => {

  let get_params = url.parse(request.url, true).query;
  console.log('got into laptops');

  if (Object.keys(get_params).length == 0) {
    console.log('no params');
    next(createError(404));
    // response.setHeader('content-type', 'application/json');
    // response.end(JSON.stringify(contacts.list()));
  } else {
    let key = Object.keys(get_params)[0]; // get first parameter only
    console.log("First key is: " + key);
    let value = request.query[key];
    console.log('params ' + value);
    let result = contacts.query_by_arg(key, value);
    if (result) {
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify(result));
    } else {
      next(createError(404));
    }
  }
});

// example for using path variable
router.get('/laptops/all/:location', (request, response, next) => {
  let locations = ["Raleigh", "Durham"];
  const param = request.params.location;
  console.log('got into /laptops/all/:location ' + param);

  const result = laptops.query_by_arg(
    "location", param);
  if (locations.contains(param)) {
    response.setHeader('content-type', 'application/json');
    response.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
});

module.exports = router;
