const db = require('../config/db')

const customerModel = {
    getAll: () => {
        return db('customer');
    }
}

module.exports = customerModel;