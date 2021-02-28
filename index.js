const express = require('express')
const app = express()
const routes = require('./routes/index')
const path = require('path')
const bodyParser = require('body-parser')
const database = require('./database')
const bd = require('./database')
const helpers = require('./helpers')

//Crear conexion bd
require('./models/Proyectos')
bd.sync()
    .then(()=> console.log('Conectado a la bd'))
    .catch(err => console.log(err))
//loaded static files
app.use(express.static('public'))
//enable pug
app.set('view engine','pug')
//add folder views
app.set('views', path.join(__dirname, './views'))
app.use((req,res,next) => {
    res.locals.year = new Date().getFullYear()
    res.locals.vardump = helpers.vardump
    next()
})
//enable body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//Routes
app.use(routes)

// Middleware
app.use((req, res, next) => {
    
    next()
})

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'))