const dbConfig = require('../config/db_config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: 'mysql',
        logging: false // Disable logging for cleaner output
    }
);
module.exports = sequelize;

