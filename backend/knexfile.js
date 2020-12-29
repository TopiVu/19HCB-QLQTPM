var environment = process.env.NODE_ENV || 'development';

var config = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_ROOT_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'SmartEasyTravel',
      port: process.env.MYSQL_PORT || 3306
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
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_ROOT_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'SmartEasyTravelTest',
      port: process.env.MYSQL_PORT || 3306
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_ROOT_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'SmartEasyTravel',
      port: process.env.MYSQL_PORT || 3306
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },
};

module.exports = config;
