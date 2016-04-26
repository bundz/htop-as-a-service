var express = require('express'),
    app = express(),
    shell = require('shelljs');


app.get('/', function (req, res) {
  
  if(!shell.which('top')) {
    res.status(401).send({error: true, message: "htop not found."})
  }

  var cpu = getCPUUsage();
  var mem = getMemUsage();

  res.status(200).send({cpu: cpu, memory: mem});

});

function getCPUUsage() {

  var result = shell.exec('top -bn2 | grep "Cpu(s)" | tail -n1');
  result = result.output.replace('%Cpu(s):', '');
  result = result.replace('\n', '');

  result = result.split(',');

  var cpu = {};
  var aux;


  result.forEach(function (item) {



    aux = item.split(' ');
    cpu[aux[aux.length - 1]] = aux[aux.length - 2];

  });

  cpu.total = 100 - cpu.id;

  return cpu;

}

function getMemUsage() {
  var output = shell.exec('free -m');

  var exp = /\d+/g;

  var values = output.output.match(exp);

  var mem = {};

  mem.total = values[0];
  mem.used = values[1];
  mem.free = values[2];
  mem.shared = values[3];
  mem.buffers = values[4];
  mem.cached = values[5];

  return mem;



}

module.exports = app;