var express = require('express'),
    app = express(),
    Processjs = require('processjs'),
    process = new Processjs();

app.get('/', function (req, res) {
  
var processes;
    
    if(req.query && req.query.sort) {
        processes = process.get(req.query.sort);
    } else {
        processes = process.get();
    }
    
    processes.forEach(function (item) {
        
        item.urls = { self: '/process/' + item.pid };
        
    });
    
    var response = { processes: processes, urls: { self: '/process', prev: '/' } };
    
    res.status(200).send(response);

});

module.exports = app;