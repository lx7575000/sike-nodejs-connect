// module.exports = Layer;
var pathToRegexp = require('path-to-regexp');


function Layer(route, fn){
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

	this.match = function(route){
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

var lay = new Layer('/foo/:a/:b', function(){

});

var r = lay.match('/foo/liu/li/l/iii');
console.log(r);

console.log('res : ' + lay.match('/foo/liu/li/l/iii'));
console.log('res : ' + lay.match('/foo/liu/'));
console.log('res : ' + lay.match('/foo/'));