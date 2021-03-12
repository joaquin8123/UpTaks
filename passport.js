const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const Usuario = require('./models/Usuario')

passport.use(
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email,password,done) => {
            try {
                const usuario = await Usuario.findOne({
                    where: {
                        email: email
                    }
                })
                if(!usuario.verificarPassword(password)){
                    return done(null,false,{
                        message: 'Usuario y/o Password incorrecto'
                    })
                }
                return done(null,usuario)
            } catch (error) {
                return done(null,false,{
                    message: 'El usuario no existe'
                })
            }
        }
    )
)
//serializar usuario
passport.serializeUser((usuario,callback) => {
    callback(null,usuario)
})
//deserializar usuario
passport.deserializeUser((usuario,callback) => {
    callback(null,usuario)
})

module.exports = passport