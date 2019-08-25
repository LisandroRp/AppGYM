var comentarios = require('../model/Comentario');
var bodyParser = require('body-parser');

let insertComentario = (req,res) =>
{
    console.log(req.body);
    var date = new Date().toISOString().slice(0,10);
    var newComentario = comentarios({
        nombre:req.body.eventoNombre,
        descripcion:req.body.descripcion,
        usuarioId:req.body.usuarioId,
        fecha:date,
        eventoId:req.body.eventoId
    });
    newComentario.save().
    then
    (
        (newComentario)=>
        {
            console.log(newComentario.nombre) ; 
            res.send(newComentario); //devuelvo resultado query   
        },
        (err)=>{console.log(err);}
    ) 
}

let getComentariosByUsuario = (req, res) =>
{      
    console.log("llegue a leer comentarios con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.usuarioId);
    let idBusqueda = {usuarioId: req.query.usuarioId};
    console.log(idBusqueda);
    //Listar resultados
    comentarios.find(idBusqueda)
    .then
    (
        (listaComentarios)=>
        {
            console.log(listaComentarios);    
            res.send(listaComentarios); //devuelvo resultado query   
        },
        (err)=>{console.log(err);}
    )       
};

let getComentariosByEvento = (req, res) =>
{      
    console.log("llegue a leer comentarios con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.eventoId);
    let idBusqueda = {eventoId: req.query.eventoId};
    console.log(idBusqueda);
    //Listar resultados
    comentarios.find(idBusqueda)
    .then
    (
        (listaComentarios)=>
        {
            console.log(listaComentarios);    
            res.send(listaComentarios); //devuelvo resultado query   
        },
        (err)=>{console.log(err);}
    )       
};

let deleteComentarioById = (req, res) =>
{      
    console.log("borro comentario");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.id);
    let idBusqueda = {_id: req.query.id};
    console.log(idBusqueda);
    //Listar resultados
    comentarios.deleteOne(idBusqueda)
    .then
    (
        (listaComentarios)=>
        {
            console.log(listaComentarios);    
            res.send(listaComentarios); //devuelvo resultado query   
        },
        (err)=>{console.log(err);}
    )       
};

module.exports = {insertComentario,getComentariosByUsuario,getComentariosByEvento,deleteComentarioById};