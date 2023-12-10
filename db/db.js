const { Sequelize } = require('sequelize');


const db = new Sequelize('havana1', 'postgres', '12345678', {
    host: 'localhost',
    dialect: 'postgres'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

module.exports = db;