const mongoose = require('mongoose');

// TODO: atualizar schema para a regra
const regraSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId, //_id, onde _ é uma convenção. 
   name: String,
   price: Number
});

module.exports = mongoose.model('Regra', regraSchema);