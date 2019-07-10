var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
app.use(express.static("public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', function (req, res) {
  res.send('said: Hello World!');
});

app.post('/saludar', function (req, res) {
  console.log(req.body);
  res.send("ok");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/', function (req, res) {
    res.render("index");
});


