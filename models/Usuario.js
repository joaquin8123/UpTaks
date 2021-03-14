const Sequelize = require('sequelize')
const db = require('../database')
const Proyectos = require('./Proyectos')
const bcrypt = require('bcrypt-nodejs')

const Usuario = db.define('usuarios',{
    id : {
        type : Sequelize.INTEGER(11),
        primaryKey : true,
        autoIncrement : true
    },
    email: {
        type : Sequelize.STRING(60),
        allowNull : false,
        validate :{
            isEmail: {
                msg: 'Agrega un email valido'
            },
            notEmpty : {
                msg: 'Agrega un email valido'
            }
        },
        unique : {
            args: true,
            msg: 'El usuario ya existe!'
        }
    },
    password: {
        type : Sequelize.STRING(60),
        allowNull : false,
        validate :{
            notEmpty : {
                msg: 'Agrega un password valido'
            }
         }
    },
    activo :{
        type : Sequelize.INTEGER,
        defaultValue: 0
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE
}, {
    hooks: {
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10))
        }
    }
})
Usuario.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password,this.password)
}
Usuario.hasMany(Proyectos)

module.exports = Usuario