const db = require('../config/db')

module.exports = {
    findByName: (name) => {
        var query = db('tourist_package');

        if(name) {
            query = query.where('name', 'like',  '%' + name + '%');
        }

        return query;
    },
    findById: (tourist_package_id) => {
        return db('tourist_package').where('tourist_package_id', tourist_package_id).first();
    }
}