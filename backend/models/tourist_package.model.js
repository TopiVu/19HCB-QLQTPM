const db = require('../config/db')
const { pagy } = require('./../utils/sqlHelper')

module.exports = {
    findByName: (name) => {
        var query = db('tourist_package');

        if(name) {
            query = query.where('name', 'like',  '%' + name + '%');
        }

        return query;
    },
    findAll: (params = {}) => {
        const { page } = params
        return pagy({ db: db, modelName: 'tourist_package', page: page, per_page: 10 })
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
