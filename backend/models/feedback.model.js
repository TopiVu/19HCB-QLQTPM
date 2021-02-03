const db = require('../config/db');
const { pagy } = require('./../utils/sqlHelper');

module.exports = {
  findByTouristPackageId: (tourist_package_id) => {
    return db('feedback').where('tourist_package_id', tourist_package_id);
  },

  findAllByTourist: ({ page, tourist_package_id }) => {
    return pagy({
      db: db,
      modelName: 'feedback',
      page: page,
      per_page: 10,
      where: { tourist_package_id: tourist_package_id }
    })
  },

  findAllByUser: ({ page, user_id }) => {
    return pagy({
      db: db,
      modelName: 'feedback',
      page: page,
      per_page: 10,
      where: { user_id: user_id }
    })
  },

  findById: (tourist_package_id) => {
    return db('feedback').where('feedback_id', feedback_id).first();
  },
  create: (attributes) => {
    return db('feedback').insert(attributes);
  },
  updateById: (feedback_id, attributes) => {
    return db('feedback').update(attributes).where('feedback_id', feedback_id);
  },
  deleteById: (feedback_id) => {
    return db('feedback').where('feedback_id', tourist_package_id).del();
  }
}