const Sequelize = require('sequelize')
const db = require('../database')
const Proyecto = require('./Proyectos')

const Tareas = db.define('tareas',{
    id : {
        type : Sequelize.INTEGER(11),
        primaryKey : true,
        autoIncrement : true
    },
    tarea: {
        type : Sequelize.STRING(100)
    },
    estado: {
        type : Sequelize.INTEGER(1)
    }

})
Tareas.belongsTo(Proyecto)
module.exports = Tareas