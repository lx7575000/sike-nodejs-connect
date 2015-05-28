module.exports = Layer;
// module.exports = Layer;
var pathToRegexp = require('path-to-regexp');


function Layer(route, fn){
	this.path = route;
	this.handle = fn;

	this.match = function(route){

		// var names = [];
		// var re = p2re(this.path, names, {end: false});
		// /*将this.path的内容解析到names中存放*/
		// var res = re.test(route);

		// if(this.path === route){				
		// 		return {path : this.path};
		// 	}else if(route.substr(0, this.path.length) === this.path){

		// 		return {path : this.path};
		// 	}else{

		// 		return undefined;
		// 	}
		// }	

		/*上一个版本的*/

		this.match = function(route){
		var keys = [];
		var re = pathToRegexp(this.path, keys, {end: false});
		return re.exec(route);
	}


};