module.exports = myexpress;
var http = require('http');

function myexpress(){

	//app()就是按顺序执行app.stack当中的各项中间件
	var app = function(req, res, next){
		app.handle(req, res, next);
	};

	app.handle = function(req, res, next){
		var handle = app;

		var middleware_index = 0;
		(function next(err){
			if(hasAnyMiddlewareToExcute()){
				try{
					callMiddleWare();
				}catch(e){
					endWithStatusCode(500);
				}
			}else if(handle.isMiddleWare){
				next(err);
			}else{
				if(err){
					endWithStatusCode(501);
				}else{
					endWithStatusCode(404);
				}
			}

		// for(var i = 0; i < app.stack.length; i++){
		// 	var fn = app.stack[i];
		// 	fn(req, res, next);
		// }

			//通过middleware_index来判断是否已经执行到最后的位置
			function hasAnyMiddlewareToExcute () {
				// console.log('hasAnyMiddlewareToExcute');
				return middleware_index < handle.stack.length;
			}

			function endWithStatusCode(num){
				// console.log('endWithStatusCode : ' + num);
				res.statusCode = num;
				res.end();
			}

			//根据各个中间件的情况不同来进行不同的处理
			function callMiddleWare(){
				var current_layer = handle.stack[middleware_index];
				// console.log('callMiddleWare');
				var arity = current_layer.handle.length;// 错误！！！

				if(err && arity === 4){
					// console.log('4 parameter');
					//判断当前的函数是否传入四个参数，产生错误，且是否与路径匹配。符合参数四个的要求。
					middleware_index ++;
					current_layer.handle.call(this, err, req, res, next);
				}else if(!err && arity < 4){
					//没出错，且传入的是三个参数。刚好符合传入三个参数的要求。
					// console.log('3 parameters');
					middleware_index ++;
					current_layer.handle.call(this, req, res, next);
				}else{
					// console.log('next error');
					middleware_index ++;
					next(err);
				}
			}
		})();
	};

	app.listen = function(port){
		var server = http.createServer(app);
		server.listen(port);
		return server;
	}

	app.stack = [];
	app.isMiddleware = false;

	app.use = function(route, fn){
		if(! fn){
			var middleware = route;
			var path = '/';
		}else{
			path = route;
			middleware = fn;
		}
		// app.stack.push({'route' : path, 'middleware' : middleware});
		app.stack.push({route : path, handle : middleware});
		if(middleware.isMiddleWare  != undefined){
			middleware.isMiddleWare = true;
		}
		// console.log('In app.use , the stack length of app is ' + app.stack.length);
		return app;
	};

	return app;
}