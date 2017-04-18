var request = require('supertest');
var assert = require('assert');
var expect = require('chai').expect;
var app = require('../lib/app');

describe('Cpu service', function () {
    context('when send a get to /cpu', function () {

        var response;

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

        it('should have an urls property with self and prev url', function () {

            expect(response).to.have.property('urls');
            expect(response.urls).to.have.property('self');
            expect(response.urls.self).to.be.equals('/cpu');
            expect(response.urls.prev).to.be.equals('/');

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

        it('each core should have an urls property with self', function () {


            response.cores.forEach(function (core) {
                expect(core).to.have.property('urls');
                expect(core.urls.self).to.be.equals('/cpu/' + core.id);
            });

        });

    context('when send a get to /cpu/1', function () {

        var response;

        it('should return status 200', function () {

            request(app)
                .get('/cpu/0')
                .expect(200)
                .end(function (err, res) {
                    response = res.body;
                
                    if(err) return done(err);

                    done();

                });

        });

        it('should return core 0 properties', function() {
            expect(response).to.have.property('id');
            expect(response.id).to.be.equals('0');
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
        });

        it('should have an urls property with self and prev', function () {

            expect(response).to.have.property('urls');
            expect(response.urls).to.have.property('self');
            expect(response.urls).to.have.property('prev');
            expect(response.urls.self).to.be.equals('/cpu/0');
            expect(response.urls.prev).to.be.equals('/cpu');

        });

    });

    context('when send a get to /cpu with a out of range core id', function () {
        var response;


        it('should return status 400', function () {

            request(app)
                .get('/cpu/100000')
                .expect(400)
                .end(function (err, res) {
                    response = res.body;

                    if(err) return done(err);

                    done();

                });

        });


    });

    });
});