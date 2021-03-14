const Proyecto = require('../models/Proyectos')
const Tarea = require('../models/Tareas')
const slug = require('slug')
const proyectController = {}


proyectController.home = async(req, res) =>{
   const usuarioId = res.locals.usuario.id
   const proyectos = await Proyecto.findAll({where: {usuarioId }})
   res.render('index',{
    PageName: 'Proyectos',
    proyectos
   })
}
proyectController.nosotros = (req, res) =>{
    res.render('nosotros')
 }
 proyectController.formularioProyecto = async (req, res) =>{
   const usuarioId = res.locals.usuario.id
   const proyectos = await Proyecto.findAll({where: {usuarioId }})
   res.render('nuevoProyecto',{
        PageName: 'Nuevo Proyecto',
        proyectos
    })

 }

proyectController.nuevoProyecto = async (req, res) =>{
   const {nombre} = req.body
   const usuarioId = res.locals.usuario.id
   const proyectos = await Proyecto.findAll({where: {usuarioId }})
   let errores = []
   if(!nombre){
      errores.push({'texto': 'Agrega un nombre al proyecto'})
   }
   if(errores.length > 0){
      res.render('nuevoProyecto',{
         PageName: 'Nuevo Proyecto',
         errores,
         proyectos
      })
   } 
   else if(req.params.id){
      const proyecto = await Proyecto.update({nombre: nombre},{where: {id: req.params.id}})
      res.redirect('/')
   }
   else if(!req.params.id){  
      const usuarioId = res.locals.usuario.id
      await Proyecto.create({nombre,usuarioId})
      res.redirect('/')
   }
} 

proyectController.proyectoPorUrl = async (req, res,next) =>{
   const usuarioId = res.locals.usuario.id
   const proyectosPromise =  Proyecto.findAll({where: {usuarioId }})
   const proyectoPromise =  Proyecto.findOne({
      where: {
         url: req.params.url
      }
   })
   const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise])
   
   const tareas = await Tarea.findAll({
      where: {
         proyectoId: proyecto.id
      }
   })
   if(!proyecto) return next()
   
   res.render('tareas',{
      PageName: 'Treas del Proyecto',
      proyecto,
      tareas,
      proyectos
   })
}
proyectController.formularioEditar = async (req, res,next) =>{
   const usuarioId = res.locals.usuario.id
   const proyectosPromise =  Proyecto.findAll({where: {usuarioId }})
   const proyectoPromise =  Proyecto.findOne({
      where: {
         id: req.params.id
      }
   })
   const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise])
   res.render('nuevoProyecto',{
      PageName: 'Editar Proyecto',
      proyectos,
      proyecto
   })
}
proyectController.eliminarProyecto = async (req, res,next) =>{
   const {urlProyecto} = req.query
   const resultado = await Proyecto.destroy({where: {url: urlProyecto}})
   if(!resultado){
      return next();
   }
   res.status(200).send('Proyecto Eliminado Correctamente');
}
module.exports = proyectController