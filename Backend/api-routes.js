// Initialize express router
let router = require('express').Router();
let usuarioController = require('./controller/UsuarioController');
let comentarioController = require('./controller/ComentarioController');
let eventoController = require('./controller/EventoController');
let cartaController = require('./controller/CartaController');
//let peliculaController = require('./controller/PeliculaController');
       
// Set default API response
router.get('/', function (req, res) 
{
    res.json(
    {
       status: 'Estoy Funcionando',
       message: 'Se esta ejecutando la Api!',
    });
});

//************************** Recursos de Usuarios *****************************/
//EndPoint para leer todos los usuarios
router.get('/getUsuarios', (req, res) => {
    usuarioController.getUsuarios(req,res);
});

//EndPoint para leer usuario por id
router.get('/getUsuarioById',(req, res) =>{
    if(!req.query.id || req.query.id =='undefined' || req.query.id == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.getUsuarioById(req,res);
});

//EndPoint para leer usuario por username
router.get('/getUsuarioByUsername',(req, res) =>{
    if(!req.query.username || req.query.username =='undefined' || req.query.username == '') 
        res.status(409).send({ msg: "El campo username es requerido." });
    else
        usuarioController.getUsuarioByUsername(req,res);
});

//Endpoint para insertar un usuario
router.post('/insertUsuario/Usuario',(req, res) =>{
    console.log("Insertar nuevo usuario: ", req.body);
    if(!req.body || req.body.id =='undefined' || req.body.password =='undefined' || req.body.id == '' || req.body.password == '') 
        res.status(409).send({ msg: "El campo id usuario es requerido." });
    else
        usuarioController.insertUsuario(req,res);
});

//EndPoint para actualizar password de un usuario
router.post('/updateUsuarioByPassword/Usuario',(req, res) =>{
    console.log("Actualizar usuario y password: ", req.body);
    if(!req.body.username || !req.body.password) 
        res.status(409).send({ msg: "El campo id y password son requeridos del usuario." });
    else
        usuarioController.updateUsuarioByPassword(req,res); 
});

//EndPoint para actualizar el perfil de un usuario en base al genero de evento
router.post('/updateUsuarioByGeneroEvento/Usuario',(req, res) =>{
    console.log("Actualizar perfil (genero de evento): ", req.body);
    if(!req.body.username || req.body.username == 'undefined' || req.body.username == '') 
        res.status(409).send({ msg: "El campo username es requerido del usuario." });
    else
        usuarioController.updateUsuarioByGeneroEvento(req,res); 
});

//EndPoint para actualizar el perfil de un usuario en base al tipo de evento
router.post('/updateUsuarioByTipoEvento/Usuario',(req, res) =>{
    console.log("Actualizar perfil (tipo de evento): ", req.body);
    if(!req.body.username || req.body.username == 'undefined' || req.body.username == '') 
        res.status(409).send({ msg: "El campo username es requerido del usuario." });
    else
        usuarioController.updateUsuarioByTipoEvento(req,res); 
});
//************************** Recursos de Comentarios *****************************/
//EndPoint para insertar comentario
router.post('/insertComentario/Comentario',(req, res) =>{
    console.log("Insertar nuevo comentario: ",req.body);
    if(!req.body || req.body.usuarioId =='undefined' || req.body.eventoId =='undefined' || req.body.usuarioId == '' || req.body.usuarioId == null || req.body.eventoId == '' || req.body.eventoId == null) 
        res.status(409).send({ msg: "El campo usuario y evento son requeridos del comentario." });
    else
        comentarioController.insertComentario(req,res);
});

//EndPoint para leer comentarios de un usuario
router.get('/getComentariosByUsuario',(req, res) =>{
    console.log("Obtener comentario por usuario: ",req.query);
    if(!req.query || req.query.usuarioId =='undefined' || req.query.usuarioId == '' || req.query.usuarioId == null ) 
        res.status(409).send({ msg: "El campo usuario es requerido del comentario." });
    else
        comentarioController.getComentariosByUsuario(req,res);
});

//EndPoint para leer comentarios de un evento
router.get('/getComentariosByEvento',(req, res) =>{   
    console.log("Obtener comentario por evento: ",req.query);
    if(!req.query ||  req.query.eventoId =='undefined' || req.query.eventoId == '' || req.query.eventoId == null) 
        res.status(409).send({ msg: "El campo evento es requerido del comentario." });
    else
        comentarioController.getComentariosByEvento(req,res);
});

//EndPoint para borrar comentario de un evento
router.get('/deleteComentarioById',(req, res) =>{   
    console.log("Borrar comentario por id: ",req.query);
    if(!req.query ||  req.query.id =='undefined' || req.query.id == '' || req.query.id == null) 
        res.status(409).send({ msg: "El campo id es requerido del comentario." });
    else
        comentarioController.deleteComentarioById(req,res);
});

//************************** Recursos de Eventos *****************************/
//EndPoint para leer todos los eventos
router.get('/getEventos', (req, res) => {
    eventoController.getEventos(req,res);
});

//EndPoint para leer evento por id
router.get('/getEventoById',(req, res) =>{
    if(!req.query.id || req.query.id =='undefined' || req.query.id == '') 
        res.status(409).send({ msg: "El campo id evento es requerido." });
    else
        eventoController.getEventoById(req,res);
});

//EndPoint para leer evento por nombre
router.get('/getEventoByNombre',(req, res) =>{
    if(!req.query.nombre || req.query.nombre =='undefined' || req.query.nombre == '') 
        res.status(409).send({ msg: "El campo nombre es requerido." });
    else
        eventoController.getEventoByNombre(req,res);
});

//EndPoint para leer evento por tipo
router.get('/getEventoByTipo',(req, res) =>{
    if(!req.query.tipo || req.query.tipo =='undefined' || req.query.tipo == '') 
        res.status(409).send({ msg: "El campo tipo es requerido." });
    else
        eventoController.getEventoByTipo(req,res);
});

//EndPoint para leer eventos ordenados por precio
router.get('/getEventosSortByPrecio',(req, res) =>{
    if(!req.query.orden || req.query.orden =='undefined' || req.query.orden == '') 
        res.status(409).send({ msg: "El campo orden es requerido." });
    else
        eventoController.getEventosSortByPrecio(req,res);
});

//Endpoint para insertar un evento
router.post('/insertEvento/Evento',(req, res) =>{
    console.log("Insertar nuevo evento: ", req.body);
    if(!req.body || req.body.id =='undefined' || req.body.nombre =='undefined' || req.body.id == '' || req.body.nombre == '') 
        res.status(409).send({ msg: "El campo id evento es requerido." });
    else
        eventoController.insertEvento(req,res);
});

//EndPoint para actualizar duracion de un evento
router.post('/updateEventoByDuracion/Evento',(req, res) =>{
    console.log("Actualizar duracion: ", req.body);
    if(!req.body.id || !req.body.duracion) 
        res.status(409).send({ msg: "El campo id y duracion son requeridos del evento." });
    else
        eventoController.updateEventoByDuracion(req,res); 
});

//EndPoint para actualizar puntaje promedio de un evento
router.post('/updateEventoByPuntajeProm/Evento',(req, res) =>{
    console.log("Actualizar puntaje promedio: ", req.body);
    if(!req.body.id || !req.body.puntajeProm) 
        res.status(409).send({ msg: "El campo id y puntaje promedio son requeridos del evento." });
    else
        eventoController.updateEventoByPuntajeProm(req,res); 
});

//EndPoint para votar un evento
router.post('/votarEvento/Evento',(req, res) =>{
    console.log("Actualizar votos: ", req.body);
    if(!req.body.eventoId || !req.body.votos || !req.body.rating || !req.body.personas) 
        res.status(409).send({ msg: "El campo eventoId y/o votos son requeridos." });
    else
        eventoController.votarEvento(req,res); 
});

// Export API routes
module.exports = router;