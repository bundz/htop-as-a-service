var express = require('express'),
    app = express(),
    Analizejs = require('analizejs'),
    analize = new Analizejs();

app.get('/', function (req, res) {
  
    var cpu = analize.cpu();

    cpu.urls = { self: "/cpu" };

    cpu.cores.forEach(function (core) {

      core.urls = { self: "/cpu/" + core.id };

    });

    var mem = analize.memory();

    mem.urls = { self: "/memory" };

    //var processes = getProcesses();

    res.status(200).send({cpu: cpu, memory: mem, urls: { self: "/" }});

});

module.exports = app;