import { Component } from 'react';
//import * as FS  from 'expo-file-system';
import {Asset} from 'expo-asset'
import { SQLite } from "expo-sqlite";
import  DocumentPicker from 'expo-document-picker';
//import  SQLite from 'expo-sqlite';
import  * as FileSystem from 'expo-file-system';
//var db = SQLite.openDatabase('AppGYM.db');

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

    MiBase = async () => {
        const dbTest = SQLite.openDatabase('dummy.db');
        try {
            await dbTest.transaction(tx => tx.executeSql(''));
        } catch (e) {
            if (this.state.debugEnabled) console.log('error while executing SQL in dummy DB');
        }
        this.AbrirTabla()
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

    AbrirTabla() {
        const ejercicios= [];  
        FileSystem.downloadAsync(
            Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
            `${FileSystem.documentDirectory}/SQLite/appgym.db`
        );
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(  
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios', [], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        console.log('item:', res.rows._array[i]);
                        ejercicios.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log("Error")
            },
            () => {
                console.log("Correcto")
                console.log(ejercicios+'hola')
                return ejercicios;
            }
        );
    }

    // openFile = async () => {
    //     const sqliteDirectory = `${FileSystem.documentDirectory}SQLite`;

    //     const { exists, isDirectory } = await FileSystem.getInfoAsync(
    //      sqliteDirectory
    //    );

    // if (!exists) {
    //      await FileSystem.makeDirectoryAsync(sqliteDirectory);
    //    }
    //    console.log('hola')
    //    const pathToDownloadTo = `${sqliteDirectory}/AppGYM.db`;
    //    const result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory:false});
    // console.log(result.uri);
    //    const copyResult = await FileSystem.copyAsync({
    //      from: result.uri,
    //      to: pathToDownloadTo,
    //    });

    //    let db = SQLite.openDatabase('AppGYM.db');
    //  //  console.log('path',pathToDownloadTo');
    //    db.transaction(txn => {
    //      console.log('txn',txn);
    //      txn.executeSql('SELECT * FROM Ejercicios', [], (txn, rs) => {
    //        console.log('executeSql');
    //        console.log(rs.rows)
    //      })
    //    })

    //    //console.log(db);
    //  };

}
export default new GenerarBase();
