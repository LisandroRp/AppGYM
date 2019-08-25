var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cartaSchema = new Schema({
    nombre:String,
    descripcion:String,
    precios:[{
        nombre:String,
        descripcion:String,
        valor:Number,
    }],
});

var Carta = mongoose.model('Carta', cartaSchema);
console.log("se creo modelo Carta");
module.exports = Carta;