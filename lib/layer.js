module.exports = Layer;
var pathToRegexp = require('path-to-regexp');


function Layer(route, fn){

	/*
		var names = [];
		var re = p2re(this.path, names, {end: false});
		//将this.path的内容解析到names中存放
		var res = re.test(route);

		if(this.path === route){				
				return {path : this.path};
			}else if(route.substr(0, this.path.length) === this.path){

				return {path : this.path};
			}else{

				return undefined;
			}
		}	

		//上一个版本的
	*/


	this.handle = fn;
	this.path = route;
	var pretreatment = route.split('/');
	this.argv = [];
	this.argc = 0;
	for(var i = 1; i < pretreatment.length; i++){
		if(pretreatment[i][0] == ':'){
			this.argc ++;
			this.argv.push(pretreatment[i].slice(1));
		}
	}

	this.match = function(router){
		var route = decodeURIComponent(router);
		var keys = [];
		var re = pathToRegexp(this.path, keys, {end: false});
		if(!re.test(route))
		{
			return undefined;
		}else{
			var res = re.exec(route);
			var obj = {path: null, params: {}};
			obj.path = res[0];
			for(var i = 0; i < this.argv.length; i++){
				 obj.params[this.argv[i]] = res[i+1];
			}
			return obj;
		}
	}
};