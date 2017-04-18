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

        it('cpu should have urls property with self url', function () {

            expect(response.cpu).to.have.property('urls');
            expect(response.cpu.urls).to.have.property('self');
            expect(response.cpu.urls.self).to.be.equals('/cpu');

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

         it('each core should have an urls property with self', function () {

            response.cpu.cores.forEach(function (core) {
                expect(core).to.have.property('urls');
                expect(core.urls.self).to.be.equals('/cpu/' + core.id);
            });
            
        });

        it('should return memory usage average', function () {
            expect(response).to.have.property('memory');
        });

        it('memory should have urls property with self url', function () {

            expect(response.memory).to.have.property('urls');
            expect(response.memory.urls).to.have.property('self');
            expect(response.memory.urls.self).to.be.equals('/memory');

        });

        it("should have a urls property with self url", function () {

            expect(response).to.have.property('urls');
            expect(response.urls).to.have.property('self');
            expect(response.urls.self).to.be.equals('/');

        });
        
        it('should return a processes property', function () {
            
            expect(response).to.have.property('processes');
    
        });
        
        it('should return a property urls with self and prev', function () {
            
            expect(response.processes).to.have.property('urls');
            expect(response.processes.urls).to.have.property('self');
            
        });
        
        it('each process should have properties', function () {
            
            response.processes.list.forEach(function (item) {
                expect(item).to.have.property('user');
                expect(item).to.have.property('pid');
                expect(item).to.have.property('cpu');
                expect(item).to.have.property('mem');
                expect(item).to.have.property('vsz');
                expect(item).to.have.property('rss');
                expect(item).to.have.property('tty');
                expect(item).to.have.property('stat');
                expect(item).to.have.property('start');
                expect(item).to.have.property('time');
                expect(item).to.have.property('command');
            });
            
        });
        
        it('each process should have a urls property with self url', function () {
            
            response.processes.list.forEach(function (item) {
                expect(item).to.have.property('urls');
                expect(item.urls).to.have.property('self');
                expect(item.urls.self).to.be.equal('/process/' + item.pid);
            });
            
        });

    });
});