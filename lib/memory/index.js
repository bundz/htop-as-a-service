var express = require('express'),
    app = express(),
    Analizejs = require('analizejs'),
    analize = new Analizejs();

app.get('/', function (req, res) {
  
  var mem = analize.memory();

  mem.urls = { self: "/memory", prev: "/" };

  res.status(200).send(mem);

});

module.exports = app;