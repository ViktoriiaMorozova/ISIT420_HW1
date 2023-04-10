let x = 2;
var express = require('express');
var router = express.Router();
var fs = require("fs");

var orders = []

fileManager  = {

  read: function() {
    const stat = fs.statSync('ordersData.json');
    if (stat.size !== 0) {                           
      const rawdata = fs.readFileSync('ordersData.json');
      orders = JSON.parse(rawdata);
    }
  },
  
  write: function() {
    let data = JSON.stringify(orders);
    fs.writeFileSync('ordersData.json', data);
  },
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/* Print posted Order to console */
router.post('/PrintOrder', function(req, res) {
  const newOrder = req.body;
  console.log(newOrder);
  var response = {
    status  : 200,
    success : 'Printed Successfully'
  }
  res.end(JSON.stringify(response));
});

/* Add one new Order */
router.post('/AddOrder', function(req, res) {
  const newOrder = req.body;
  console.log(newOrder);
  orders.push(newOrder);
  fileManager.write();
  var response = {
    status  : 200,
    success : 'Added Successfully'
  }
  res.end(JSON.stringify(response));
});

module.exports = router;
