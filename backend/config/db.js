const config = require('./../knexfile');
const knex = require('knex');
const envMode = process.env.NODE_ENV || 'development';
const db = knex(config[envMode]);

module.exports = db;

