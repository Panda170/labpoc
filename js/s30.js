var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var users = [];  
var results = [];  
var isWinner = true;
var winner = "";
app.use(express.static("public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getResult', function (req, res) {
  res.send(results);
});

app.get('/getWinner', function (req, res) {
  res.send(winner);
});

app.post('/saludar', function (req, res) {
	var user = {"user":{
		"name": req.body.name,
          "ip":req.connection.remoteAddress
        }
    };
	users.push(user);
});

app.post('/minar', function (req, res) {
  var miner = {"rta":{
          "name": req.body.name,
          "fileSize":req.body.fileSize,
          "line":req.body.line,
          "time":req.body.time
      }
    };
    var comprof = req.body.iswin;
    if (isWinner && (comprof == "0")) {
      isWinner = false;
        winner = {
          "name": req.body.name,
          "fileSize":req.body.fileSize,
          "line":req.body.line,
          "time":req.body.time
        }
      };
  results.push(miner);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/', function (req, res) {
    res.render("index");
});


