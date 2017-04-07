var express = require('express'),
    app = express(),
    Analizejs = require('analizejs'),
    analize = new Analizejs();

app.get('/', function (req, res) {
  
  var cpu = analize.cpu();
  var mem = analize.memory();
  //var processes = getProcesses();

  res.status(200).send({cpu: cpu, memory: mem});

});

module.exports = app;