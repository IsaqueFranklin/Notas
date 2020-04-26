// Configurando módulos
  const express = require('express')
  const router = express.Router()
  const mongoose = require('mongoose')
  require('../models/Nota')
  const Nota = mongoose.model('notas')

// Criando rotas

  router.get('/', function(req, res){
    res.render('users/index')
  })

  router.get('/notas/add', function(req, res){
    res.render('users/addnota')
  })

router.get('/notas',function(req, res){
  Nota.find().lean().then(function(notas){
      res.render('users/notas', {notas: notas})
  }).catch(function(err){
    req.flash('error_msg', 'houve um erro ao listar as categorias.')
    res.redirect('/users')
  })
})

  router.post('/nota/new', function(req, res){

    var erros = []

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
      erros.push({texto: 'Título inválido'})
    }

    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
      erros.push({texto: 'Conteúdo inválido'})
    }else{
      const novaNota = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
      }
      new Nota(novaNota).save().then(function(){
        req.flash('success_msg', 'Nota criada com sucesso!')
        res.redirect('/users/notas')
      }).catch(function(err){
        req.flash('error_msg', 'Houve um erro.')
        res.redirect('/users')
      })
    }
  })

  module.exports = router
