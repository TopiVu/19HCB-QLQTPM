const knex = require('knex') ({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        database: 'SmartEasyTravel',
        port: 3306
    }
});

module.exports = knex;