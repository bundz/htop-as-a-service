var hwloc = require('node-hwloc');

var set = function () {
	global.cache = 'oi';
	global.cache = {};
	global.cache.memory = {};

	var setMemoryHierarchy = function () {
		var options = {};
		options['output-format'] = 'xml';
		options['verbose'] = false;

		hwloc.ls(options).then(function (output){

			global.cache.memory.hierarchy = output;

		}).catch(function (err) {

			global.cache.memory.hierarchy = {error: err};

		});

	};

	setMemoryHierarchy();
 	
};

module.exports = {
	set: set
};