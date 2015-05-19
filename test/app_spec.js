var should = require('chai').should();
var request = require('supertest');
var http = require('http');
var express = require('../index.js');


describe('.use()', function(){
	var app ;
	beforeEach(function(done){
		app = express();
		done();
	});

	it('should add one middleware into the app.stack', function(done){
		var m1 = function(){};
		app.use(m1);
		app.stack.length.should.equal(1);
		done();
	});
	it ("should be able to call a single middleware", function (done) {
      app.use(function (req, res, next) {
      	console.log('gagagag');
        res.end("hello from m1");
        next()
      });
      request(app).get("/").expect("hello from m1").end(done);
    });

        it ("should be able to call 2 middlewares", function (done) {
      var result = [];
      var m1 = function (req, res, next) { result.push("m1"); next(); };
      var m2 = function (req, res, next) { 
        result.push("m2"); 
        res.end("hello from m2"); 
      };

      app.use(m1);
      app.use(m2);

      request(app).get("/").expect("hello from m2").end(function (err) {
        result.should.deep.equal(['m1', 'm2']);
        done(err);
      });
    });

     it ("should respond to 404 when all middlewares in stack has been called ", function (done) {
      var m1 = function (req, res, next) { next(); };
      var m2 = function (req, res, next) { next(); };
      app.use(m1).use(m2);
      request(app).get("/").expect(404, done);
    });

      it ("should respond to 404 when middlewares's stack is empty", function (done) {
      request(app).get("/").expect(404, done);
    });
});