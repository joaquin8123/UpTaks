const Usuario = require('../models/Usuario')
const usuarioController = {}

usuarioController.formCuenta = (req, res,next) =>{
    res.render('crearCuenta', {
        PageName: 'Registrarse'
    });
}
usuarioController.crearCuenta = async (req, res,next) =>{
    const {email, password} = req.body
    try {
        await Usuario.create({email, password})
        res.redirect('/iniciar-sesion')
    } catch (error) {
        res.render('crearCuenta',{
            PageName: 'Crear Cuenta',
            error: 'El usuario ya existe'
        })
    }
}
usuarioController.formIniciarSesion =  (req, res,next) =>{
    res.render('iniciarSesion', {
        PageName: 'Iniciar Sesion'
    });
}



module.exports = usuarioController