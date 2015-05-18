var expect = require('chai').expect;
var assert = require('chai').assert
var request = require("supertest");
var connect = require("../index.js");
var http = require('http');

var next = connect().next;

var m1 = function(next) {
	console.log('fun1....');
	next();
}

var m2 = function(next) {
	console.log('fun2....');
	next();
}

var m3 = function(next){
	return 3;
}


describe('Implement app.use', function(){

		var app = connect();
		it('should be able to add middlewares to stack', function(done){
			app.use(m1);
			assert.equal(app.handlerLength(), 1);
			app.use(m2);
			assert.equal(app.handlerLength(), 2);
			done();
		});
})


describe('calling middleware stack', function(){
	var app;
	beforeEach(function(){
		app = connect();
	});
	it('Should be able to call a single middleware:', function(done){
		app.use(m3);
		assert.equal(app.handlerLength(), 1);
		assert.equal(app.handle(), 404);
		done();
	})

	it('Should be able to call next to go to the next middleware', function(done){
		app.use(m1);
		app.use(m2);
		app.use(m3);
		assert.equal(app.handle(), 404);
		done();
	})

	it('Should 404 at the end of middleware chain', function(done){
		done();
	})

	it('Should 404 if no middleware is added', function(done){
		
		assert.equal(app.handle(), 404);
		done();
	})
})