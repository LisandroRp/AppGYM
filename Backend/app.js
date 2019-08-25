// Importo express
var express = require('express');
// Importo Body Parser
var bodyParser = require('body-parser');
var cors = require('cors');
// Inicializo el server express
var app = express();

// Importo driver
var mongoose = require('mongoose');
// Conectar BD
var urlBD = 'mongodb://localhost/dbEventos';
// Opciones conexion
var opts = {useNewUrlParser:true, connectTimeoutMS:20000};

//Pruebo conexion
mongoose.connect(urlBD,opts).then
(
    () => {
            mongoose.Promise = global.Promise;
            console.log("Conectado a dbEventos!!");
          }, //se conecto
    err => { 
            console.log("ERROR:" + err); 
           } //manejo error
);

// Setup server port
var port = process.env.PORT || 8080;

// Todo lo que recibe la app se tratara como json
app.use(bodyParser.urlencoded(
{
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// Importo router
var apiRoutes = require("./api-routes")
// Uso Api routes en App
app.use('/apiAppEventos', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Ejecutando en el puerto " + port);
});

// Send message for default URL
app.get('/', (req, res) => res.send('Backend Activo'));

/************ Test ***********/
/**** EVENTOS ****/
/*var Evento = require('./model/Evento');

var bocaEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Boca vs Athletico Paranaense',
    descripcion:'Copa Libertadores 2019',
    fecha:'31/07/19 21.30hs',
    tipo:'Deporte',
    idUsuarioPropietario:'Boca Juniors',
    duracion:'2 Horas',
    genero:'Futbol',
    imagen:'http://e00-ar-marca.uecdn.es/claro/assets/multimedia/imagenes/2019/05/09/15573533399660.jpg',
    rating:4.8,
    personas:0,
    precioE:3599,
    precios: [{nombre:'Graba Media', precio:'$3599'},
    {nombre:'Palcos', precio:'$13000'},
    {nombre:'Torre', precio:'$6769'},
    {nombre:'Tribuna inferior', precio:'$3600'},
    {nombre:'Upper tier', precio:'$4680'}],
    ubicacion:'Estadio Boca Juniors, CABA',
    latitude:-34.635417,
    longitude:-58.364692
});

bocaEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+bocaEvento.nombre+' guardado con exito.');
});

var pumasEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Los Pumas vs Springboks',
    descripcion:'Veni a alentar a los Pumas en su despedida antes del mundial',
    fecha: '10/08/19 16.40hs',
    tipo:'Deporte',
    idUsuarioPropietario:'Personal',
    duracion:'2 horas',
    genero:'Rugby',
    imagen:'http://e00-ar-marca.uecdn.es/claro/assets/multimedia/imagenes/2018/08/16/15344434117810.jpg',
    rating:3.7,
    personas:0,
    precioE:400,
    precios: [{nombre:'PREFERENCIAL S/N', precio:'$700'},
    {nombre:'GENERAL SUR', precio:'$400'},
    {nombre:'GENERAL NORTE', precio:'$400'},
    {nombre:'PLATEA LATERAL T', precio:'$500'},
    {nombre:'PLATEA LATERAL D', precio:'$500'},
    {nombre:'PLATEA LATERAL U', precio:'$1200'},
    {nombre:'PLATEA LATERAL V', precio:'$1200'},
    {nombre:'PLATEA LATERAL A', precio:'$1200'},
    {nombre:'PLATEA LATERAL B', precio:'$1200'},
    {nombre:'PLATEA LATERAL C', precio:'$1200'}],
    ubicacion: 'Estadio Padre Martearena, Salta',
    latitude:-24.819769,
    longitude:-65.419671
});

pumasEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+pumasEvento.nombre+' guardado con exito.');
});

var basketEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Argentina vs Uruguay',
    descripcion:'Nacion3s 2019',
    fecha: '26/07/19 19hs',
    tipo:'Deporte',
    idUsuarioPropietario:'Dove',
    duracion:'2 horas',
    genero:'Basket',
    imagen:'http://e00-ar-marca.uecdn.es/claro/assets/multimedia/imagenes/2019/06/20/15609848388305.jpg',
    rating:3.4,
    personas:0,
    precioE:400,
    precios: [{nombre:'PALCO LATERAL C', precio:'$1200'},
    {nombre:'PALCO LATERAL G', precio:'$1200'},
    {nombre:'PALCO CABECERA A', precio:'$900'},
    {nombre:'PALCO CABECERA E', precio:'$900'},
    {nombre:'PLATEA BAJA S/N', precio:'$700'},
    {nombre:'PLATEA ALTA S/N', precio:'$400'}],
    ubicacion: 'Parque Roca, Soldati',
    latitude:-34.666441,
    longitude:-58.440303
});

basketEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+basketEvento.nombre+' guardado con exito.');
});

var basket2Evento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Argentina vs Puerto Rico',
    descripcion:'Nacion3s 2019',
    fecha: '27/07/19 21hs',
    tipo:'Deporte',
    idUsuarioPropietario:'Dove',
    duracion:'2 horas',
    genero:'Basket',
    imagen:'http://e00-ar-marca.uecdn.es/claro/assets/multimedia/imagenes/2019/06/20/15609848388305.jpg',
    rating:3.4,
    personas:0,
    precioE:400,
    precios: [{nombre:'PALCO LATERAL C', precio:'$1200'},
    {nombre:'PALCO LATERAL G', precio:'$1200'},
    {nombre:'PALCO CABECERA A', precio:'$900'},
    {nombre:'PALCO CABECERA E', precio:'$900'},
    {nombre:'PLATEA BAJA S/N', precio:'$700'},
    {nombre:'PLATEA ALTA S/N', precio:'$400'}],
    ubicacion: 'Parque Roca, Soldati',
    latitude:-34.666441,
    longitude:-58.440303
});

basket2Evento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+basket2Evento.nombre+' guardado con exito.');
});

var canchaEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'A la cancha por una Sonrisa',
    descripcion:'Futbol Mixto y Solidario',
    fecha: '13/07/19 15hs',
    tipo:'Deporte',
    idUsuarioPropietario:'Fundacion PUPI',
    duracion:'2 horas',
    genero:'Futbol',
    imagen:'https://pbs.twimg.com/media/D_AGZAiWkAAeWXh.jpg',
    rating:3.0,
    personas:0,
    precioE:100,
    precios: [{nombre:'PLATEA PTA ZUFRATEFUI SECCION1', precio:'$200'},
    {nombre:'PLATEA PTA ZUFRATEFUI SECCION2', precio:'$200'},
    {nombre:'PLATEA PTA ZUFRATEFUI SECCION3', precio:'$200'},
    {nombre:'POPULAR PUERTA LINIERS', precio:'$100'}],
    ubicacion: 'Estadio Club Atletico Platense, Vicente Lopez',
    latitude:-34.540071,
    longitude:-58.481630
});

canchaEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+canchaEvento.nombre+' guardado con exito.');
});

var gustarEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'No Te Va A Gustar',
    descripcion:'Este espectáculo forma parte de la presentación de su disco “Otras canciones” que han preparado con motivo de sus 25 años',
    fecha: '02/08/19 21.30hs',
    tipo:'Concierto',
    idUsuarioPropietario:'Ticketek',
    duracion:'2 horas',
    genero:'Rock',
    imagen:'http://www.gamba.fm/wp/wp-content/uploads/2019/03/ntvg.jpg',
    rating:3.0,
    personas:0,
    precioE:600,
    precios: [{nombre:'S.ORQUESTA', precio:'$1450'},
    {nombre:'PLATEA BAJA', precio:'$1300'},
    {nombre:'PLATEA ALTA', precio:'$1150'},
    {nombre:'TERTULIA BALCON', precio:'$1000'},
    {nombre:'TERTULIA ALTA', precio:'$850'},
    {nombre:'GRADAS CENTRALES', precio:'$700'},
    {nombre:'GRADA IZQUIEDA', precio:'$700'},
    {nombre:'GRADA DERECHA', precio:'$700'},
    {nombre:'PARAISO S/N', precio:'$600'}],
    ubicacion: 'Teatro El Círculo, Santa Fé Rosario',
    latitude:-32.952278,
    longitude:-60.635040
});

gustarEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+gustarEvento.nombre+' guardado con exito.');
});

var inviEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Los Amigos Invisibles',
    descripcion:'Los Amigos Invisibles presentan "Tócamela Tour"',
    fecha: '06/09/19 21hs',
    tipo:'Concierto',
    idUsuarioPropietario:'Ticketek',
    duracion:'2 horas',
    genero:'Pop',
    imagen:'https://www.ticketek.com.ar/sites/default/files/images/artist/amigosinvisibles-garfield-art.png',
    rating:3.0,
    personas:0,
    precioE:860,
    precios: [{nombre:'ULTRA VIP', precio:'$1380'},
    {nombre:'PALCO VIP ORO', precio:'$1180'},
    {nombre:'PALCO VIP PLATA', precio:'$980'},
    {nombre:'GENERAL', precio:'$780'}],
    ubicacion: 'Club Museum, CABA',
    latitude:-34.613977,
    longitude:-58.374886
});

inviEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+inviEvento.nombre+' guardado con exito.');
});

var richieEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Richie Ramone',
    descripcion:'Richie Ramone vuelve a la Argentina celebrando el 45 Aniversario de Ramones',
    fecha: '24/07/19 19hs',
    tipo:'Concierto',
    idUsuarioPropietario:'Ticketek',
    duracion:'2 horas',
    genero:'Rock',
    imagen:'http://headbangerslatinoamerica.com/wp-content/uploads/2019/05/ig-richie-300x300.jpg',
    rating:3.9,
    personas:0,
    precioE:1250,
    precios: [{nombre:'GENERAL', precio:'$1135'},
    {nombre:'2X1 LA NACION GENERAL', precio:'$1135'},
    {nombre:'2X1 CLARIN 365 GENERAL', precio:'$1135'}],
    ubicacion: 'Uniclub, CABA',
    latitude:-34.602505,
    longitude:-58.412295
});

richieEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+richieEvento.nombre+' guardado con exito.');
});

var glamEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Glamnation',
    descripcion:'LETS FUCKIN ROCK!',
    fecha:'12/07/19 23hs',
    tipo:'Show',
    idUsuarioPropietario:'The Roxy Live',
    duracion:'2 Horas',
    genero:'Rock',
    imagen:'http://www.mtsproducciones.com/imagenes/locales/zag-glamnation-300x270.jpg',
    rating:3.0,
    personas:0,
    precioE:150,
    precios: [{nombre:'Entrada general', precio:'$150'}],
    ubicacion:'Niceto Vega 5542, CABA',
    latitude:-34.585187,
    longitude:-58.438715
});

glamEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+glamEvento.nombre+' guardado con exito.');
});

var joseEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Josefita',
    descripcion:'La ya conocida banda de las hormigas no para y continúa con sus noche de #RocanrolYCarnaval',
    fecha:'13/07/19 21hs',
    tipo:'Concierto',
    idUsuarioPropietario:'The Roxy Live',
    duracion:'2 Horas',
    genero:'Rock',
    imagen:'http://www.mtsproducciones.com/imagenes/locales/ROXY-LVB-WEB-300x270-JOSE-ROX-13-7-19.jpg',
    rating:2.5,
    personas:0,
    precioE:300,
    precios: [{nombre:'Entrada general', precio:'$300'}],
    ubicacion:'Niceto Vega 5542, CABA',
    latitude:-34.585187,
    longitude:-58.438715
});

joseEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+joseEvento.nombre+' guardado con exito.');
});

var disneyEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Disney on Ice',
    descripcion:'Conquista tus Sueños',
    fecha:'26/07/19 19hs',
    tipo:'Show',
    idUsuarioPropietario:'Disney',
    duracion:'2 Horas',
    genero:'Infantil',
    imagen:'https://3.bp.blogspot.com/-1vhb8Umidi4/W5h3sofRJLI/AAAAAAAAbPY/vQbqIZJ0jrU3AhUXuNTva-geRYg5YHuSwCLcBGAs/s1600/IMG_8624.JPG',
    rating:5,
    personas:0,
    precioE:850,
    precios: [{nombre:'PALCO Para 4 personas', precio:'$14800'},
    {nombre:'SUPER PULLMAN A', precio:'$2900'},
    {nombre:'PLATEA PREFERIDA', precio:'$2500'},
    {nombre:'SUPER PULLMAN', precio:'$1700'},
    {nombre:'PLATEA MADERO BAJA', precio:'$1600'},
    {nombre:'PLATEA CENTRAL', precio:'$1400'},
    {nombre:'PULLMAN', precio:'$1300'},
    {nombre:'PLATEA', precio:'$850'},
    {nombre:'PLATEA MADERO ALTA', precio:'$850'},
    {nombre:'CABECERA S/N', precio:'$450'}],
    ubicacion:'Luna Park, CABA',
    latitude:-34.602055,
    longitude:-58.368697
});

disneyEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+disneyEvento.nombre+' guardado con exito.');
});

var wweEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'WWE Live Buenos Aires',
    descripcion:'Las estrellas de WWE regresan a Argentina!',
    fecha:'06/09/19 20.30hs',
    tipo:'Show',
    idUsuarioPropietario:'WWE',
    duracion:'2 Horas',
    genero:'Pelea',
    imagen:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXnF2ecEQydigrd4PYoJtQ7PO4SsPyCsKL_YpVVOXJJV1-Q4D50w',
    rating:3.5,
    precioE:1000,
    precios: [{nombre:'RING SIDE', precio:'$3500'},
    {nombre:'SUPER PULLMAN', precio:'$3000'},
    {nombre:'MEET & GREET', precio:'$3000'},
    {nombre:'RING SIDE ALTO', precio:'$2400'},
    {nombre:'PLATEA MADERO ALTA', precio:'$1700'},
    {nombre:'CABECERA S/N', precio:'$1000'}],
    personas:0,
    ubicacion:'Luna Park, CABA',
    latitude:-34.602055,
    longitude:-58.368697
});

wweEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+wweEvento.nombre+' guardado con exito.');
});

var aladinEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Aladin Sera Genial',
    descripcion:'Despedida en vacaciones de invierno!',
    fecha:'30/06/19',
    tipo:'Show',
    idUsuarioPropietario:'Mp Producciones',
    duracion:'2 Horas',
    genero:'Infantil',
    imagen:'https://www.ticketonline.de/obj/media/DE-eventim/galery/222x222/d/disney-aladdin-neu-tickets-2016.jpg',
    rating:3.5,
    personas:0,
    precioE:450,
    ubicacion:'Teatro Gran Rex, CABA',
    latitude:-34.603114,
    longitude:-58.378877
});

aladinEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+aladinEvento.nombre+' guardado con exito.');
});

var tiniEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Tini Quiero Volver Tour',
    descripcion:'Tini llega al Luna Park para presentar su segunda gira "Quiero Volver Tour"',
    fecha:'18/10/19 19hs',
    tipo:'Concierto',
    idUsuarioPropietario:'Time4Fun',
    duracion:'2 Horas',
    genero:'Pop',
    imagen:'https://i.pinimg.com/originals/4a/6d/38/4a6d388d62d2797947eb1f5f396314b9.jpg',
    rating:4.5,
    personas:0,
    precioE:700,
    precios: [{nombre:'PLATEA VIP', precio:'$2500'},
    {nombre:'SUPER PULLMAN CENTRAL', precio:'$2500'},
    {nombre:'PLATEA ELEVADA', precio:'$2200'},
    {nombre:'SUPER PULLMAN LATERAL', precio:'$2000'},
    {nombre:'PLATEA LATERAL', precio:'$1500'},
    {nombre:'PULLMAN LATERAL', precio:'$1100'},
    {nombre:'CABECERA S/N', precio:'$700'}],
    ubicacion:'Luna Park, CABA',
    latitude:-34.602055,
    longitude:-58.368697
});

tiniEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+tiniEvento.nombre+' guardado con exito.');
});

var sealEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Seal',
    descripcion:'SEAL regresa a la Argentina en el marco de su gira Standards, su más reciente producción discográfica',
    fecha:'03/10/19 21hs',
    tipo:'Concierto',
    idUsuarioPropietario:'Time4Fun',
    duracion:'2 Horas',
    genero:'Pop',
    imagen:'https://entradas.quelapaseslindo.com.ar/wp-content/uploads/seal-argentina-2019.jpg',
    rating:4.5,
    personas:0,
    precioE:1400,
    precios: [{nombre:'PLATEA VIP', precio:'$4000'},
    {nombre:'SUPER PULLMAN CENTRAL', precio:'$3500'},
    {nombre:'PLATEA ELEVADA', precio:'$3100'},
    {nombre:'SUPER PULLMAN LATERAL', precio:'$3100'},
    {nombre:'PLATEA LATERAL', precio:'$2600'},
    {nombre:'PULLMAN LATERAL', precio:'$1900'},
    {nombre:'CABECERA S/N', precio:'$1400'}],
    ubicacion:'Luna Park, CABA',
    latitude:-34.602055,
    longitude:-58.368697
});

sealEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+sealEvento.nombre+' guardado con exito.');
});

var saboresEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Caminos y Sabores 15º Edicion',
    descripcion:'El Mercado de los sabores, la Cultura y la Identidad Argentina',
    fecha:'06/07/19 - 09/07/19 12hs',
    tipo:'Exposicion',
    idUsuarioPropietario:'Ciudad BA',
    duracion:'10 Horas',
    genero:'Gastronomia',
    imagen:'http://novedadesaoca.site/wp-content/uploads/2019/02/Imagen2.png',
    rating:3.7,
    personas:0,
    precioE:200,
    precios:[{nombre:'Gaseosa 500cc', precio:'$50'}, {nombre:'Agua 500cc', precio:'$40'}],
    ubicacion:'La Rural, Palermo',
    latitude:-34.578170,
    longitude:-58.420584
});

saboresEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+saboresEvento.nombre+' guardado con exito.');
});

var barEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Musica en Bares Notables',
    descripcion:'Los Cafés y Bares Notables que se hallan diseminados en diversos barrios de la Ciudad de Buenos Aires',
    fecha:'05/07/19 - 31/08/19 18hs',
    tipo:'Exposicion',
    idUsuarioPropietario:'DisfrutemosBA',
    duracion:'',
    genero:'Cultural',
    imagen:'https://media-cdn.tripadvisor.com/media/photo-s/0f/f5/91/83/bar-iberia.jpg',
    rating:3.1,
    personas:0,
    precioE:0,
    precios: [{nombre:'Entrada general', precio:'Gratis'}],
    ubicacion:'Av. de Mayo 1196, CABA',
    latitude:-34.609031,
    longitude:-58.383409
});

barEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+barEvento.nombre+' guardado con exito.');
});

var milongaEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Convocatoria BA Milonga',
    descripcion:'Abierta a quienes impulsen milongas',
    fecha:'21/06/19 - 22/07/19 10hs',
    tipo:'Cultural',
    idUsuarioPropietario:'DisfrutemosBA',
    duracion:'',
    genero:'Espectaculo',
    imagen:'https://www.buenosaires.gob.ar/sites/gcaba/files/field/image/foto_37_0.jpg',
    rating:3.3,
    personas:0,
    precioE:0,
    precios: [{nombre:'Entrada general', precio:'Gratis'}],
    ubicacion:'Av. de Mayo 575, CABA',
    latitude:-34.607977,
    longitude:-58.374413
});

milongaEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+milongaEvento.nombre+' guardado con exito.');
});

var oktoberEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Oktoberfest 2019',
    descripcion:'Fiesta Nacional de la Cerveza',
    fecha:'04/10/19 - 14/10/19',
    tipo:'Festival',
    idUsuarioPropietario:'Oktoberfest',
    duracion:'',
    genero:'Variado',
    imagen:'https://i0.wp.com/www.lawebdelvalle.com/wp-content/uploads/2018/10/oktober-2019.jpg?fit=960%2C640&ssl=1',
    rating:3.9,
    personas:0,
    precioE:300,
    precios: [{nombre:'Entrada general', precio:'$300'},{nombre:'Cerveza', precio:'$200'},{nombre:'Pancho Chucrut', precio:'$200'}],
    ubicacion:'Villa General Belgrano, Cordoba',
    latitude:-34.982599,
    longitude:-64.566771
});

oktoberEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+oktoberEvento.nombre+' guardado con exito.');
});

var lollaEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Lolla Palooza',
    descripcion:'Terrible festival....',
    fecha: '24/03/20',
    tipo:'Festival',
    idUsuarioPropietario:'Time4Fun',
    duracion:'3 Dias',
    genero:'Variado',
    imagen:'https://www.radiocantilo.com/wp-content/uploads/2018/03/descarga.png',
    rating:5,
    personas:0,
    precioE:2500,
    precios: [{nombre:'Entrada general', precio:'$2500'},{nombre:'VIP', precio:'$3500'},{nombre:'Agua 500ml', precio:'$120'},{nombre:'Gaseosa lata', precio:'$100'},{nombre:'Hamburguesa', precio:'$280-320'}],
    ubicacion: 'Hipodromo de San Isidro, San Isidro',
    latitude:-34.480023,
    longitude:-58.507587
});

lollaEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+lollaEvento.nombre+' guardado con exito.');
});

// ACA ARRANCAN LOS EVENTOS CARGADOS POR MATI
var JamEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Jam Session Rock & Blues',
    descripcion:'Jam Session Rock & Blues la cita obligada de grandes exponentes y emergentes artistas. Un momento unico para compartir musica y talento.',
    fecha:'14/07/19',
    tipo:'Concierto',
    idUsuarioPropietario:'Jamfest',
    duracion:'7 Horas',
    genero:'Rock',
    imagen:'https://cdn1.umg3.net/214/files/2015/10/jam41.jpg',
    rating:3.5,
    personas:0,
    precioE: 100,
    precios: [{nombre:'Entrada general', precio:'$100'},{nombre:'Cerveza', precio:'$200'},{nombre:'Hamburguesa', precio:'$160'}],
    ubicacion:'Saavedra 399, Ramos Mejia, Buenos Aires',
    latitude:-34.648198,
    longitude:-58.565609
});

JamEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+JamEvento.nombre+' guardado con exito.');
});

var HHEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Hit Hop Festival',
    descripcion:'Primera edición del festival de HIP HOP mas grande de Luján. Los invitamos a disfrutar de artistas de gran calibre en el Teatro El Galpón Luján (Gral. Belgrano e Hipolito Yrigoyen), puerta 17 hs. Entradas en puerta o podes conseguir tu anticipada comunicándote con alguno de los artistas o cualquiera de estos números: 02323 15 533757 / 02323 15 655666, CUPO LIMITADO ',
    fecha:'20/07/19',
    tipo:'Festival',
    idUsuarioPropietario:'HHfest',
    duracion:'6 Horas',
    genero:'Hit Hop',
    imagen:'https://img.discogs.com/Jjgdajoz5nQTeOWZ7xMKsGN6Rls=/fit-in/225x225/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-3132727-1317278654.jpeg.jpg',
    rating:3.6,
    personas:0,
    precioE: 400,
    precios: [{nombre:'Entrada general', precio:'$400'},{nombre:'Cerveza', precio:'$120'},{nombre:'Hamburguesa', precio:'$130'},
    {nombre:'Gaseosa Seven Up 600 ML', precio:'$55'},{nombre:'Gaseosa Coca Cola 600 ML', precio:'$55'} ],
    ubicacion:'Hipolito Yrigoyen 1592, Lujan, Buenos Aires',
    latitude:-34.576258,
    longitude:-59.103468
});

HHEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+HHEvento.nombre+' guardado con exito.');
});

var ChiEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Chifu ! En el Dioni',
    descripcion:'Seguimos presentando el disco "Cuerpo y Alma" en Lujan, y esta vez en El Dioni, ENTRADA GRATUITA',
    fecha:'19/07/19',
    tipo:'Show',
    idUsuarioPropietario:'Chifest',
    duracion:'3 Horas',
    genero:'Rock',
    imagen:'https://i.ytimg.com/vi/_BlwJ73NaWQ/maxresdefault.jpg',
    rating:3.6,
    personas:0,
    precioE: 0,
    precios: [{nombre:'Entrada general', precio:'$0'},{nombre:'Cerveza', precio:'$135'},{nombre:'Hamburguesa', precio:'$150'},
    {nombre:'Gaseosa Seven Up 600 ML', precio:'$55'},{nombre:'Gaseosa Coca Cola 600 ML', precio:'$55'} ],
    ubicacion:'25 de Mayo 384, Lujan, Buenos Aires',
    latitude:-34.562886,
    longitude:-59.115874
});

ChiEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+ChiEvento.nombre+' guardado con exito.');
});

var TangoEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Peña de Tango y Recalada',
    descripcion:'Como cada mes vuelve la Peña con mas agite del oeste. Sigue la fiesta tanguera que nos encuentra cada mes en  La Fonda Resto Bar. Esta peña no la pueden dejar pasar, Por primera vez  tendremos a los alumnos de la cátedra de Tango de la escuela de Arte José "pipo" Ferrari. Veni a cantar, tocar, bailar, comer, beber y compartir. Miércoles 10 de Julio - 21:00hs en La Fonda Resto Bar - GRATIS. Los Esperamos!!',
    fecha:'10/07/19',
    tipo:'Show',
    idUsuarioPropietario:'Tangofest',
    duracion:'7 Horas',
    genero:'Tango',
    imagen:'https://img.discogs.com/-is-FKOe0l3QKRdb2qbFD777gmY=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-11192948-1511608314-7853.png.jpg',
    rating:4.6,
    personas:0,
    precioE: 0,
    precios: [{nombre:'Entrada general', precio:'$0'},{nombre:'Cerveza', precio:'$135'},{nombre:'Hamburguesa', precio:'$150'},
    {nombre:'Gaseosa Seven Up 600 ML', precio:'$55'},{nombre:'Gaseosa Coca Cola 600 ML', precio:'$55'} ],
    ubicacion:'25 de Mayo 1079, Lujan, Buenos Aires',
    latitude:-34.566105,
    longitude:-59.105811
});

TangoEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+TangoEvento.nombre+' guardado con exito.');
});

var DamasGratisEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Dia del Amigo y 8vo aniversario de complejo CCP',
    descripcion:'Sábado 20 de Julio EL Día del amigo Lo Festejas en Complejo CCP. En su 8° Aniversario, 4 Shows en vivo, con la presencia de Damas Gratis. Pedime tu anticipada!! Para mas informacion comunicarse al (011)6612-0482 ',
    fecha:'20/07/19',
    tipo:'Show',
    idUsuarioPropietario:'DamasGratisfest',
    duracion:'8 Horas',
    genero:'Cumbia',
    imagen:'data:image/jpeg;base64,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',
    rating:2.6,
    personas:0,
    precioE: 150,
    precios: [{nombre:'Entrada general', precio:'$150'},{nombre:'Cerveza', precio:'$135'},{nombre:'Hamburguesa', precio:'$150'},
    {nombre:'Gaseosa Seven Up 600 Ml', precio:'$55'}, {nombre:'Whisky', precio:'$700'}, {nombre:'Abtsolut', precio:'$1200'},{nombre:'Gaseosa Coca Cola 600 Ml', precio:'$55'} ,{nombre:'Botella de agua de 600 Ml', precio:'$90'} ],
    ubicacion:'Lezica y Torrezuri, Lujan, Buenos Aires',
    latitude:-34.559298,
    longitude:-59.120188
});

DamasGratisEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+DamasGratisEvento.nombre+' guardado con exito.');
});

var CreativityEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Workshop "Creatividad e Innovacion con Lego" ',
    descripcion:'Workshop para desplegar tu creatividad mediante la metodologia danesa LEGO. Solicitar informacion adicional para la inscripcion. Vacantes limitadas.',
    fecha:'13/07/19',
    tipo:'Exposicion',
    idUsuarioPropietario:'Creativityfest',
    duracion:'3 Horas 30 minutos',
    genero:'Creatividad',
    imagen:'data:image/jpeg;base64,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',
    rating:2.6,
    personas:0,
    precioE: 180,
    precios: [{nombre:'Entrada general', precio:'$180'},{nombre:'Cerveza', precio:'$135'},
    {nombre:'Gaseosa Seven Up 600 Ml', precio:'$55'},{nombre:'Gaseosa Coca Cola 600 Ml', precio:'$55'} ,{nombre:'Botella de agua de 600 Ml', precio:'$90'} ],
    ubicacion:'Sixto Fernández, Partido de Lomas de Zamora, Buenos Aires',
    latitude:-34.766688,
    longitude:-58.400498
});

CreativityEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+ CreativityEvento.nombre+' guardado con exito.');
});

var DescEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Perfectos Desconocidos ',
    descripcion:'Cuatro amigos de toda la vida y sus respectivas parejas organizan una cena. La dueña de casa propone un juego: que cada uno deje su celular sobre la mesa y todo mensaje o llamada que llegue, sea leído o escuchado por todos, para probar que nadie tiene nada que ocultar. Desde ese momento sorpresas y giros se suceden de manera sostenida. Alternando entre el drama y la comedia, lo hilarante y lo dramático, los secretos de cada uno se irán revelando de forma tal que al final de la velada, nada volverá a ser como era, y los amigos descubrirán que en realidad... eran Perfectos Desconocidos. “Perfectos Desconocidos” es un espectáculo basado en la exitosa película italiana que batió todos los records de audiencia en el mundo. Bajo la dirección de Guillermo Francella y protagonizada por un elenco de primeros actores se ha convertido en uno de los eventos teatrales del año que, a partir del 9 de Agosto recorrerá todo el país, Chile, Uruguay y Paraguay. Su director (Guillermo Francella) es considerado una de las celebridades más influyentes de nuestro país, destacado por sus interpretaciones en películas como “Rudo y Cursi”, “El Secreto de sus Ojos”(Ganadora del Premio Óscar a la mejor película de habla no inglesa), “Corazón de León”, “El Clan”, entre otras. También en series y programas de televisión como “Naranja y Media”, “Poné a Francella”, “Casados con Hijos” y “El Hombre de tu Vida”. En teatro protagonizó “La Cena de los Tontos”, “Los Productores”, “El Joven Frankenstein”, “Los Reyes de la Risa”, “Dos Pícaros Sinvergüenzas” y “Nuestras Mujeres”. Ganador de numerosos premios y reconocimientos a lo largo.',
    fecha:'09/08/19',
    tipo:'Show',
    idUsuarioPropietario:'Descfest',
    duracion:'3 Horas 30 minutos',
    genero:'Comedia',
    imagen:'data:image/jpeg;base64,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 ',
    rating:3.6,
    personas:0,
    precioE: 480,
    precios: [{nombre:'Entrada general', precio:'$480'},{nombre:'Pochoclos', precio:'$135'},
    {nombre:'Gaseosa Seven Up 600 Ml', precio:'$55'},{nombre:'Gaseosa Coca Cola 600 Ml', precio:'$55'} ,{nombre:'Botella de agua de 600 Ml', precio:'$90'} ],
    ubicacion:'España 55, Partido de Lomas de Zamora,, Buenos Aires',
    latitude:-34.771141,
    longitude:-58.40024
});

DescEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+ DescEvento.nombre+' guardado con exito.');
});

var HernanEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Hernan Piquin ',
    descripcion:'Hernán Piquín Entre Boleros y Tangos TEATRO Y DANZA, MÚSICA Y CONCIERTOS Idea y Dirección General: Hernán Piquín, Osmar Odone y Sol Viviano. El prestigioso bailarín presenta, una vez más, todo su arte en un espectáculo que promete deslumbrar con artistas de jerarquía, música, imágenes, vestuario, luces, sonido y una combinación de los boleros que enamoraron al mundo. Con la elegancia, sensualidad y el virtuosismo del tango escenario, logrará junto a sus bailarines y la voz de Agustín Fuertes, llevar a la danza a su máxima expresión, conformando así un espectáculo de nivel Internacional. Con Hernán Piquín, Daiana Chorni, Osmar Odone-Sol Viviano, Sebastián Ripoll-Mariana Bojanich, Arturo Gutiérrez-Lola González y Agustín Fuertes (cantante).',
    fecha:'28/09/19',
    tipo:'Show',
    idUsuarioPropietario:'Hernanfest',
    duracion:'2 Horas 30 minutos',
    genero:'Baile',
    imagen:'data:image/jpeg;base64,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',
    rating:2.6,
    personas:0,
    precioE: 380,
    precios: [{nombre:'Entrada general', precio:'$380'},{nombre:'Pochoclos', precio:'$135'},
    {nombre:'Gaseosa Seven Up 600 Ml', precio:'$55'},{nombre:'Gaseosa Coca Cola 600 Ml', precio:'$55'} ,{nombre:'Botella de agua de 600 Ml', precio:'$90'} ],
    ubicacion:'España 55, Partido de Lomas de Zamora,, Buenos Aires',
    latitude:-34.771141,
    longitude:-58.40024
});

HernanEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+ HernanEvento.nombre+' guardado con exito.');
});

var SinCodiEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Sin Codificar Lomas De Zamora',
    descripcion:'****** ATENCIÓN, CAMBIO DE FECHA NUEVA FECHA SABADO 27 DE JULIO 22,00 HS LAS ENTRADAS ADQUIRIDAS SON VALIDAS PARA LA NUEVA FECHA******* No van a parar de reír con los humoristas del momento “YAYO” GURIDI “PICHU” STRANEO NAZARENO MOTTOLA WALTER LOPEZ MARCELO RUIZ DÍAZ Sinopsis: Los humoristas del momento presentarán un show donde la sucesión de cuadros desopilantes harán reír a todo el público, chicos y grandes, sin parar.Luego del año exitoso en el programa televisivo que cumple 10 años, llegan con todo su humor personajes clásicos como “El Intendente”, “La Rata”, “Los Rebos”, entre otros. ',
    fecha:'27/07/19',
    tipo:'Show',
    idUsuarioPropietario:'SinCodifest',
    duracion:'2 Horas 30 minutos',
    genero:'Comedia',
    imagen:'https://telefe-static.akamaized.net/media/18165080/3.jpg?width=600&height=500&mode=crop&anchor=top ',
    rating:2.6,
    personas:0,
    precioE: 350,
    precios: [{nombre:'Entrada general', precio:'$380'},{nombre:'Pochoclos', precio:'$135'},
    {nombre:'Gaseosa Seven Up 600 Ml', precio:'$55'},{nombre:'Gaseosa Coca Cola 600 Ml', precio:'$55'} ,{nombre:'Botella de agua de 600 Ml', precio:'$90'} ],
    ubicacion:'España 55, Partido de Lomas de Zamora,, Buenos Aires',
    latitude:-34.771141,
    longitude:-58.40024
});

SinCodiEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+ SinCodiEvento.nombre+' guardado con exito.');
});

var roblaEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'La Robla',
    descripcion:'Restaurante de Comida Española',
    fecha: 'Lun a Dom 10 a 22hs',
    tipo:'Gastronomia',
    idUsuarioPropietario:'La Robla',
    duracion:'',
    genero:'Restaurante',
    imagen:'http://laroblapalermo.com.ar/wp-content/uploads/sites/2/2017/01/cropped-cropped-La-Robla__02-1.jpg',
    rating:5,
    personas:0,
    precioE:0,
    precios: [{nombre:'Buñuelitos y Croquetitas', precio:'$100'},
    {nombre:'Pimientos Morrones braseados al Ajillo de Oliva', precio:'$100'},
    {nombre:'Muzarella a la Milanesa (C / Salsa Pizzera y Morrones Braseados)', precio:'$150'},
    {nombre:'Calamar a la Criolla', precio:'$200'},
    {nombre:'ESPAÑOLA (Papa y Cebolla)', precio:'$350'},
    {nombre:'CASTELLANA (Juliana de Jamón, Chorizo ​​Colorado, papa y Cebolla)', precio:'$400'},
    {nombre:'SEVILLANA (Panceta, Arvejas, Verdeo y muzarella)', precio:'$450'},
    {nombre:'VERDE QUE TE QUIERO VERDE (Acelga, Puerro, Rúcula, Cebolla y Muzarella)', precio:'$350'},
    {nombre:'CORUÑENSE (Gruyere, Arvejas y Cebolla)', precio:'$350'},
    {nombre:'Cornalitos frescos Fritos', precio:'$300'},
    {nombre:'Langostinos Empanados con Salsa Aioli', precio:'$400'},
    {nombre:'Rabas de Putamadre', precio:'$600'},
    {nombre:'Mixto de Fritura de Pescados y Papas', precio:'$430'},
    {nombre:'Mejillones a la Provenzal', precio:'$600'},
    {nombre:'Mejillones a la Gallega', precio:'$600'},
    {nombre:'Arroz con Pollo a la Valenciana', precio:'$450'},
    {nombre:'Arroz con Calamares', precio:'$380'},
    {nombre:'Arroz con Mejillones', precio:'$450'},
    {nombre:'Arroz con Camarones', precio:'$400'},
    {nombre:'Arroz con Mariscos', precio:'$420'},
    {nombre:'Callos a la Madrileña (Mondongo)', precio:'$380'},
    {nombre:'Budín de Pan', precio:'$85'},
    {nombre:'Zapallo en Almibar', precio:'$75'},
    {nombre:'Durazno en Almibar', precio:'$75'},
    {nombre:'Natilla Catalana', precio:'$120'},
    {nombre:'Mousse de Chocolate', precio:'$120'},
    {nombre:'Flan Casero', precio:'$100'},
    {nombre:'Flan Completo', precio:'$130'},
    {nombre:'Gaseosa', precio:'$55'},
    {nombre:'Agua Mineral S/G', precio:'$50'},
    {nombre:'Agua saborizada', precio:'$50'},
    {nombre:'Cerveza', precio:'$110'},
    {nombre:'Vino', precio:'$130'}],
    ubicacion: 'Costa Rica 4001, CABA',
    latitude:-34.591251,
    longitude:-58.419206
});

roblaEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+ roblaEvento.nombre+' guardado con exito.');
});

var antaresEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Antares',
    descripcion:'Cerveceria Antares. Pasion por la cerveza',
    fecha: 'Lun a Dom 18 a 22hs',
    tipo:'Bar',
    idUsuarioPropietario:'Antares',
    duracion:'',
    genero:'Restaurante',
    imagen:'https://www.america-retail.com/static//2018/02/antaresarg.png',
    rating:3.8,
    personas:0,
    precioE:0,
    precios: [{nombre:'Kolsch 1/2 pinta', precio:'$60'},
    {nombre:'Porter 1/2 pinta', precio:'$60'},
    {nombre:'Scotch 1/2 pinta', precio:'$65'},
    {nombre:'Honey Beer 1/2 pinta', precio:'$65'},
    {nombre:'Barley wine 1/2 pinta', precio:'$70'},
    {nombre:'India Pale Ale 1/2 pinta', precio:'$65'},
    {nombre:'Playa Grande 1/2 pinta', precio:'$70'},
    {nombre:'Imperial Stout 1/2 pinta', precio:'$70'},
    {nombre:'Cream Stout 1/2 pinta', precio:'$75'}],
    ubicacion: 'Costa Rica 4001, CABA',
    latitude:-34.613373,
    longitude:-58.373349
});

antaresEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+antaresEvento.nombre+' guardado con exito.');
});

var didoEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Dido Tour 2019',
    descripcion:'¡DIDO Por primera vez en Argentina!',
    fecha:'31/10/19 21hs',
    tipo:'Concierto',
    idUsuarioPropietario:'Time4Fun',
    duracion:'2 Horas',
    genero:'Pop',
    imagen:'https://www.vuenosairez.com/images/eventos/dido-en-ar-681311.jpg',
    rating:4.5,
    personas:0,
    precioE:2000,
    precios: [{nombre:'PLATEA VIP', precio:'$4000'},
    {nombre:'SUPER PULLMAN CENTRAL', precio:'$3500'},
    {nombre:'PLATEA ELEVADA', precio:'$3100'},
    {nombre:'SUPER PULLMAN LATERAL', precio:'$3100'},
    {nombre:'PLATEA LATERAL', precio:'$2600'},
    {nombre:'PULLMAN LATERAL', precio:'$2000'},
    {nombre:'CABECERA S/N', precio:'$2000'}],
    ubicacion:'Teatro Coliseo, CABA',
    latitude:-34.596505,
    longitude:-58.383222
});

didoEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+didoEvento.nombre+' guardado con exito.');
});

var superEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Fiesta Supernova',
    descripcion:'Tercera Edición de FIESTA SUPERNOVA en Casa Colombo. Contaremos con los SHOWS EN VIVO de Romapagana y Rey Hindu',
    fecha:'26/07/19 22.30hs',
    tipo:'Festival',
    idUsuarioPropietario:'Time4Fun',
    duracion:'3 Horas',
    genero:'Pop',
    imagen:'https://www.ticketek.com.ar/sites/default/files/styles/artists_list_featured/public/images/show-header/fiestasupernova-show.png?itok=HMeFMoH0',
    rating:3.5,
    personas:0,
    precioE:170,
    precios: [{nombre:'General Anticipadas', precio:'$170'},
    {nombre:'Gaseosas', precio:'$70'},
    {nombre:'Tragos', precio:'$120'},
    {nombre:'Cerveza', precio:'$100'}],
    ubicacion:'Casa Colombo, CABA',
    latitude:-34.602598,
    longitude:-58.412732
});

superEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+superEvento.nombre+' guardado con exito.');
});

var chrisEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Christopher Lawrence',
    descripcion:'Vuelve el experimentado dj productor Christopher Lawrence con un set especial de 5 horas  para festejar con el publico trancero el dia del amigo en Groove !!!!!',
    fecha:'20/07/19 23.59hs',
    tipo:'Festival',
    idUsuarioPropietario:'Time4Fun',
    duracion:'5 Horas',
    genero:'Dance',
    imagen:'https://www.electronicamx.net/images/2018/05/30/Christopher_Lawrence_62_med.jpg',
    rating:3.5,
    personas:0,
    precioE:555,
    precios: [{nombre:'General', precio:'$555'},
    {nombre:'VIP', precio:'$775'},
    {nombre:'Gaseosas', precio:'$70'},
    {nombre:'Tragos', precio:'$120'},
    {nombre:'Cerveza', precio:'$100'}],
    ubicacion:'Groove, CABA',
    latitude:-34.579321,
    longitude:-58.423122
});

chrisEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+chrisEvento.nombre+' guardado con exito.');
});

var ulisesEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Ulises',
    descripcion:'Ulises Bueno vuelve a las pistas a full. No podes perderte el Cuarteto del Bueno, con el artista de mayor crecimiento de los últimos tiempos, que arrasa en las boleterías de Córdoba y Buenos Aires. Vení a bailar, cantar y saltar con Ulises otra vez más.',
    fecha:'08/08/19 21hs',
    tipo:'Concierto',
    idUsuarioPropietario:'Time4Fun',
    duracion:'2 Horas',
    genero:'Cuarteto',
    imagen:'http://www.ticketportal.com.ar/img/eventos/08082019_UlisesBueno.jpg',
    rating:3.5,
    personas:0,
    precioE:500,
    precios: [{nombre:'CAMPO', precio:'$750'},
    {nombre:'SUPER PULLMAN', precio:'$800'},
    {nombre:'PULLMAN LATERAL', precio:'$700'},
    {nombre:'CABECERA S/N', precio:'$500'}],
    ubicacion:'Luna Park, CABA',
    latitude:-34.602055,
    longitude:-58.368697
});

ulisesEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+ulisesEvento.nombre+' guardado con exito.');
});

var erosEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Eros Ramazzotti',
    descripcion:'Agradecido por el cariño de su público, Eros Ramazzotti anunció en sus redes sociales la reprogramación de su gira.',
    fecha:'14/02/20 21hs',
    tipo:'Concierto',
    idUsuarioPropietario:'Time4Fun',
    duracion:'2 Horas',
    genero:'Pop',
    imagen:'https://www.lunapark.com.ar/images/eventos/eventos/5834.jpg?1558555079',
    rating:3.5,
    personas:0,
    precioE:1350,
    precios: [{nombre:'PLATEA PREFERIDA', precio:'$4300'},
    {nombre:'PLATEA ELEVADA', precio:'$4000'},
    {nombre:'SUPER PULLMAN LATERAL', precio:'$3850'},
    {nombre:'PLATEA LATERAL', precio:'$3200'},
    {nombre:'PULLMAN LATERAL', precio:'$2100'},
    {nombre:'CABECERA S/N', precio:'$1350'}],
    ubicacion:'Luna Park, CABA',
    latitude:-34.602055,
    longitude:-58.368697
});

erosEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+erosEvento.nombre+' guardado con exito.');
});

var furiaEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Stand Up Furia',
    descripcion:'Stand up e improvisación con Tato Broda y Natalia De Los Santos.',
    fecha:'13/07/19 21.30hs',
    tipo:'Show',
    idUsuarioPropietario:'Ticketek',
    duracion:'2 Horas',
    genero:'Stand Up',
    imagen:'https://centroculturalmaipu.com.ar/wp-content/uploads/furia.jpg',
    rating:2.8,
    personas:0,
    precioE:350,
    precios: [{nombre:'General', precio:'$350'}],
    ubicacion:'Sirhan, CABA',
    latitude:-34.584994,
    longitude:-58.436883
});

furiaEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+furiaEvento.nombre+' guardado con exito.');
});

var tipicoEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Tipico de George Harris',
    descripcion:'Típico, es la celebración de quiénes somos, de dónde venimos y por qué nos portamos así… No somos mejores, ni peores simplemente diferentes con un pequeño añadido: tenemos la capacidad de reírnos de nosotros mismos, por eso seguimos siendo más felices que el restos.',
    fecha:'21/08/19 20.30hs',
    tipo:'Show',
    idUsuarioPropietario:'Ticketek',
    duracion:'2 Horas',
    genero:'Stand Up',
    imagen:'https://s3.wasabisys.com/georgeharris/2016/11/tipico-2.jpg',
    rating:2.8,
    personas:0,
    precioE:450,
    precios: [{nombre:'PULLMAN', precio:'$450'},
    {nombre:'SUPER PULLMAN', precio:'$600'},
    {nombre:'PLATEA BRONCE LATERAL', precio:'$1100'},
    {nombre:'PLATEA BRONCE', precio:'$1200'},
    {nombre:'PLATEA PLATA', precio:'$1350'},
    {nombre:'PLATEA ORO', precio:'$1350'},
    {nombre:'PLATEA PLATINO', precio:'$1500'}],
    ubicacion:'Teatro Gran Rex, CABA',
    latitude:-34.603114,
    longitude:-58.378877
});

tipicoEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+tipicoEvento.nombre+' guardado con exito.');
});

var peterEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Peter Pan',
    descripcion:'Peter Pan en vacaciones de Invierno!!!',
    fecha:'15/07/19 15.30hs',
    tipo:'Show',
    idUsuarioPropietario:'Ticketek',
    duracion:'2 Horas',
    genero:'Infantil',
    imagen:'https://www.ticketek.com.ar/sites/default/files/images/artist/peterpan-cir-art.png',
    rating:3.8,
    personas:0,
    precioE:330,
    precios: [{nombre:'SILLON ORQUESTA', precio:'$650'},
    {nombre:'PLATEA ALTA', precio:'$500'},
    {nombre:'PLATEA BAJA', precio:'$330'}],
    ubicacion:'Teatro El Círculo, Rosario',
    latitude:-32.952504,
    longitude:-60.635381
});

peterEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+peterEvento.nombre+' guardado con exito.');
});

var jobsEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Jobs Bar',
    descripcion:'Veni a divertirte con amigos',
    fecha: 'Mar a Dom 19 a 3hs',
    tipo:'Bar',
    idUsuarioPropietario:'Jobs Bar',
    duracion:'',
    genero:'Gastronomia',
    imagen:'https://presalida.com/wp-content/uploads/jobs-4.jpg',
    rating:3.8,
    personas:0,
    precioE:0,
    precios: [{nombre:'Ingreso + juegos de mesa + Chopp de ½ litro de cerveza Brahma o gaseosa o agua + Hamburguesa con queso', precio:'$350'},
    {nombre:'Ingreso + juegos de mesa + 1 pizza de muzzarella grande al molde (8 porciones)', precio:'$350'},
    {nombre:'Ingreso + juegos de mesa + Trago directo ½ litro o 2 gaseosas o 2 aguas', precio:'$350'},
    {nombre:'Ingreso + juegos de mesa + 1 litro de cerveza Brahma', precio:'$350'}],
    ubicacion: 'Arenales 2932, CABA',
    latitude:-34.590648,
    longitude:-58.406640
});

jobsEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+jobsEvento.nombre+' guardado con exito.');
});

var cavernEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'The Cavern Buenos Aires',
    descripcion:'Shows en vivo',
    fecha: 'Lun a Dom 10 a 3hs',
    tipo:'Bar',
    idUsuarioPropietario:'The Cavern',
    duracion:'',
    genero:'Gastronomia',
    imagen:'https://media-cdn.tripadvisor.com/media/photo-s/06/e4/fd/77/the-cavern-cafe.jpg',
    rating:3.8,
    personas:0,
    precioE:0,
    precios: [{nombre:'Hamburguesa', precio:'$250'},
    {nombre:'Tragos', precio:'$120'},
    {nombre:'Agua', precio:'$70'},
    {nombre:'Cerveza', precio:'$130'}],
    ubicacion: 'Av. Corrientes 1660, CABA',
    latitude:-34.604087,
    longitude:-58.390160
});

cavernEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+cavernEvento.nombre+' guardado con exito.');
});

var templeEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'The Temple Bar Palermo',
    descripcion:'Para quedarse a vivir. Más que un bar es una casa. Nuestra. Y de uds.',
    fecha: 'Lun a Dom 18 a 2hs',
    tipo:'Bar',
    idUsuarioPropietario:'Temple',
    duracion:'',
    genero:'Gastronomia',
    imagen:'http://barriodepalermo.com.ar/wp-content/uploads/2017/05/540-430-5.jpg',
    rating:3.8,
    personas:0,
    precioE:0,
    precios: [{nombre:'Belgian Blonde', precio:'$160'},
    {nombre:'Temple Honey', precio:'$160'},
    {nombre:'Temple Golden', precio:'$185'},
    {nombre:'Temple Wolf Ipa', precio:'$200'}],
    ubicacion: 'Costa Rica 4677, CABA',
    latitude:-34.587888,
    longitude:-58.426768
});

templeEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+templeEvento.nombre+' guardado con exito.');
});

var anasaEvento = new Evento({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Anasagasti Bar',
    descripcion:'Craft Coktails & Food.',
    fecha: 'Mar a Dom 19 a 2hs',
    tipo:'Bar',
    idUsuarioPropietario:'Anasagasti',
    duracion:'',
    genero:'Gastronomia',
    imagen:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZD4u4rfjqO5ESzGliPe2EGEY2-Ralh2zjAZWZt2wxYUV4lSzH',
    rating:3.8,
    personas:0,
    precioE:0,
    precios: [{nombre:'BLACK HEART Whisky grants - Amaro Montenegro - Tepache con Pimientos Asados - Bitter de Naranja', precio:'$180'},
    {nombre:'PLEGARIA Vodka - Frangelico - Indian Chai Falernum - Pomelo - Mango - Moras', precio:'$200'},
    {nombre:'RUMSPRINGA Bombay Sapphire - Cordial de Arándanos - Almibar de Zapallo y Queso Azul - Polen', precio:'$250'},
    {nombre:'SAUDADE Vodka - Almíbar Floral - Naranja - Espumante - Caviar de Açai - Tuil', precio:'$170'},
    {nombre:'MILKY WAY Monkey Shoulder - Kombucha de Rooibos - Leche Dulce de Cajú Tostado - Soda', precio:'$180'},
    {nombre:'BOTTLED MIST Vodka - Cordial de Pomelo y Coriandro - Sauco - Almíbar de Amarenas - Pepino - Humo de lavanda', precio:'$230'},
    {nombre:'PRÓJIMO Johnnie Walker Black Label - Punt e Mes - Chardonnay - Bitter de Hibiscus - Aceite de Sésamo', precio:'$300'},
    {nombre:'CUENTA GOTAS Gin - Martini Dry de Apio - Aperol - Salmuera de Algas Nori - Bitter de Eucalipto', precio:'$240'},
    {nombre:'FOREST BUBBLES Gin - Christallino - Chartreuse - Limón - Lemon Curd - Almíbar de Tomillo - Burbujas de Pino', precio:'$320'},
    {nombre:'INFUSIÓN Jim Beam Infusionado con Banana - Hennesy Infusionado con Hongos - Martini Bitter Infusionado con Frutilla - Martini Rosso Infusionado con Pimienta Negra', precio:'$340'},
    {nombre:'CHINGON Sauza Silver - Triple Sec - Maracuyá - Cilantro - Azúcar de Chile - Limón', precio:'$285'},
    {nombre:'SIN FRONTERAS Ron - Limón - Ananá - Almíbar de Earl Grey - Absenta - Cerveza Lager', precio:'$290'}],
    ubicacion: 'Psje. Anasagasti 2067, CABA',
    latitude:-34.588589,
    longitude:-58.411394
});

anasaEvento.save(function(err) {
    if (err) throw err;
        
    console.log('Evento '+anasaEvento.nombre+' guardado con exito.');
});

/**** USUARIOS ****/
/*var Usuario = require('./model/Usuario');

var usuario1 = new Usuario({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Gonzalo',
    apellido:'Fernandez',
    username:'gonza_fer',
    email:'gonza89@gmail.com',
    password:'12345678'
});

usuario1.save(function(err) {
    if (err) throw err;
        
    console.log('Usuario guardado con exito.');
});

var usuario2 = new Usuario({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Matias',
    apellido:'Pepe',
    username:'matu_pe',
    email:'matu_pe@gmail.com',
    password:'12345678'
});

usuario2.save(function(err) {
    if (err) throw err;
        
    console.log('Usuario guardado con exito.');
});

var usuario3 = new Usuario({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Susana',
    apellido:'Coronel',
    username:'susicoronel',
    email:'susicoronel@gmail.com',
    password:'12345678'
});

usuario3.save(function(err) {
    if (err) throw err;
        
    console.log('Usuario guardado con exito.');
});

var usuario4 = new Usuario({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Pablo',
    apellido:'Almi',
    username:'pabloal',
    email:'pablo_al@gmail.com',
    password:'pablo'
});

usuario4.save(function(err) {
    if (err) throw err;
        
    console.log('Usuario guardado con exito.');
});*/

// var Comentario = require('./model/Comentario'); 

// var comentario1 = new Comentario({
//     nombreE: lollaEvento.nombre,
//     descripcion:'Buen evento, muy divertido',
//     usuarioId:'matu_pe',
//     eventoId: lollaEvento._id
// });

// comentario1.save(function(err) {
//     if (err) throw err;
        
//     console.log('Comentario guardado con exito.');
// });

// var comentario2 = new Comentario({
//     nombreE: lollaEvento.nombre,
//     descripcion:'Estuvo terrible!! Vuelvo el año que viene...',
//     usuarioId:'gonza_fer',
//     eventoId: lollaEvento._id
// });

// comentario2.save(function(err) {
//     if (err) throw err;
        
//     console.log('Comentario guardado con exito.');
// });

// var comentario3 = new Comentario({
//     nombreE: saboresEvento.nombre,
//     descripcion:'Excelente feria. Muchas ofertas gastronomicas. Super recomendable',
//     usuarioId:'susicoronel',
//     eventoId: saboresEvento._id
// });

// comentario3.save(function(err) {
//     if (err) throw err;
        
//     console.log('Comentario guardado con exito.');
// });