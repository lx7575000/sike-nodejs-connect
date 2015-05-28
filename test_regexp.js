var pathToRegexp = require('path-to-regexp');


function Layer(route, fn){
	this.handle = fn;
	this.path = route;

	this.match = function(route){
		var keys = [];
		var re = pathToRegexp(this.path, keys, {end: false});
		return re.exec(route);
	}
};
