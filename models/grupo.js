var mongoose = require('mongoose');

//Schema
var grupoSchema = mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    horaInicial:{
        type: Date,
        required: true
    },
    horaFinal:{
        type: Date,
        required: true
    },
    data:{
        type: Date,
        required: true
    }
});

var Grupo = module.exports = mongoose.model('Grupo', grupoSchema);