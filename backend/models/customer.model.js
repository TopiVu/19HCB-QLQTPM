const db = require('../config/db')

module.exports = {
    findByCode: (code) => {
        return db('user_role').where('code', code).first();
    }
}