var express = require('express'),
    app = express(),
    Analizejs = require('analizejs'),
    analize = new Analizejs();

app.get('/', function (req, res) {
  
  var cpu = analize.cpu();

  res.status(200).send(cpu);

});

module.exports = app;