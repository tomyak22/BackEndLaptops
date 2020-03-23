var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const team = require('../modules/team');
const url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// can process any existing query paramters (e.g.:?firstname=John)
router.get('/team', (request, response, next) => {

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

module.exports = router;
