const Proyecto = require('../models/Proyectos')
const slug = require('slug')
const proyectController = {}


proyectController.home = async(req, res) =>{
   const proyectos = await Proyecto.findAll()
   res.render('index',{
    PageName: 'Proyectos',
    proyectos
   })
}
proyectController.nosotros = (req, res) =>{
    res.render('nosotros')
 }
 proyectController.formularioProyecto = async (req, res) =>{
   const proyectos = await Proyecto.findAll()
   res.render('nuevoProyecto',{
        PageName: 'Nuevo Proyecto',
        proyectos
    })

 }

proyectController.nuevoProyecto = async (req, res) =>{
   const {nombre} = req.body
   const proyectos = await Proyecto.findAll()
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
      await Proyecto.create({nombre})
      res.redirect('/')
   }
} 

proyectController.proyectoPorUrl = async (req, res,next) =>{
   const proyectosPromise =  Proyecto.findAll()
   const proyectoPromise =  Proyecto.findOne({
      where: {
         url: req.params.url
      }
   })
   const [proyectos,proyecto] = await Promise.all([proyectosPromise,proyectoPromise])
   if(!proyecto) return next()
   res.render('tareas',{
      PageName: 'Treas del Proyecto',
      proyecto,
      proyectos
   })
}
proyectController.formularioEditar = async (req, res,next) =>{
   const proyectosPromise =  Proyecto.findAll()
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


module.exports = proyectController