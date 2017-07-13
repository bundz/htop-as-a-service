var express = require('express');
var app = express();
var cache = require('../config/cache');

cache.set(app);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, admin, player");
    res.header("Acess-Control-Allow-Methods","GET, PUT, POST, DELETE, OPTIONS");
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

app.use('/', require("./main"));
app.use('/virt-top', require("./virt-top"));
app.use('/memory', require("./memory"));
app.use('/memory/hierarchy', require('./memory/hierarchy'));
app.use('/cpu', require("./cpu/id"));
app.use('/cpu', require("./cpu"));
app.use('/process', require("./process/id"));
app.use('/process', require("./process"));

module.exports = app;