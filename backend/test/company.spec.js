process.env.NODE_ENV = 'test';

var jwt = require('jsonwebtoken');
var constant = require('../utils/globals');
var commonUtils = require('../utils/common');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var userModel = require('../models/users.model');
var knex = require('../config/db');

var should = chai.should();

chai.use(chaiHttp);

describe('API Routes', function () {
  // prepare bearer token
  const loggedUser = { username: 'user001' };
  const token = jwt.sign(commonUtils.parse2PlainObject(loggedUser), constant.SECRET_KEYS);

  beforeEach(function (done) {
    knex.migrate.rollback()
      .then(function () {
        knex.migrate.latest()
          .then(function () {
            return knex.seed.run()
              .then(function () {
                done();
              });
          });
      });
  });

  // Company API
  // Index
  describe('GET /api/company', function () {
    it('should return all companies', function (done) {
      chai.request(server)
        .get('/api/company')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json
          res.body.success.should.equal(true);
          res.body.data.should.be.a('array');
          res.body.data.length.should.equal(4);
          res.body.data[0].name.should.equal('Highland');
          res.body.data[1].name.should.equal('The coffee house');
          res.body.data[2].name.should.equal('Phuc long');
          res.body.data[3].name.should.equal('Ong Bau');
          done();
        });
    });
  });

  // Show
  describe('GET /api/company/:id/show', function () {
    it('should return specific company', function (done) {
      chai.request(server)
        .get('/api/company/1/show')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json
          res.body.success.should.equal(true);
          res.body.data.should.be.a('object');
          res.body.data.name.should.equal('Highland');
          res.body.data.address.should.equal('272 nguyen van cu'),
          res.body.data.phone.should.equal('012345001'),
          done();
        });
    });
  });

  // Create
  describe('POST /api/company/create', function () {
    const paramData = {
      name: "Bobapop",
      address: "300 Lanh Binh Thang",
      phone: "0909888776",
      user_id: 1,
    };

    it('should return created company', function (done) {
      chai.request(server)
        .post('/api/company/create')
        .set({ "Authorization": `Bearer ${token}` })
        .send(paramData)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json
          res.body.success.should.equal(true);
          res.body.data.should.be.a('object');
          res.body.data.name.should.equal(paramData.name);
          res.body.data.phone.should.equal(paramData.phone);
          res.body.data.address.should.equal(paramData.address);
          done();
        });
    });
  });

  // Update
  describe('POST /api/company/:id/update', function () {
    const id = 1;
    const paramData = {
      name: "Trung Nguyen"
    };

    it('should return updated company', function (done) {
      chai.request(server)
        .post('/api/company/' + id + '/update')
        .set({ "Authorization": `Bearer ${token}` })
        .send(paramData)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json
          res.body.success.should.equal(true);
          res.body.data.should.be.a('object');
          res.body.data.name.should.equal(paramData.name);
          done();
        });
    });
  });

  // Delete
  describe('GET /api/company/:id/delete', function () {
    const id = 4;
    it('should return success true', function (done) {
      chai.request(server)
        .get('/api/company/' + id + '/delete')
        .set({ "Authorization": `Bearer ${token}` })
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json
          res.body.success.should.equal(true);
          done();
        });
    });
  });

  // Search
  describe('GET /api/company/search?address=nghia&name=highland', function () {
    it('should return success true with data', function (done) {
      chai.request(server)
        .get('/api/company/search?address=nghia&name=highland')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json
          res.body.success.should.equal(true);
          res.body.data.should.be.a('array');
          res.body.data.length.should.equal(2);
          res.body.data[0].name.should.equal('Highland');
          res.body.data[1].name.should.equal('Ong Bau');
          done();
        });
    });
  });

  afterEach(function (done) {
    knex.migrate.rollback()
      .then(function () {
        done();
      });
  });
});
