var mongoose = require('mongoose');

//Schema
var contatoSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    nome:{
        type: String,
        required: true
    },
    numero:{
        type: Number,
        required: true
    },
    idGrupo: [{
        grupo: {
            type: String, 
            required: true
        },
        participa: {
            type: Boolean,
            required: true,
            default: false
        },
        permissao: {
            type: Number,
            required: true,
            default: false
        }
    }]  
});

var Contato = module.exports = mongoose.model('Contato', contatoSchema);