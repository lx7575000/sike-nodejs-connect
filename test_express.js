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

var Layer = require('./lib/layer.js');

var layer = new Layer('/foo', function(){});

var c = layer.match('/');
console.log(c);