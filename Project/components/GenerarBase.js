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

    abrirBase() {
        var rutinas = []
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
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                //console.log(rutinas)
                db._db.close()
                if (rutinas.length == 0) {
                    console.log("caca")
                    FileSystem.downloadAsync(
                        Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
                        `${FileSystem.documentDirectory}/SQLite/appgym.db`
                    );
                }
            }
        );

    }
    // *****************************************************
    // ********************Ejercicios***********************
    // *****************************************************

    //Trae todos los ejercicios en la screen musculo y musculoAgregar
    traerEjercicios(id_musculo, okEjercicios) {
        ejercicios = []
        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios where musculo = ?', [id_musculo], function (tx, res) {
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

    // *****************************************************
    // ***********************Rutinas***********************
    // *****************************************************

    //Trae todos las rutinas en la screen rutinas
    traerRutinas(okRutinas) {
        rutinas = []
        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
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
    cargarRutinasFavorito(id_rutina, fav, okFavorito) {

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

        // FileSystem.downloadAsync(
        //     Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
        //     `${FileSystem.documentDirectory}/SQLite/appgym.db`
        // );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('DELETE FROM  Rutinas where id_rutina = ?', [id_rutina])
            },
            error => {
                console.log("Error")
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okRutinaBorrada()
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

    // *****************************************************
    // ********************Favoritos************************
    // *****************************************************
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
    //Trae todos las rutinas que esten en favoritos en la screen rutinas
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
