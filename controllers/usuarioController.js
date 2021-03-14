const Usuario = require('../models/Usuario')
const enviarEmail = require('../handlers/email')
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
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`
        const usuario = {
            email
        }

        await enviarEmail.enviar({
        usuario,
        email,
        subject: 'Confirmar tu Cuenta UpTask!',
        confirmarUrl,
        archivo : 'confirmar-cuenta'
        })

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
usuarioController.formReestablecerPassword =  (req, res,next) =>{
    res.render('reestablecer', {
        PageName: 'Reestablecer Contraseña'
    });
}
usuarioController.confirmarCuenta = async (req, res) =>{
    const email = req.params.email
    const usuario = await Usuario.findOne({where: {email}})
    if(!usuario) {
        res.render('iniciarSesion', {
            PageName: 'Iniciar Sesion',
            error: 'No valido'
        });
    }
    if(usuario.activo == 0){
        usuario.activo = 1
        usuario.save()
        res.render('iniciarSesion', {
            PageName: 'Iniciar Sesion',
            mensaje: 'Cuenta Activada Correctamente!'
        });
    }else {
        res.redirect('/iniciar-sesion')
    }
    
}



module.exports = usuarioController