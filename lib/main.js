var express = require('express'),
    app = express(),
    shell = require('shelljs'),
    Analizejs = require('analizejs'),
    analize = new Analizejs();


app.get('/', function (req, res) {
  
  if(!shell.which('top')) {
    res.status(401).send({error: true, message: "top not found."})
  }

  if(!shell.which('mpstat')) {
    res.status(401).send({error: true, message: "mpstat not found."})
  }

  var cpu = analize.cpu();
  var mem = analize.memory();
  //var processes = getProcesses();

  res.status(200).send({cpu: cpu, memory: mem});

});

function getCPUUsage() {

  var result = shell.exec('mpstat -P ALL | tail -n +4', {silent: true});

  result = result.output.replace(/  +/g, ' ');
  result = result.slice(0, -1);
  result = result.split('\n');

  var cpu = {};
  var aux;

  result.forEach(function (line) {

    aux = line.split(' ');
    var core = {};

    core.usr = aux[3];
    core.nice = aux[4];
    core.sys = aux[5];
    core.iowait = aux[6];
    core.irq = aux[7];
    core.soft = aux[8];
    core.steal = aux[9];
    core.guest = aux[10];
    core.gnice = aux[11];
    core.idle = aux[12];

    if(aux[2] == 'all') {

      cpu = core;
      cpu.cores = [];

    } else {

      core.id = aux[2];
      cpu.cores.push(core);

    }

  });

  return cpu;

}

function getMemUsage() {
  var output = shell.exec('free -m', {silent: true});

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