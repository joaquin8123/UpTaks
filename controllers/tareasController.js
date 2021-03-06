const Tarea = require('../models/Tareas')
const Proyecto = require('../models/Proyectos')
const slug = require('slug')
const tareasController = {}

tareasController.nuevaTarea = async (req, res,next) =>{
    const {tarea} = req.body
    const proyecto = await Proyecto.findOne({
        where: {
           url: req.params.url
        }
     })
    const estado = 0
    const proyectoId = proyecto.id
    const result = await Tarea.create({tarea,estado,proyectoId})
    if(!result) return next()
    res.redirect(`/proyectos/${req.params.url}`)
}

tareasController.actualizarTarea = async (req, res,next) =>{
    const tarea = await Tarea.findOne({
        where: {
           id: req.params.id
        }
    })
    let estado = !tarea.estado
    const result = await Tarea.update({ estado: estado }, {
        where: {
          id: req.params.id
        }
      });
    if(!result) return next()
    res.status(200).send('Proyecto actualizado Correctamente');
}
tareasController.eliminarTarea = async (req, res,next) =>{
    const resultado = await Tarea.destroy({where: {id: req.params.id}})
    if(!resultado){
       return next();
    }
    res.status(200).send('Tarea Eliminado Correctamente');
 }

module.exports = tareasController