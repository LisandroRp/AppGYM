import { Component } from 'react';
import * as FS  from 'expo-file-system';
import Asset from 'expo-asset'
import { SQLite } from "expo-sqlite";
var db = SQLite.openDatabase('AppGYM.db');

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

    MiBase = async () =>{
            const dbTest = SQLite.openDatabase('dummy.db');
            try {
                await dbTest.transaction(tx => tx.executeSql(''));
            } catch(e) {
                if (this.state.debugEnabled) console.log('error while executing SQL in dummy DB');
            }
            FS.downloadAsync(
                Asset.fromModule(require("./AppGYM.db")).uri,
                `${FS.documentDirectory}SQLite/AppGYM.db`
              )
              console.log("caca")
            .then(function(){
           
                let db = SQLite.openDatabase('AppGYM.db');
                db.transaction(function (tx) {
                    tx.executeSql('SELECT * FROM `Ejercicios`', [], function (tx, res) {
                        for (let i = 0; i < res.rows.length; ++i) {
                            console.log('item:', res.rows.item(i));
                        }
                    });
                });
            })
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
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM `Ejercicios`', [], function (tx, res) {
                for (let i = 0; i < res.rows.length; ++i) {
                    console.log('item:', res.rows.item(i));
                }
            });
            tx.executeSql('SELECT * FROM `ejercicios`', [], function (tx, res) {
                for (let i = 0; i < res.rows.length; ++i) {
                    console.log('item:', res.rows.item(i));
                }
            });
        });
    }

}
export default new GenerarBase();
