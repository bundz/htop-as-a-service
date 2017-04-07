var request = require('supertest');
var assert = require('assert');
var expect = require('chai').expect;
var app = require('../lib/app');

var response;


describe('cpu service', function () {
    context('when send a get to /cpu', function () {


        it('should return 200', function () {

            request(app)
                .get('/cpu')
                .expect(200)
                .end(function (err, res) {
                    response = res.body;
        
                    if(err) return done(err);

                    done();

                });

        });

        it('should return cpu usage average', function () {
            expect(response).to.have.property('usr');
            expect(response).to.have.property('nice');
            expect(response).to.have.property('sys');
            expect(response).to.have.property('iowait');
            expect(response).to.have.property('irq');
            expect(response).to.have.property('soft');
            expect(response).to.have.property('steal');
            expect(response).to.have.property('guest');
            expect(response).to.have.property('gnice');
            expect(response).to.have.property('idle');
            expect(response).to.have.property('cores');

        });

        it('each core should returns the properties too', function () {
            response.cores.forEach(function (core) {

            expect(core).to.have.property('id');
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

    });
});