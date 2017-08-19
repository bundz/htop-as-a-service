let request = require('request');
let response;

console.log('[')

const getLog = function () {

    request({uri: 'http://localhost:3001/', json: true, method: 'GET'}, function (err, result) {

        const data = {};
        data.cpu = result.body.cpu;
        data.memory = result.body.memory;
        delete data.memory.hierarchy;
        data.date = Date.now();

        console.log(JSON.stringify(data) + ',');

    });


};

setInterval(getLog, 2000);

// async function getLog () {

//     return request('http://localhost:3001/').then(result => {

//         const data = {};
//         data.cpu = result.body.cpu;
//         data.memory = result.body.memory;
//         data.date = Date.now();

//         console.log(JSON.stringify(data) + ',') ;

//         return true;

//     });

// };

// var promise = await getLog();

// console.log(promise);
