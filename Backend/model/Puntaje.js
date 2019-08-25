var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var puntajeSchema = new Schema({
    nombre:String,
    puntaje:Number,
    usuarioId:String,
    fecha:{type:Date, default:Date.now()},
    eventoId:String,
});

var Puntaje = mongoose.model('Puntaje', puntajeSchema);
console.log("se creo modelo Puntaje");
module.exports = Puntaje;