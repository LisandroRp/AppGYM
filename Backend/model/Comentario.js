var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var comentarioSchema = new Schema({
    nombreE:String,
    descripcion:String,
    usuarioId:String,
    fecha: String,
    eventoId: String
});

var comentarios = mongoose.model('Comentario', comentarioSchema);
console.log("se creo modelo Comentario");
module.exports = comentarios;