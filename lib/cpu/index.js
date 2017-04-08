var express = require('express'),
    app = express(),
    Analizejs = require('analizejs'),
    analize = new Analizejs();

app.get('/', function (req, res) {
  
  var cpu = analize.cpu();

  cpu.urls = { self: "/cpu", prev: "/" };
  cpu.cores.forEach(function (core) {

  	core.urls = { self: "/cpu/" + core.id };

  });

  res.status(200).send(cpu);

});

module.exports = app;