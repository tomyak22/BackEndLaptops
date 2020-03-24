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

router.post('/laptops/add', function (request, response) {
  console.log(request.body);      // your JSON

  

  fs.readFile('./data/laptops.json', function (err, data) {
    var object = request.body;
    var json = JSON.parse(data);
    json.push(object);

    console.log("object = " + object);

    fs.writeFile('./data/laptops.json', JSON.stringify(json), function (err) {
      if (err) return console.log(err);
    });
  });

  //var fileContentsObject = JSON.parse('./data/laptops.json');
  //console.log(fileContentsObject);

  //var fileContents = fs.readFileSync('./data/laptops.json');
  // fileContents = JSON.parse(fileContents);

  // fileContents = JSON.stringify(fileContents);


  // fileContents += object;

  // fs.writeFile('./data/laptops.json', fileContents, function (err) {
  //     if (err) return console.log(err); 
  // });

  // console.log(fileContents);
  // fs.readFile('./data/laptops.json', function (err, object) {
  //   console.log("Reading JSON");
  //   var json = JSON.parse(object);
  //   json.push(object);

  //   fs.writeFile('./data/laptops.json', JSON.stringify(json))
  // })

  //var obj = read_json_file();
  // console.log('json read file produces: ' + obj);
  //obj.push(request.body);
  //console.log(obj);
  //  var json = JSON.stringify(request.body);
  //json.concat(obj)
  //fs.writeFile('./data/laptops.json', obj, function (err) {
  //  if (err) return console.log(err);
  //});

  response.send("Success!");    // echo the result back
});

// router.post('/laptops/add', function (request, response) {
//   console.log('got into add');
//   console.log('request body: ' + request.body);
//   fs.readFile('./data/laptops.json', 'utf8', function readFileCallback(err, data){
//     if (err){
//         console.log(err);
//     } else {
//     obj = JSON.parse(data); //now it an object
//     obj.push(request.body); //add some data
//     json = JSON.stringify(obj); //convert it back to json
//     fs.writeFile('./data/laptops.json', json, 'utf8'); // write it back 
// }});
// });

module.exports = router;