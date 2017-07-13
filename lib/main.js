var express = require('express'),
    app = express(),
    Analizejs = require('analizejs'),
    Processjs = require('processjs'),
    analize = new Analizejs(),
    process = new Processjs();
    

app.get('/', function (req, res) {
  
    var cpu = analize.cpu();

    cpu.urls = { self: "/cpu" };

    cpu.cores.forEach(function (core) {

      core.urls = { self: "/cpu/" + core.id };

    });

    var mem = analize.memory();

    mem.urls = { self: "/memory" };

    if(global.cache.memory.hierarchy) {
        mem.hierarchy = global.cache.memory.hierarchy;
    }

    var processes = {};
    processes.list = process.get();
    processes.urls = { self: '/process' };
    
    processes.list.forEach(function (item) {
        
        item.urls = { self: '/process/' + item.pid };
        
    });
    

    res.status(200).send({cpu: cpu, memory: mem, processes: processes, urls: { self: "/" }});

});

module.exports = app;