var express = require('express'),
    app = express(),
    Analizejs = require('analizejs'),
    analize = new Analizejs();

app.get('/', function (req, res) {
  
    var vms = analize.vms();

    res.status(200).send(vms);

});

module.exports = app;
