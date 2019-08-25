import { Component } from 'react';

  var ip = '172.20.10.5';
 //var ip = '192.168.1.110';
 //var ip = '172.20.10.8';
var url = 'http://'+ip+':8080/apiAppEventos';

class ApiController extends Component {

    getEventos(okEventos) {
        let uri = url+'/getEventos'
        fetch(uri).then(res => {
            return res.json()
        }).catch((err) => alert("Intentar de nuevo")).
            then(data => {
                okEventos(data);
            }).catch((err) => alert("Intentar de nuevo"));
    }

    votar(eventoId,votos,rating, personas, okVote) {
        let uri = url+'/votarEvento/Evento'
        fetch(uri, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventoId: eventoId, votos: votos, rating:rating, personas:personas}),
        }).then((res) => {
            return res.json();
        }).catch((err) => console.log(err)).then((res) => {
            okVote();
        }).catch((err) => console.log(err));
    }

    getDetalle(okDetalle, id) {
        let uri = url+'/getEventoById?id=' + id
        fetch(uri).then(res => {
            return res.json()
        }).catch((err) => console.log(err)).
            then(data => {
                okDetalle(data);
            }).catch((error) => console.log(error));
    }
    getComentarioByEvento(okComentario, id) {
        let uri = url+'/getComentariosByEvento?eventoId=' + id
        fetch(uri).then(res => {
            return res.json()
        }).catch((err) => {
            console.log(err)
        }).
            then(data => {
                okComentario(data);
            }).catch((err => {
                console.log(err);
                alert("No existen Comentarios");
            }));
    }

    insertUsuario(name, lastName, email, user, password, okCreate) {
        let uri = url+'/insertUsuario/Usuario'
        fetch(uri, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: name,
                apellido: lastName,
                email: email,
                username: user,
                password: password,
            })
        }).then((res) => {
            return res.json();
        }).catch((err) => console.log(err)).then((res) => {
            okCreate();
        }).catch((err) => console.log(err))

    }

    changePassword(user, pass, okChange) {
        let uri = url+'/updateUsuarioByPassword/Usuario'
        fetch(uri, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass }),
        }).then((res) => {
            return res.json();
        }).catch((err) => console.log(err)).then((res) => {
            okChange();
        }).catch((err) => console.log(err));
    }

    deleteComentario(id, okDelete) {
        let uri = url+'/deleteComentarioById?id=' + id
        fetch(uri).then(res => {
            return res.json()
        }).catch((err) => {
            console.log(err)
        }).
            then(data => {
                okDelete(data);
            }).catch((err => {
                console.log(err);
                alert("No existen Comentarios");
            }));
    }

    saveGenre(user, generoEvento, okChange) {
        let uri = url+'/updateUsuarioByGeneroEvento/Usuario'
        fetch(uri, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, generoEvento: generoEvento }),
        }).then((res) => {
            return res.json();
        }).catch((err) => console.log(err)).then((res) => {
            okChange();
        }).catch((err) => console.log(err));
    }

    saveTipo(user, tipo, okChange) {
        let uri = url+'/updateUsuarioByTipoEvento/Usuario'
        fetch(uri, {
            method: 'POST',
            mode: "cors",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, tipo: tipo }),
        }).then((res) => {
            return res.json();
        }).catch((err) => console.log(err)).then((res) => {
            okChange();
        }).catch((err) => console.log(err));
    }

    getUsuario(okUsuario, username) {
        let uri = url+'/getUsuarioByUsername?username=' + username
        
        fetch(uri).then(res => {
            return res.json()
        }).catch((err) => {
            console.log(err)

        }).
            then(data => {
                okUsuario(data);
            }).catch((err => {
                console.log(err);
                alert("No existe el usuario");
            }));
    }

    getCoordenadas(direccion,okCoordenadas) {
        let urigoogle = 'https://maps.googleapis.com/maps/api/geocode/json?address='+direccion+'&key=AIzaSyAc6UPN08xNQGIFMfkYGFhfKqD3f3bNc-w'
        
        fetch(urigoogle).then(res => {
            return res.json()
        }).catch((err) => {
            console.log(err)

        }).
            then(data => {
                okCoordenadas(data);
            }).catch((err => {
                console.log(err);
                alert("No existe la direccion");
            }));
    }

    createComment(idUsuario, idEvento, descripcion, nombre, okComentario) {
        let uri =url+'/insertComentario/Comentario'
        fetch(uri, {
            method: 'POST',
            mode: "cors",
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                nombreE: nombre,
                descripcion: descripcion,
                usuarioId: idUsuario,
                eventoId: idEvento, 
            })
        }).then((res) => {
            return res.json();
        }).catch((err) => console.log(err)).then((res) => {
            okComentario();
        }).catch((err) => console.log(err))
    }

    getCommentByIdUser(userId, okComentario) {
        let uri = url+'/getComentariosByUsuario?usuarioId=' + userId
        fetch(uri).then(res => {
            return res.json()
        }).catch((err) => {
            console.log(err)
        }).
            then(data => {
                okComentario(data);
            }).catch((err => {
                console.log(err);
                alert("No existen Comentarios");
            }));
    }

}

export default new ApiController();