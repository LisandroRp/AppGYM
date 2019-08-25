var usuarios = require('../model/Usuario');
var bodyParser = require('body-parser');

 
let insertUsuario = (req,res) =>
{
    console.log(req.body);
    var newUsuario = usuarios({
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        generoEvento: req.body.generoEvento
    });
    newUsuario.save().
    then
    (
        (newUsuario)=>
        {
            res.send(newUsuario); //devuelvo resultado query 
        },
        (err)=>{console.log(err);}
    ) 
}

let getUsuarios = (req, res) =>
{      
    console.log("llegue a leer");
    //Listar resultados
    usuarios.find()
    .then
    (
        (listaUsuarios)=>
        {
            res.send(listaUsuarios); //devuelvo resultado query    
        },
        (err)=>{console.log(err);}
    )       
};

let getUsuarioById = (req, res) =>
{      
    console.log("llegue a leer con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.id);
    let idBusqueda = {_id: req.query.id};
    console.log(idBusqueda);
    //Listar resultados
    usuarios.find(idBusqueda)
    .then
    (
        (listaUsuarios)=>
        {
            console.log(listaUsuarios); 
            res.send(listaUsuarios); //devuelvo resultado query   
               
        },
        (err)=>{console.log(err);}
    )       
};

let getUsuarioByUsername = (req, res) =>
{      
    console.log("llegue a leer con filtro");
    //Obtener id busqueda req.param.tagid
    console.log(req.query.username);
    let idBusqueda = {username: req.query.username};
    console.log(idBusqueda);
    //Listar resultados
    usuarios.findOne(idBusqueda)
    .then
    (
        (user)=>
        {
            console.log(user); 
            if(user == null)
                res.status(206).send({ msg: "NO existe usuario."});
            else
                res.status(200).send(user); //devuelvo resultado query   
        },
        (err)=>{console.log(err);}
    )       
};

let updateUsuarioByPassword = (req, res) =>
{      
    console.log("Actualizar usuario: ",req.body.username);
    //Obtener id busqueda req.param.tagid
    var myquery = { username: req.body.username};
    console.log("Actualizar key: ",myquery);
    var newvalues = { $set: {password: req.body.password } };
    console.log("Actualizar password: ",newvalues);
    //Listar resultados
    usuarios.updateMany(myquery, newvalues, function(err, res) {
        if (err) console.log(err);
        console.log("Documento actualizado",res.nModified);
      });    
      res.status(206).send({ msg: "Se actualizaron los usuarios." });  
};

let updateUsuarioByGeneroEvento = (req, res) =>
{      
    console.log("Actualizar usuario: ",req.body.username);
    //Obtener id busqueda req.param.tagid
    var myquery = { username: req.body.username};
    console.log("Actualizar key: ",myquery);
    var newvalues = { $set: {generoEvento: req.body.generoEvento } };
    console.log("Actualizar genre: ",newvalues);
    //Listar resultados
    usuarios.updateMany(myquery, newvalues, function(err, res) {
        if (err) console.log(err);
        console.log("Documento actualizado",res.nModified);
      });    
      res.status(206).send({ msg: "Se actualizaron los usuarios." });  
};

let updateUsuarioByTipoEvento = (req, res) =>
{      
    console.log("Actualizar usuario: ",req.body.username);
    //Obtener id busqueda req.param.tagid
    var myquery = { username: req.body.username};
    console.log("Actualizar key: ",myquery);
    var newvalues = { $push: {tipoEvento: req.body.tipo } };
    console.log("Actualizar genre: ",newvalues);
    //Listar resultados
    usuarios.updateMany(myquery, newvalues, function(err, res) {
        if (err) console.log(err);
        console.log("Documento actualizado",res.nModified);
      });    
      res.status(206).send({ msg: "Se actualizaron los usuarios." });  
};

module.exports = {getUsuarios,getUsuarioById,getUsuarioByUsername,insertUsuario,updateUsuarioByPassword,updateUsuarioByGeneroEvento,updateUsuarioByTipoEvento};