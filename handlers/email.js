const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text')
const util = require('util');
//const emailConfig = require('../email')
require('dotenv').config({path: './varibales.env'})

let transport  = nodemailer.createTransport({
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
      user: process.env.USER_MAILTRAP, // generated ethereal user
      pass: process.env.PASSWORD_MAILTRAP, // generated ethereal password
    }
  });

  const generarHTML = (archivo,opciones={}) =>{
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones)
    return juice(html)
  }

exports.enviar = async (opciones) =>{
  const html = generarHTML(opciones.archivo, opciones)
  const text = htmlToText.fromString(html)
  let info = {
    from: 'UpTask <no-reply@uptask.com>', // sender address
    to: opciones.usuario.email, // list of receivers
    subject: opciones.subject, // Subject line
    text,
    html,
  }
  const  enviarEmail = util.promisify(transport.sendMail, transport )
  return enviarEmail.call(transport, info)
}

