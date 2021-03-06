const express = require('express')
const api = express.Router()
const proyectController = require('../controllers/proyectosController')
const tareasController = require('../controllers/tareasController')
const {body} = require('express-validator/check')
//PROYECTOS
//GETS
api.get('/',proyectController.home)
api.get('/nosotros',proyectController.nosotros)
api.get('/nuevo-proyecto',proyectController.formularioProyecto )
api.get('/proyectos/:url',proyectController.proyectoPorUrl)
api.get('/proyecto/editar/:id',proyectController.formularioEditar)
//POSTS
api.post('/nuevo-proyecto/:id?',body('nombre').not().isEmpty().trim().escape() ,proyectController.nuevoProyecto)
//DELETS
api.delete('/proyectos/:url',proyectController.eliminarProyecto)
// FIN PROYECTOS
// TAREAS
//GETS
//POSTS
api.post('/proyectos/:url?',body('tarea').not().isEmpty().trim().escape() ,tareasController.nuevaTarea)
//DELETES 
api.delete('/proyectos/eliminar-tarea/:id',tareasController.eliminarTarea)
//UPDATES
api.put('/proyectos/:id',tareasController.actualizarTarea)
// FIN TAREAS
module.exports = api 