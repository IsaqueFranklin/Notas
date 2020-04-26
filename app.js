// Carregando módulos
  const express = require('express')
  const handlebars = require('express-handlebars')
  const bodyParser = require('body-parser')
  const path = require('path')
  const app = express()
  const users = require('./routes/users')
  const mongoose = require('mongoose')
  const session = require('express-session')
  const flash = require('connect-flash')


// Configurações

    app.use(session({
      secret: 'buteco',
      resave: true,
      saveUninitialized: true
    }))
    app.use(flash())

  // Middleware
    app.use(function(req, res, next){
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        next()
    })
  // bodyParser
    app.use(bodyParser.urlencoded({extend: true}))
    app.use(bodyParser.json())

  // handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars');

  // mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/notas').then(function(){
      console.log('Conectado ao mongo.')
    }).catch(function(err){
      console.log('Erro ao se conectar com o mongo: '+err)
    })

  // Public css and front-end js
    app.use(express.static(path.join(__dirname, 'public')))
  // rotas

    app.use('/users', users)


// Iniciando o servidor
  const PORT = 8080
  app.listen(PORT, function(){
    console.log('Servidor no talo.')
  })
