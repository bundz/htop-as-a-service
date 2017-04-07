var express = require('express'),
    app = express(),
    Analizejs = require('analizejs'),
    analize = new Analizejs();

app.get('/', function (req, res) {
  
  var mem = analize.memory();

  res.status(200).send(mem);

});

module.exports = app;