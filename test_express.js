// var express = require('express');

// var app = express();

// app.use(function(req, res, next){
// 	var error = new Error('an error');
// 	next(error);
// });

// app.use(function(req, res, next){
// 	console.log('Fun 1, jump to Fun 2');
// 	next();
// });

// app.use(function(req, res){
// 	console.log('Fun 2 ');
// });

// app.listen(4000);

var myexpress = require('./index.js');

var app = myexpress();

var m1 = function(a, b ,c){
	console.log('Hello');
	res.end('hhhhhhhh');
}

console.log('length ' + m1.length);
app.use(m1);
app.listen(4000);

console.log('length of stack is ' + app.stack.length);