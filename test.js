// // var express = require('express');
// // var app = express();

// // app.use(function( req, res, next){
// // 		var err = new Error('is a error');
// // 		console.log('Sorry has some troubles');
// // 		res.end('Trouble Trouble ....');
// // 		next(err);
// // 	})
// // 	.use(function (req, res, next) {
// // 		res.end('Hello from the second middleware');
// // 		next();
// // 	})
// // 	.use(function(err, req, res, next){
// // 		console.log('handler error first');
// // 		next(err);
// // 	})
// // 	.use(function(err, req, res, next){
// // 		console.log('handler the error');
// // 		res.end('Hou Hou Hou');
// // 	})
// // 	.listen(4000);



// // next实现
function m1 (next) {
	console.log('m1');
	next();
}

function m2 (next) {
	console.log('m2');
	next();
}

var stack = [m1, m2];
var i = 0;

function next () {
	var m = stack[i];
	if(m === undefined){
		return ;
	}
	i++;
	m(next);
}

next();




// // connect use()方法的基本实现思路
// module.exports = connect;

// function connect(){
// 	var app = {};
// 	app.fun_num = 0;
// 	app.fun_loc = 0;
// 	app.stack = [];
// 	app.use = function(fn){
// 		this.stack.push(fn);
// 		this.fun_num ++;
// 	}

// 	return app;
// }

// var http = function(){
// 	var obj = {};

// 	obj.createServer = function(fn){
// 		var len = fn.fun_num;
// 		var loc = fn.fun_loc;
// 		// console.log('len : ' + len + ' loc : ' + loc);

// 		for(var i = 0; i < len; i++){
// 			fn.stack[i]();
// 		}

// 	}
// 	return obj;
// }

// var m1 = function  () {
// 	console.log('fun1....');
// }

// var m2 = function  () {
// 	console.log('fun2....');
// }

// var express = connect();
// var server = http();
// console.log('num of fun in express = ' + express.fun_num);

// express.use(m1);
// express.use(m2);

// console.log('num of fun in express = ' + express.fun_num);

// console.log("Let's begin ....");
// server.createServer(express);

// var connect = require('./index.js');

// var app = connect();
// app.use(function(){
// 	console.log('Hello this is the first time , that I use app.use');
// });

// app.use(function(){
// 	console.log('Hello this is the twice time , that I use app.use');
// });