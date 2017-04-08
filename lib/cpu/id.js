var express = require('express'),
    app = express(),
    Analizejs = require('analizejs'),
    analize = new Analizejs();

app.get('/:id', function (req, res) {
  
    var cpu = analize.cpu();

    var core = findCoreById(cpu.cores, req.params.id); 

    if(core){

        core.urls = { self: "/cpu/" + core.id, prev: "/cpu" };
        res.status(200).send(core);

    } else {

        res.status(400).send({error: true, msg: "Core not found."})

    }

});

function findCoreById(cores, id) {

    for(var i = 0; i < cores.length; i++) {

        if(cores[i].id == id) {

            return cores[i];

        }

    }

    return null;

}

module.exports = app;