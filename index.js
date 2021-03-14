const express = require('express')
const routes = require('./routes/index')
const path = require('path')
const bodyParser = require('body-parser')
const database = require('./database')
const bd = require('./database')
const helpers = require('./helpers')
const flash = require('connect-flash')
const session = require('express-session');
const passport = require('./passport');
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './varibales.env'})


//Crear conexion bd
require('./models/Usuario')
require('./models/Proyectos')
require('./models/Tareas')
//{ force: true } para forzar a cree de nuevo el schema en la bd (borra datos)
bd.sync()
    .then(()=> console.log('Conectado a la bd'))
    .catch(err => console.log(err))

const app = express()
//enable body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//loaded static files
app.use(express.static('public'))
//enable pug
app.set('view engine','pug')
//add folder views
app.set('views', path.join(__dirname, './views'))
app.use(cookieParser());
//add flash messages
app.use(flash())



//sesiones para navegar en distintas paginas son volvernos a autenticar
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next) => {
    console.log(req.user)
    res.locals.year = new Date().getFullYear()
    res.locals.vardump = helpers.vardump
    res.locals.usuario = {...req.user || null}
    next()
})
//Routes
app.use(routes)

// Middleware
app.use((req, res, next) => {
    next()
})
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
app.listen(port, () => console.log('Servidor corriendo en el puerto 3000'))
