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
    },
    create: (attributes) => {
        return db('tourist_package').insert(attributes);
    },
    updateById: (tourist_package_id, attributes) => {
        return db('tourist_package').update(attributes).where('tourist_package_id', tourist_package_id);
    },
    deleteById: (tourist_package_id) => {
        return db('tourist_package').where('tourist_package_id', tourist_package_id).del();
    }
}
