const passport = require('passport')

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
