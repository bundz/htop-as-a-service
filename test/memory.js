var request = require('supertest');
var assert = require('assert');
var expect = require('chai').expect;
var app = require('../lib/app');

var response;


describe('Memory service', function () {
    context('when send a get to /memory', function () {


        it('should return 200', function () {

            request(app)
                .get('/memory')
                .expect(200)
                .end(function (err, res) {
                    response = res.body;
        
                    if(err) return done(err);

                    done();

                });

        });

        it('should return memory usage average', function () {
            expect(response).to.have.property('total');
            expect(response).to.have.property('used');
            expect(response).to.have.property('free');
            expect(response).to.have.property('shared');
            expect(response).to.have.property('buffers');
            expect(response).to.have.property('cached');
        });

        it('should return an urls property with self url and prev', function () {

            expect(response).to.have.property('urls');
            expect(response.urls).to.have.property('self');
            expect(response.urls.self).to.be.equals('/memory');
            expect(response.urls.prev).to.be.equals('/');

        });

    });
});