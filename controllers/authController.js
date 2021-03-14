const passport = require('passport')
const Usuario = require('../models/Usuario')
const crypto = require('crypto')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const bcrypt = require('bcrypt-nodejs')
const enviarEmail = require('../handlers/email')

exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion'
})
exports.usuarioAutenticado = (req,res,next) => {
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/iniciar-sesion')
}
exports.cerrarSesion = (req,res,next) => {
   req.session.destroy(()=>{
       res.redirect('/iniciar-sesion')
   })
}
exports.enviarToken = async (req,res) => {
    const usuario = await Usuario.findOne({where: {email: req.body.email}})
    if(!usuario){
        res.render('reestablecer', {
            PageName: 'Reestablecer Contraseña',
            error: 'El usuario no existe!'
        });
    }
    usuario.token = crypto.randomBytes(20).toString('hex')
    usuario.expiracion = Date.now() + 3600000
    await usuario.save()
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`
    await enviarEmail.enviar({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo : 'reestablecer-password'
    })
    res.redirect('/iniciar-sesion')
 }

 exports.validarToken = async (req,res) => {
    const usuario = Usuario.findOne({where: {token: req.params.token}})
    if(!usuario){
        error = 'No valido'
        res.redirect('/reestablecer')
    }
    res.render('resetPassword',{
        PageName : 'Reestablecer Contraseña'
    }) 
 }
 exports.actualizarPassword = async (req,res) => {
    const usuario = await Usuario.findOne({
        where: {
            token: req.params.token,
            expiracion: {
                [Op.gte] : Date.now()
            }
        }})
    if(!usuario){
        error = 'No valido'
        res.redirect('/reestablecer')
    }
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    usuario.token = null
    usuario.expiracion = null
    await usuario.save()
    res.redirect('/iniciar-sesion')
 }
 