var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventoSchema = new Schema({
    nombre:{type:String, required:true},
    descripcion:{type:String, required:true},
    idUsuarioPropietario:{type:String, required:true},
    fecha:String,
    tipo:{type:String, required:true},
    genero:String,
    imagen:String,
    duracion:String,
    rating:Number,
    personas:Number,
    votos:[],
    comentarios:[{type:Schema.Types.ObjectId, ref: 'Comentario'}],
    precios:[],
    precioE:Number,
    ubicacion: String,
    latitude:Number,
    longitude:Number

});

var Eventos = mongoose.model('Evento', eventoSchema);
console.log("se creo modelo Evento");
module.exports = Eventos;