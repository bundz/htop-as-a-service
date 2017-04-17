var express = require('express'),
    app = express(),
    Processjs = require('processjs'),
    process = new Processjs();

app.get('/:id', function (req, res) {
  
    var result = process.getById(req.params.id);
    
    if(result) {
        
        result.urls = { self: '/process/' + req.params.id, prev: '/process' };
        res.status(200).send(result);
        
    } else {
        
        res.status(400).send({ error: true, msg: 'Process not found' });
        
    }

});

module.exports = app;