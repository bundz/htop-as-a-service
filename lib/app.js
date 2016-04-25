var express = require('express');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, admin, player");
    res.header("Acess-Control-Allow-Methods","GET, PUT, POST, DELETE, OPTIONS");
    next();
});

app.use('/', require("./main"));

module.exports = app;