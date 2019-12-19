import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as DocumentPicker from 'expo-document-picker';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset'

export default class GenerarBase2 extends React.Component {
    primer() {
        openFile = async () => {
            const sqliteDirectory = `${FileSystem.documentDirectory}SQLite`;
            //const sqliteDirectory = Asset.fromModule(require('../assets/appgym.db')).uri,
            //`${FileSystem.documentDirectory}SQLite/appgym.db`

            const { exists, isDirectory } = await FileSystem.getInfoAsync(
                sqliteDirectory
            );

            if (!exists) {
                await FileSystem.makeDirectoryAsync(sqliteDirectory);
            }

            const pathToDownloadTo = `${sqliteDirectory}/appgym.db`;

            const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
            console.log(result.uri);
            const copyResult = await FileSystem.copyAsync({
                from: '../assets/appgym.db',
                to: pathToDownloadTo,
            });

            let db = SQLite.openDatabase('appgym.db');
            //  console.log('path',pathToDownloadTo');
            db.transaction(txn => {
                console.log('txn', txn);
                txn.executeSql('SELECT * FROM Ejercicios', [], (txn, rs) => {
                    console.log('executeSql');
                    console.log(rs.rows)
                })
            })

            //console.log(db);
        };
    }
    segundo(){
        openFile = async () => {
        const copyResult = await FileSystem.copyAsync({
            from: Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
            to: `${FileSystem.documentDirectory}SQLite/appgym.db`
          });
          let db = SQLite.openDatabase('appgym.db');
            //  console.log('path',pathToDownloadTo');
            db.transaction(txn => {
                console.log('txn', txn);
                txn.executeSql('SELECT * FROM Ejercicios', [], (txn, rs) => {
                    console.log('executeSql');
                    console.log(rs.rows)
                })
            })
        }
    }
}