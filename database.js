const { Sequelize } = require('sequelize');
require('dotenv').config({path: './varibales.env'})

const sequelize = new Sequelize('uptask', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    operatorsAliases: false,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire:30000,
        idle: 10000
    }
  });
module.exports = sequelize
