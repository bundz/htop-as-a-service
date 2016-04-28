var express = require('express'),
    app = express(),
    shell = require('shelljs');


app.get('/', function (req, res) {
  
  if(!shell.which('virt-top')) {
    res.status(401).send({error: true, message: "virt-top not found."})
  }

  var output = shell.exec("virt-top -n 4 -d 4 -b"); 

  console.log(output);

  res.status(200).send({cpu: cpu, memory: mem});

});


module.exports = app;