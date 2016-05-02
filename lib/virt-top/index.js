var express = require('express'),
    app = express(),
    shell = require('shelljs');


app.get('/', function (req, res) {
  
  if(!shell.which('virt-top')) {
    res.status(401).send({error: true, message: "virt-top not found."})
  }

  var output = shell.exec('virt-top -n 2 --stream | grep "instance"'); 

  var lines = output.output.trim().split("\n");

  var result = [];

  lines.forEach(function (line) {

    
    result.push(getInstance(line));
    

  });

  res.status(200).send(result);

});

function getInstance(line) {

  var i = line.length

  var obj = {};

  var elementsGot = 1;

  while(elementsGot < 4 || i > -1) {

    if(line[i]) {

      elementsGot++;

      switch (elementsGot) {

        case 1:
          obj.name = line[i];
          break;

        case 2:
          obj.time = line[i];
          break;

        case 3:
          obj.memory = line[i];
          break;

        case 4:
          obj.cpu = line[i];
          break;

        default:
          break;

      }

    }


    i--;
    
  }

  return obj;

}


module.exports = app;