const db = require('../config/db')

module.exports = {
    login: (username) => {
        return db('user').where('username', username).first();
    },
    insert: (user) => {
        return db('user').insert(user);
    }
}