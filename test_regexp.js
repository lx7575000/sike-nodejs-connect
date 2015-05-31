// var pathToRegexp = require('path-to-regexp');

// var Layer = require('./lib/layer.js');

// var layer = new Layer('/foo/:a/:b', function(){
// 	console.log('Hello World');
// });

// var r = layer.match('/foo/liu/aaaaa');
// console.log(r);

var test1="http://www.w3school.com.cn/My first/"
var test2="/foo/apple/xiao mi"
console.log(encodeURIComponent(test1));
console.log(decodeURIComponent(test2));