var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre:{type:String, required:true, max:100},
    apellido:{type:String, required:true, max:100},
    username:String,
    fecha_creacion:{type:Date, default:Date.now()},
    fecha_ult_acceso:{type:Date, default:Date.now()},
    email:{type:String, required:true, max:100},
    password:{type:String, required:true, min:8, max:20},
    generoEvento:[],
});

//usuarioSchema.virtual('nombreCompleto').get(function(){return this.nombre+' '+this.apellido});

var Usuarios = mongoose.model('Usuario', usuarioSchema);
console.log("se creo modelo Usuario");
module.exports = Usuarios;