const db = require('../config/db');
const { pagy } = require('./../utils/sqlHelper');

module.exports = {
  findAllByTourist: ({ page, tourist_package_id }) => {
    return pagy({
      db: db,
      modelName: 'booking',
      page: page,
      per_page: 10,
      where: { tourist_package_id: tourist_package_id }
    })
  },

  findAllByUser: ({ page, user_id }) => {
    return pagy({
      db: db,
      modelName: 'booking',
      page: page,
      per_page: 10,
      where: { user_id: user_id }
    })
  },

  findById: (booking_id) => {
    return db('booking').where('booking_id', booking_id).first();
  },
  create: (attributes) => {
    return db('booking').insert(attributes);
  },
  updateById: (booking_id, attributes) => {
    return db('booking').update(attributes).where('booking_id', booking_id);
  },
  deleteById: (booking_id) => {
    return db('booking').where('booking_id', booking_id).del();
  }
}