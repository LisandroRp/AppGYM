import { Component } from 'react';
//import * as FS  from 'expo-file-system';
import { Asset } from 'expo-asset'
import { SQLite } from "expo-sqlite";
import DocumentPicker from 'expo-document-picker';
//import  SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
//var db = SQLite.openDatabase('AppGYM.db');

function createEjercicio(item) {
    return {
        id: item.id_rutina,
        ejercicio: {},
        dia: item.dia,
        serie: item.series,
        repeticiones: item.repeticiones,
    };
}

class GenerarBase extends Component {

    abrirBase(existeBase) {
        var rutinas = []
        var existe

        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/Vacia.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        
        let db = SQLite.openDatabase('appgym.db');
        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Rutinas', [], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        rutinas.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log(error)
                db._db.close();
               existeBase(existe=false)
            },
            () => {
                console.log("Correcto")
                db._db.close();
               existeBase(existe=true)
            }
        );

    }
    crearBase(okBase){
        let db;
        FileSystem.downloadAsync(
            Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
            `${FileSystem.documentDirectory}/SQLite/appgym.db`
        ).then(db = SQLite.openDatabase('appgym.db'))
        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Rutinas', [], function (tx, res) {
                });
            },
            error => {
                console.log("error")
                db._db.close();
                okBase("error");
            },
            () => {
                console.log("Correcto")
                db._db.close();
                okBase("correcto");
            }
        );
    }
    ejerciciosRutina(listo){
        var rutinas = []
        let db = SQLite.openDatabase('appgym.db');
        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios_Rutina', [], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        rutinas.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log(error)
            },
            () => {
                console.log("Correcto")
                listo(rutinas)
                db._db.close();
            }
        );
    }
    // *****************************************************
    // ********************Ejercicios***********************
    // *****************************************************

    //Trae todos los ejercicios en la screen musculo y musculoAgregar
    traerEjercicios(musculo, okEjercicios) {
        ejercicios = []
        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios where musculo = ?', [musculo], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        ejercicios.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log("Error")
                console.log(error)
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okEjercicios(ejercicios)
            }
        );
    }
    //Trae el ejercicio seleccionado en la screen anterior a la screen ejercicioEspecifico
    traerEjercicioEspecifico(id_ejercicio, okEjercicio) {
        var ejercicioNew
        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios where id_ejercicio = ?', [id_ejercicio], function (tx, res) {
                    ejercicioNew = res.rows._array;
                });
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okEjercicio(ejercicioNew)
            }
        );
    }
    //Trae los ejercicios con su informacion, de la rutina seleccionada en la screen rutinaEspecifica. (JOIN)
    traerEjerciciosRutinaJoin(rutina, listo) {

        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios_Rutina JOIN Ejercicios where Ejercicios_Rutina.id_ejercicio = Ejercicios.id_ejercicio AND Ejercicios_Rutina.id_rutina=?', [rutina.id_rutina], function (tx, res) {
                    rutina.rutina = res.rows._array;
                });
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                listo(rutina)
            }
        );
    }
    hola(rutina, listo) {

        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios_Rutina JOIN Ejercicios JOIN Rutinas where Ejercicios_Rutina.id_ejercicio = Ejercicios.id_ejercicio AND Ejercicios_Rutina.id_rutina = Rutinas.id_rutina', [], function (tx, res) {
                    console.log(res.rows._array)
                });
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                listo(rutina)
            }
        );
    }
    //Favoritear un Ejercicio
    favoritearEjercicio(id_ejercicio, fav, okFavorito) {

        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('UPDATE Ejercicios set favoritos = ? where id_ejercicio = ?', [fav, id_ejercicio])
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okFavorito()
            }
        );
    }

    // *****************************************************
    // ***********************Rutinas***********************
    // *****************************************************

    //Trae todos las rutinas en la screen rutinas
    traerRutinas(tipo_rutina, okRutinas) {
        rutinas = []
        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Rutinas where tipo= ?', [tipo_rutina], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        rutinas.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log(error)
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okRutinas(rutinas)
            }
        );
    }
    //Trae la rutina seleccionada en la screen anterior a la screen rutinaEspecifica
    traerRutinaEspecifica(id_rutina, okRutinas) {
        var rutina
        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Rutinas where id_rutina = ?', [id_rutina], function (tx, res) {
                    rutina = res.rows._array;
                });
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okRutinas(rutina)
            }
        );
    }
    //La agrega o la saca de Favoritos a la rutina seleccionada
    favoritearRutina(id_rutina, fav, okFavorito) {

        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('UPDATE Rutinas set favoritos = ? where id_rutina = ?', [fav, id_rutina])
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okFavorito()
            }
        );
    }
    //Borra a la rutina Seleccionada
    borrarRutina(id_rutina, okRutinaBorrada) {

        const db = SQLite.openDatabase('appgym.db');
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => console.log('Foreign keys turned on')); 

        db.transaction(
            tx => {
                tx.executeSql('DELETE FROM  Rutinas where id_rutina = ?', [id_rutina])
            },
            error => {
                console.log(error)
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okRutinaBorrada()
            }
        );
    }
    //Guarda la rutina en la base de datos (no terminado)
    crearRutina(rutinaNueva, okRutinaCreada){
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO Rutinas (nombre, imagen, dias, favoritos, modificable, tipo) VALUES ( ?, ?, ?, 1, 1, ?)", [rutinaNueva.nombre, rutinaNueva.imagen, rutinaNueva.dias, rutinaNueva.tipo])
            },
            error => {
                console.log(error)
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okRutinaCreada(rutinaNueva)
            }
        );
    }
    conseguirIdRutinaParaGuardar(rutinaNueva, okIdRutina){
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT id_rutina FROM Rutinas where Rutinas.nombre = ? ', [rutinaNueva.nombre], function (tx, res) {
                    rutinaNueva.id_rutina = res.rows._array[0].id_rutina
                    console.log("nombre"+ rutinaNueva.nombre)
                    console.log(res.rows._array[0].id_rutina)
                });
            },
            error => {
                console.log(error)
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                console.log("magiaaaaa" + rutinaNueva.id_rutina)
                db._db.close()
                okIdRutina(rutinaNueva)
            }
        );
    }
    conseguirIdRutinaParaBorrar(nombre, borrarRutina){
        let db = SQLite.openDatabase('appgym.db');
        id_rutina=''
        db.transaction(
            tx => {
                tx.executeSql('SELECT id_rutina FROM Rutinas where Rutinas.nombre = ? ', [nombre], function (tx, res) {
                    id_rutina = res.rows._array[0].id_rutina
                });
            },
            error => {
                console.log(error)
                alert("Algo Salio Mal")
            },
            () => {
                db._db.close()
                borrarRutina(id_rutina)
            }
        );
    }
    crearEjerciciosRutina(rutinaNueva, okEjerciciosRutinaCreados){
        let db = SQLite.openDatabase('appgym.db');
        db.transaction(
            tx => {
                for(i=0; i<rutinaNueva.rutina.length;i++){
                    tx.executeSql("INSERT INTO Ejercicios_Rutina (id_rutina, id_ejercicio, dia, series, repeticiones) VALUES ( ?, ?, ?, ?, ?)", [rutinaNueva.id_rutina, rutinaNueva.rutina[i].id_ejercicio, rutinaNueva.rutina[i].dia, rutinaNueva.rutina[i].series, rutinaNueva.rutina[i].repeticiones])
                    console.log(rutinaNueva.id_rutina, rutinaNueva.rutina[i].id_ejercicio, rutinaNueva.rutina[i].dia, rutinaNueva.rutina[i].series, rutinaNueva.rutina[i].repeticiones)
                }
            },
            error => {
                console.log(error)
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Creados Ejercicios Rutina")
                db._db.close()
                okEjerciciosRutinaCreados()
            }
        );
    }
    borrarEjerciciosRutina(id_rutina, rutinaNueva, seBorraronEjercicios){
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('DELETE FROM  Ejercicios_Rutina where id_rutina = ?', [id_rutina])
            },
            error => {
                console.log(error)
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                seBorraronEjercicios(rutinaNueva)
            }
        );
    }
    // *****************************************************
    // ********************Suplementos**********************
    // *****************************************************

    //Trae todos los suplemetos en la screen Suplementos
    traerSuplementos(okSuplementos) {

        suplementos = []
        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Suplementos', [], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        suplementos.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okSuplementos(suplementos)
            }
        );
    }
    //Trae el suplemento seleccionada en la screen anterior a la screen suplemento especifico
    traerSuplementoEspecifico(id_suplemento, okSuplementos) {

        var suplemento
        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Suplementos where id_suplemento = ?', [id_suplemento], function (tx, res) {
                    suplemento = res.rows._array;
                });
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okSuplementos(suplemento)
            }
        );
    }
    //Favoritear un suplemento
    favoritearSuplemento(id_suplemento, fav, okFavorito) {

        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('UPDATE Suplementos set favoritos = ? where id_suplemento = ?', [fav, id_suplemento])
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okFavorito()
            }
        );
    }

    // *****************************************************
    // ********************Favoritos************************
    // *****************************************************

    //Trae todos los ejercicios que esten en favoritos en la screen EjerciciosFavs
    traerEjerciciosFavoritos(okEjercicios) {
        ejercicios = []
        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios where Ejercicios.favoritos= ?', ["1"], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        ejercicios.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okEjercicios(ejercicios)
            }
        );
    }
    //Trae todos los suplementos que esten en favoritos en la screen SumplementosFavs
    traerSuplementosFavoritas(okSuplementos) {
        suplementos = []
        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Suplementos where Suplementos.favoritos= ?', ["1"], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        suplementos.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okSuplementos(suplementos)
            }
        );
    }
    //Trae todos las rutinas que esten en favoritos en la screen RutinasFavs
    traerRutinasFavoritas(okRutinas) {
        rutinas = []
        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Rutinas where Rutinas.favoritos= ?', ["1"], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        rutinas.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okRutinas(rutinas)
            }
        );
    }







    //No se usa
    //Trae los ejercicios de la rutina seleccionada en la screen rutinaEspecifica
    traerEjerciciosRutina(rutina, okEjercicios) {
        var ejercicios = []
        FileSystem.downloadAsync(
            Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
            `${FileSystem.documentDirectory}/SQLite/appgym.db`
        );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios_Rutina where id_rutina = ?', [rutina.id_rutina], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        ejercicios.push(res.rows._array[i]);
                        console.log(ejercicios)
                    }
                });
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                rutina.rutina = ejercicios
                okEjercicios(rutina)
            }
        );
    }
    //No se usa
    traerEjercicioEspecificoRutina(rutinaEjercicios, rutinaTotal, okEjercicio) {
        var ejercicio = createEjercicio(rutinaEjercicios)
        var ejercicio2
        FileSystem.downloadAsync(
            Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
            `${FileSystem.documentDirectory}/SQLite/appgym.db`
        );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios where id = ?', [rutinaEjercicios.id_ejercicio], function (tx, res) {
                    ejercicio2 = res.rows._array;
                });
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okEjercicio(rutinaTotal, ejercicio, ejercicio2)
            }
        );
    }
    //No se usa
    tirarMagia(ejercicio, rutina, okTodo) {
        okTodo(rutina, ejercicio)
    }
}
export default new GenerarBase();
