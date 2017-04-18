var request = require('supertest');
var assert = require('assert');
var expect = require('chai').expect;
var app = require('../lib/app');

describe('Process service', function () {
    context('when send a get to /process', function () {
        
        var response;

        it('should return 200', function () {

            request(app)
                .get('/process')
                .expect(200)
                .end(function (err, res) {
                    response = res.body;
                
                    if(err) return done(err);

                    done();

                });

        });

        it('should return a processes property', function () {
            
            expect(response).to.have.property('processes');
    
        });
        
        it('should return a property urls with self and prev', function () {
            
            expect(response).to.have.property('urls');
            expect(response.urls).to.have.property('self');
            expect(response.urls).to.have.property('prev');
            expect(response.urls.self).to.be.equal('/process');
            expect(response.urls.prev).to.be.equal('/');
            
        });
        
        it('each process should have properties', function () {
            
            response.processes.forEach(function (item) {
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
            
            response.processes.forEach(function (item) {
                expect(item).to.have.property('urls');
                expect(item.urls).to.have.property('self');
                expect(item.urls.self).to.be.equal('/process/' + item.pid);
            });
            
        });
        
    });
    
    context('when send a get to /process?sort=user', function () {
        
        var response;

        it('should return 200', function () {

            request(app)
                .get('/process?sort=user')
                .expect(200)
                .end(function (err, res) {
                    response = res.body;
        
                    if(err) return done(err);

                    done();

                });

        });
        
        it('should return a process property sorted by user', function () {
            
            expect(response).to.have.property('processes');
            
            var prev;
            
            response.processes.forEach(function (item) {
                
                if(prev) {
                    
                    expect(item.user >= prev.user).to.be.true;
                    
                }
                
                prev = item;
                
            });
            
        });
        
    });
    
    context('when send a get to /process?sort=cpu', function () {
        
        var response;

        it('should return 200', function () {

            request(app)
                .get('/process?sort=cpu')
                .expect(200)
                .end(function (err, res) {
                    response = res.body;
        
                    if(err) return done(err);

                    done();

                });

        });
        
        it('should return a process property sorted by cpu', function () {
            
            expect(response).to.have.property('processes');
            
            var prev;
            
            response.processes.forEach(function (item) {
                
                if(prev) {
                    
                    expect(parseInt(item.cpu) <= parseInt(prev.cpu)).to.be.true;
                    
                }
                
                prev = item;
                
            });
            
        });
        
    });
    
    context('when send a get to /process?sort=mem', function () {
        
        var response;

        it('should return 200', function () {

            request(app)
                .get('/process?sort=mem')
                .expect(200)
                .end(function (err, res) {
                    response = res.body;
        
                    if(err) return done(err);

                    done();

                });

        });
        
        it('should return a process property sorted by mem', function () {
            
            expect(response).to.have.property('processes');
            
            var prev;
            
            response.processes.forEach(function (item) {
                
                if(prev) {
                    
                    expect(parseInt(item.mem) <= parseInt(prev.mem)).to.be.true;
                    
                }
                
                prev = item;
                
            });
            
        });
        
    });
    
    context('when send a get to /process/1', function () {
        
        var response

        it('should return 200', function () {

            request(app)
                .get('/process/1')
                .expect(200)
                .end(function (err, res) {
                    response = res.body;
                      
                    if(err) return done(err);

                    done();

                });

        });
        
        it('should return a process with properties', function () {
            
            expect(response).to.have.property('user');
            expect(response).to.have.property('pid');
            expect(response).to.have.property('cpu');
            expect(response).to.have.property('mem');
            expect(response).to.have.property('vsz');
            expect(response).to.have.property('rss');
            expect(response).to.have.property('tty');
            expect(response).to.have.property('stat');
            expect(response).to.have.property('start');
            expect(response).to.have.property('time');
            expect(response).to.have.property('command');
            
        });
        
    });
    
});