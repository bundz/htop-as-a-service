var request = require('supertest');
var assert = require('assert');
var expect = require('chai').expect;
var app = require('../lib/app');

var response;


describe('Root service', function () {
	context('when send a get to /', function () {


		it('should return 200', function () {

			request(app)
				.get('/')
				.expect(200)
				.end(function (err, res) {
					response = res.body;
		
					if(err) return done(err);

					done();

				});

		});

		it('should return cpu usage average', function () {
			expect(response).to.have.property('cpu');
			expect(response.cpu).to.have.property('usr');
			expect(response.cpu).to.have.property('nice');
			expect(response.cpu).to.have.property('sys');
			expect(response.cpu).to.have.property('iowait');
			expect(response.cpu).to.have.property('irq');
			expect(response.cpu).to.have.property('soft');
			expect(response.cpu).to.have.property('steal');
			expect(response.cpu).to.have.property('guest');
			expect(response.cpu).to.have.property('gnice');
			expect(response.cpu).to.have.property('idle');

		});

		it('should return cores usage average', function () {
			
			expect(response.cpu.cores).to.have.length.above(0);

			response.cpu.cores.forEach(function (core) {

				expect(core).to.have.property('usr');
				expect(core).to.have.property('nice');
				expect(core).to.have.property('sys');
				expect(core).to.have.property('iowait');
				expect(core).to.have.property('irq');
				expect(core).to.have.property('soft');
				expect(core).to.have.property('steal');
				expect(core).to.have.property('guest');
				expect(core).to.have.property('gnice');
				expect(core).to.have.property('idle');

			});

		});

		it('should return memory usage average', function () {
			expect(response).to.have.property('memory');
		});

	});
});