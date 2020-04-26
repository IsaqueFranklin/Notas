const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Nota = new Schema({
  titulo: {
    type: String,
    required: true
  },
  conteudo: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

mongoose.model('notas', Nota)
