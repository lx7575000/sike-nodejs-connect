var http = require('http');
module.exports = connect;


function connect(){
	// console.log('use connect ');
	var app = {};
	app.stack = [];
	app.index = 0;

	app.length = function(){
		console.log('LENGTH  IS ' + this.stack.length);
		return this.stack.length;
	}

	app.use = function(fn){
		if('function' === typeof fn){
			// console.log('app.use');
			this.stack.push(fn);
		}

		return app;
	}

	app.handlerLength = function(){
		// console.log('length : ' + this.stack.length);
		return this.stack.length;
	}

	app.listen = function(){
		var server = http.createServer(this);
		return server.listen.apply(server, arguments);
	}


	app.handle = function(req, res){
		var stack = this.stack;
		if(stack.length === 0){
			
			return 404;
		}
		
		this.next();
		if(stack.length === app.index)
		{
			return 404;
		}
		else{
			return stack.length;
		}
	}

	app.next = function(){
		if(this.index >= app.stack.length){
			return ;
		}
		var fn = app.stack[app.index];
		if(fn === undefined){
			return ;
		}
		app.index ++;
		fn(app.next);
	}
	return app;
}
