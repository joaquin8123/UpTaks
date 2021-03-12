const express = require('express')
const api = express.Router()
const proyectController = require('../controllers/proyectosController')
const tareasController = require('../controllers/tareasController')
const usuarioController = require('../controllers/usuarioController')
const {body} = require('express-validator/check')
const authController = require('../controllers/authController')
//PROYECTOS
//GETS
api.get('/',authController.usuarioAutenticado ,proyectController.home)
api.get('/nosotros',proyectController.nosotros)
api.get('/nuevo-proyecto',authController.usuarioAutenticado,proyectController.formularioProyecto )
api.get('/proyectos/:url',authController.usuarioAutenticado,proyectController.proyectoPorUrl)
api.get('/proyecto/editar/:id',authController.usuarioAutenticado,proyectController.formularioEditar)
//POSTS
api.post('/nuevo-proyecto/:id?',authController.usuarioAutenticado,body('nombre').not().isEmpty().trim().escape() ,proyectController.nuevoProyecto)
//DELETS
api.delete('/proyectos/:url',authController.usuarioAutenticado,proyectController.eliminarProyecto)
// FIN PROYECTOS
// TAREAS
//GETS
//POSTS
api.post('/proyectos/:url?',authController.usuarioAutenticado,body('tarea').not().isEmpty().trim().escape() ,tareasController.nuevaTarea)
//DELETES 
api.delete('/proyectos/eliminar-tarea/:id',authController.usuarioAutenticado,tareasController.eliminarTarea)
//UPDATES
api.put('/proyectos/:id',authController.usuarioAutenticado,tareasController.actualizarTarea)
// FIN TAREAS
api.get('/crear-cuenta', usuarioController.formCuenta)
api.post('/crear-cuenta',usuarioController.crearCuenta)
api.get('/iniciar-sesion',usuarioController.formIniciarSesion)
api.post('/iniciar-sesion',authController.autenticarUsuario)
api.get('/cerrar-sesion',authController.cerrarSesion )
module.exports = api 