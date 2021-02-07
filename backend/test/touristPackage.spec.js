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

  // Tourist package API
  // Index
  describe('GET /api/tourist_package', function () {
    it('should return all tourisms', function (done) {
      chai.request(server)
        .get('/api/tourist_package')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json
          res.body.success.should.equal(true);
          res.body.data.should.be.a('object');
          res.body.data.records.length.should.equal(4);
          res.body.data.records[0].name.should.equal('Package 001');
          res.body.data.records[1].name.should.equal('Package 002');
          res.body.data.records[2].name.should.equal('Package 003');
          done();
        });
    });
  });

  // Show
  describe('GET /api/tourist_package/:id/show', function () {
    it('should return specific tourism', function (done) {
      chai.request(server)
        .get('/api/tourist_package/1/show')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json
          res.body.success.should.equal(true);
          res.body.data.should.be.a('object');
          res.body.data.name.should.equal('Package 001');
          res.body.data.content.should.equal('Package 001 content');
          res.body.data.price.should.equal(parseFloat(1000).toFixed(2));
          res.body.data.min_capacity.should.equal(10);
          res.body.data.max_capacity.should.equal(35);
          res.body.data.start_date.should.equal(new Date(2020, 12 - 1, 15, 0, 0, 0, 0).toISOString());
          res.body.data.end_date.should.equal(new Date(2020, 12 - 1, 30, 0, 0, 0, 0).toISOString());
          res.body.data.expired_date.should.equal(new Date(2020, 12 - 1, 20, 0, 0, 0, 0).toISOString());
          done();
        });
    });
  });

  // Create
  describe('POST /api/tourist_package/create', function () {
    const paramData = {
      name: "Phú quốc 3 ngày 2 đêm",
      price: 2000,
      min_capacity: 5,
      max_capacity: 30,
      start_date: "2020-12-15",
      end_date: "2020-12-30",
      expired_date: "2020-12-26",
      content: "Hello World <br> <strong>Strong text here</strong>",
      company_id: 1
    };

    it('should return created tourism', function (done) {
      chai.request(server)
        .post('/api/tourist_package/create')
        .set({ "Authorization": `Bearer ${token}` })
        .send(paramData)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json
          res.body.success.should.equal(true);
          res.body.data.should.be.a('object');
          res.body.data.name.should.equal(paramData.name);
          res.body.data.content.should.equal(paramData.content);
          done();
        });
    });
  });

  // Update
  describe('POST /api/tourist_package/:id/update', function () {
    const id = 1;
    const paramData = {
      name: "Phú quốc 3 ngày 2 đêm",
      price: 2000,
      min_capacity: 5,
      max_capacity: 30,
      start_date: "2020-12-15",
      end_date: "2020-12-30",
      expired_date: "2020-12-26",
      content: "Hello World <br> <strong>Strong text here</strong>",
      company_id: 1
    };

    it('should return updated tourism', function (done) {
      chai.request(server)
        .post('/api/tourist_package/' + id + '/update')
        .set({ "Authorization": `Bearer ${token}` })
        .send(paramData)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json
          res.body.success.should.equal(true);
          res.body.data.should.be.a('object');
          res.body.data.name.should.equal(paramData.name);
          res.body.data.content.should.equal(paramData.content);
          done();
        });
    });
  });

  // Delete
  describe('POST /api/tourist_package/:id/delete', function () {
    const id = 4;
    it('should return success true', function (done) {
      chai.request(server)
        .get('/api/tourist_package/' + id + '/delete')
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
  describe('POST /api/tourist_package/search', function () {
    it('should return success true with data', function (done) {
      chai.request(server)
        .get('/api/tourist_package/search?name=00')
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json
          res.body.success.should.equal(true);
          res.body.data.should.be.a('array');
          res.body.data.length.should.equal(4);
          res.body.data[0].name.should.equal('Package 001');
          res.body.data[1].name.should.equal('Package 002');
          res.body.data[2].name.should.equal('Package 003');
          res.body.data[3].name.should.equal('Package 004');
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
