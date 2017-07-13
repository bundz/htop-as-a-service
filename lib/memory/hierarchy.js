var express = require('express'),
    app = express();

app.get('/', function (req, res) {

	if(global.cache) {

		return res.status(200).send(global.cache.memory.hierarchy);

	}

  res.status(200).send({});

});

module.exports = app;