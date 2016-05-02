var express = require('express'),
    app = express(),
    shell = require('shelljs');


app.get('/', function (req, res) {
  
  if(!shell.which('virt-top')) {
    res.status(401).send({error: true, message: "virt-top not found."})
  }

  var output = shell.exec('virt-top -n 2 --stream | grep "instance"'); 

  var lines = output.output.split("\n");

  res.status(200).send({cpu: lines});

});


module.exports = app;