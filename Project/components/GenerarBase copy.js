import { Component } from 'react';
//import * as FS  from 'expo-file-system';
import {Asset} from 'expo-asset'
import { SQLite } from "expo-sqlite";
import  DocumentPicker from 'expo-document-picker';
//import  SQLite from 'expo-sqlite';
import  * as FileSystem from 'expo-file-system';
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

    CrearTodo() {

        db.transaction(function (tx) {
            // Create the table and define the properties of the columns
            tx.executeSql('CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))', []);
            // Insert a record
            tx.executeSql('INSERT INTO Users (name) VALUES (:name)', ['papa']);

            // Insert another record
            tx.executeSql('INSERT INTO Users (name) VALUES (:name)', ['mama']);

            // Select all inserted records, loop over them while printing them on the console.
            tx.executeSql('SELECT * FROM `users`', [], function (tx, res) {
                for (let i = 0; i < res.rows.length; ++i) {
                    console.log('item:', res.rows.item(i));
                }
            });
        });
    }
    BorrarTabla() {
        db.transaction(function (tx) {
            // Drop the table if it exists
            tx.executeSql('DROP TABLE IF EXISTS Users', []).then(res => {
                return res.json()
            }).catch((err) => {
                console.log(err)
            });;
        });
    }

    traerEjercicios(musculo, okEjercicios) {
        ejercicios=[],
        FileSystem.downloadAsync(
            Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
            `${FileSystem.documentDirectory}/SQLite/appgym.db`
        );
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
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okEjercicios(ejercicios)
            }
        );
    }
    traerRutinas(okRutinas) {
        rutinas=[],
        FileSystem.downloadAsync(
            Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
            `${FileSystem.documentDirectory}/SQLite/appgym.db`
        );
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
    traerSuplementos(okSuplementos) {
        suplementos=[],
        FileSystem.downloadAsync(
            Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
            `${FileSystem.documentDirectory}/SQLite/appgym.db`
        );
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
    traerEjercicioEspecifico(ejercicio, okEjercicio){
        var ejercicioNew
        FileSystem.downloadAsync(
            Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
            `${FileSystem.documentDirectory}/SQLite/appgym.db`
        );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(  
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios where id = ?', [ejercicio], function (tx, res) {
                        ejercicioNew= res.rows._array;
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
    traerRutinaEspecifica(rutina, okRutinas){
        var rutina
        FileSystem.downloadAsync(
            Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
            `${FileSystem.documentDirectory}/SQLite/appgym.db`
        );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(  
            tx => {
                tx.executeSql('SELECT * FROM Rutinas where id = ?', [rutina], function (tx, res) {
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
    traerEjerciciosRutina(rutina, okEjercicios){
        var ejercicios= []
        FileSystem.downloadAsync(
            Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
            `${FileSystem.documentDirectory}/SQLite/appgym.db`
        );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(  
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios_Rutina where id_rutina = ?', [rutina.id], function (tx, res) {
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
                rutina.rutina=ejercicios
                okEjercicios(rutina)
            }
        );
    }
    traerEjercicioEspecificoRutina(rutinaEjercicios,rutinaTotal, okEjercicio){
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
                    ejercicio2= res.rows._array;
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
    tirarMagia(ejercicio,rutina,okTodo){
        okTodo(rutina, ejercicio)
    }
    traerSuplementoEspecifico(okSuplementos){

    }
}
export default new GenerarBase();
