const db = require('../config/db')
const { buildSearchQuery, pagy } = require('./../utils/sqlHelper');

module.exports = {
  search: ({ name, address, phone }) => {
    let queryStr = buildSearchQuery({ name, address, phone }, 'company');
    return db.raw(queryStr).then(result => result[0]);
  },
  findAll: (params = {}) => {
    const { page } = params
    return pagy({ db: db, modelName: 'company', page: page, per_page: 10 })
  },
  findById: (company_id) => {
    return db('company').where('company_id', company_id).first();
  },
  create: (attributes) => {
    return db('company').insert(attributes);
  },
  updateById: (company_id, attributes) => {
    return db('company').update(attributes).where('company_id', company_id);
  },
  deleteById: (company_id) => {
    return db('company').where('company_id', company_id).del();
  }
}
