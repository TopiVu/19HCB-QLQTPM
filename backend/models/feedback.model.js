const db = require('../config/db')

module.exports = {
    findByTouristPackageId: (tourist_package_id) => {
        return db('feedback').where('tourist_package_id', tourist_package_id);
    }
}