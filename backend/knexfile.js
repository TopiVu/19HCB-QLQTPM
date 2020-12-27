var environment = process.env.NODE_ENV || 'development';

var config = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD || '',
      database: 'SmartEasyTravel',
      port: 3306
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },
  test: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD || '',
      database: 'SmartEasyTravelTest',
      port: 3306
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  }
};

module.exports = config;
