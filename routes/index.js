const express = require('express')
const api = express.Router()
const proyectController = require('../controllers/proyectosController')
const {body} = require('express-validator/check')
//GETS
api.get('/',proyectController.home)
api.get('/nosotros',proyectController.nosotros)
api.get('/nuevo-proyecto',proyectController.formularioProyecto )
api.get('/proyectos/:url',proyectController.proyectoPorUrl)
api.get('/proyecto/editar/:id',proyectController.formularioEditar)
//POSTS
api.post('/nuevo-proyecto/:id?',body('nombre').not().isEmpty().trim().escape() ,proyectController.nuevoProyecto)
//api.post('/nuevo-proyecto/:id',body('nombre').not().isEmpty().trim().escape() ,proyectController.actualizarProyecto)

module.exports = api 