const { Sequelize } = require('sequelize');
const variablesEntorno = require('./env')

console.log(process.env.DB_PASSWORD)
const sequelize = new Sequelize('uptask', variablesEntorno.DB_USER, variablesEntorno.DB_PASSWORD, {
    host: variablesEntorno.DB_HOST,
    dialect: 'mysql',
    port: variablesEntorno.DB_PORT,
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