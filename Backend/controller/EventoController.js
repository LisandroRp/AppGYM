var eventos = require('../model/Evento');
var bodyParser = require('body-parser');

let insertEvento = (req,res) =>
{
    console.log(req.body);
    var newEvento = eventos({
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        idUsuarioPropietario:req.body.usuarioId,
        fecha:req.body.fecha,
        tipo:req.body.tipo,
        genero:req.body.genero,
        duracion:req.body.duracion,
        imagen: req.body.imagen,
        rating:req.body.rating,
        personas:req.body.personas,
        votos:req.body.votos,
        comentarios:req.body.comentarios,
        precios:req.body.precios,
        precioE:req.body.precioE
    });
    newEvento.save().
    then
    (
        (newEvento)=>
        {
            res.send(newEvento); //devuelvo resultado query
        },
        (err)=>{console.log(err);}
    ) 
}

let getEventos = (req, res) =>
{      
    console.log("llegue a leer");
    //Listar resultados
    eventos.find()
    .then
    (
        (listaEventos)=>
        {
            res.send(listaEventos); //devuelvo resultado query   
        },
        (err)=>{console.log(err);}
    )       
};

let getEventoById = (req, res) =>
{      
    console.log("llegue a leer con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.id);
    let idBusqueda = {_id: req.query.id};
    console.log(idBusqueda);
    //Listar resultados
    eventos.find(idBusqueda)
    .then
    (
        (listaEventos)=>
        {
            console.log(listaEventos); 
            res.send(listaEventos); //devuelvo resultado query   
               
        },
        (err)=>{console.log(err);}
    )       
};

let getEventoByNombre = (req, res) =>
{      
    console.log("llegue a leer con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.nombre);
    let idBusqueda = {nombre: req.query.nombre};
    console.log(idBusqueda);
    //Listar resultados
    eventos.findOne(idBusqueda)
    .then
    (
        (evento)=>
        {
            console.log(evento); 
            if(evento == null)
                res.status(206).send({ msg: "NO existe evento."});
            else
                res.status(200).send(evento); //devuelvo resultado query   
        },
        (err)=>{console.log(err);}
    )       
};

let getEventoByTipo = (req, res) =>
{      
    console.log("llegue a leer con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.tipo);
    let idBusqueda = {tipo: req.query.tipo};
    console.log(idBusqueda);
    //Listar resultados
    eventos.find(idBusqueda)
    .then
    (
        (listaEventos)=>
        {
            console.log(listaEventos); 
            res.send(listaEventos); //devuelvo resultado query   
               
        },
        (err)=>{console.log(err);}
    )       
};

let getEventosSortByPrecio = (req, res) =>
{      
    console.log("llegue a leer con orden");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.orden);
    let orden = req.query.orden;
    //Listar resultados
    eventos.find().sort({precio:orden})
    .then
    (
        (listaEventos)=>
        {
            console.log(listaEventos); 
            res.send(listaEventos); //devuelvo resultado query   
               
        },
        (err)=>{console.log(err);}
    )       
};

let updateEventoByDuracion = (req, res) =>
{      
    console.log("Actualizar evento: ",req.body.id);
    //Obtener id busqueda req.param.tagid
    var myquery = { _id: req.body.id};
    console.log("Actualizar key: ",myquery);
    var newvalues = { $set: {duracion: req.body.duracion } };
    console.log("Actualizar duracion: ",newvalues);
    //Listar resultados
    eventos.updateMany(myquery, newvalues, function(err, res) {
        if (err) console.log(err);
        console.log("Documento actualizado",res.nModified);
      });    
      res.status(206).send({ msg: "Se actualizaron los eventos." });  
};

let updateEventoByPuntajeProm = (req, res) =>
{      
    console.log("Actualizar evento: ",req.body.id);
    //Obtener id busqueda req.param.tagid
    var myquery = { _id: req.body.id};
    console.log("Actualizar key: ",myquery);
    var newvalues = { $set: {puntajePromedio: req.body.puntajeProm } };
    console.log("Actualizar puntajePromedio: ",newvalues);
    //Listar resultados
    eventos.updateMany(myquery, newvalues, function(err, res) {
        if (err) console.log(err);
        console.log("Documento actualizado",res.nModified);
      });    
      res.status(206).send({ msg: "Se actualizaron los eventos." });  
};

let votarEvento = (req, res) =>
{      
    console.log("Evento en el que se votó: ",req.body.eventoId);
    //Obtener id busqueda req.param.tagid
    var myquery = { _id: req.body.eventoId};
    console.log("Actualizar key: ",myquery);
    var newvalues = { $set: {rating:req.body.rating, personas:req.body.personas}, $push: {votos:req.body.votos} };
    console.log("Actualizar votos: ",newvalues);
    //Listar resultados
    eventos.updateMany(myquery, newvalues, function(err, res) {
        if (err) console.log(err);
        console.log("Documento actualizado",res.nModified);
      });    
      res.status(206).send({ msg: "Se actualizaron los votos." });  
};
module.exports = {getEventos,getEventoById,getEventoByNombre,getEventoByTipo,getEventosSortByPrecio,insertEvento,updateEventoByDuracion,updateEventoByPuntajeProm,votarEvento};