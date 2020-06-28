import { Component, version } from 'react';
import { Asset } from 'expo-asset'
import { AsyncStorage } from 'react-native';
import * as SQLite from 'expo-sqlite'

import * as FileSystem from 'expo-file-system';

class GenerarBase extends Component {

    abrirBase(existeBase) {

        var configuracion
        var existe

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Configuracion', [], function (tx, res) {
                    configuracion = res.rows._array[0];
                });
            },
            error => {
                console.log("Error en Abrir Base")

                db._db.close();
                existeBase(existe = false, null, null)
            },
            () => {
                console.log("Correcto")
                db._db.close();
                existeBase(existe = true, configuracion.id_idioma, configuracion.version)
            }
        );

    }
    crearBase(okBase) {
        let db;

        FileSystem.downloadAsync(
            Asset.fromModule(require('../assets/db/AppGYM.db')).uri,
            `${FileSystem.documentDirectory}/SQLite/appgym.db`
        ).then(db = SQLite.openDatabase('appgym.db'));
        db._db.close()
            setTimeout(function(){

            //Put All Your Code Here, Which You Want To Execute After Some Delay Time.

            okBase()
      
          }, 5000);

    }
    guardarConfiguracion(id_idioma, version, okVersion) {

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql("UPDATE Configuracion set id_idioma = ?, version = ?", [id_idioma, version])
            },
            error => {
                //console.log("Error en guardarConfiguracion")
                console.log("Error en guardarConfiguracion" + error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto Configuracion Guardada")
                db._db.close()
                okVersion(id_idioma)
            }
        );
    }
    // *****************************************************
    // **********************M.Idioma*************************
    // *****************************************************

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('id_idioma');
            if (value !== null) {
                return value
            }
        } catch (error) {
            console.log(error);
        }
    };

    traerIdIdioma(okIdIdioma) {

        var id_idioma

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT id_idioma FROM Configuracion', [], function (tx, res) {
                    id_idioma = res.rows._array[0].id_idioma;
                });
            },
            error => {
                db._db.close()
                console.log(error)
            },
            () => {
                console.log("Correcto id_idioma "+ id_idioma)
                db._db.close();
                okIdIdioma(id_idioma)
            }
        );
    }
    traerIdIdiomaSideMenu = async () => {

        var id_idioma

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT id_idioma FROM Configuracion', [], function (tx, res) {
                    id_idioma = res.rows._array[0].id_idioma;
                });
            },
            error => {
                db._db.close()
                console.log(error)
            },
            () => {
                console.log("Correcto id_idioma Side Menu " + id_idioma)
                db._db.close();
                return id_idioma.toString()
            }
        );
    }

    storeIdIdioma(_storeData) {

        var id_idioma

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT id_idioma FROM Configuracion', [], function (tx, res) {
                    _storeData(res.rows._array[0].id_idioma);
                });
            },
            error => {
                console.log(error)
            },
            () => {
                console.log("Correcto id_idioma")
                db._db.close();
            }
        );
    }

    traerIdIdiomaRaro = async () => {

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT id_idioma FROM Configuracion', [], (tx, res) => {
                    return res.rows._array[0].id_idioma
                }
                )
            }
        );
    }
    traerIdioma(okNombreIdioma) {

        var idioma

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT i.id_idioma, i.nombre_idioma FROM Configuracion c JOIN Idiomas i'
                    + ' ON c.id_idioma = i.id_idioma', [], function (tx, res) {
                        idioma = res.rows._array[0];
                    });
            },
            error => {
                console.log(error)
            },
            () => {
                console.log("Correcto")
                db._db.close();
                okNombreIdioma(idioma)
            }
        );
    }
    setIdioma(id_idioma, okIdIdioma) {
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('UPDATE Configuracion set id_idioma = ?', [id_idioma])
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okIdIdioma(id_idioma)
            }
        );
    }
    // *****************************************************
    // **********************M.Traer*************************
    // *****************************************************

    //Trae todos los ejercicios propios para la siguiente version
    traerEjerciciosPropiasParaGuardar(okEjercicios){

        var ejercicios = []

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios e WHERE e.modificable = 1', [], function (tx, res) {
                    for (let i = 0; i < res.rows.length; i++) {
                        ejercicios.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log("error al traer Ejercicios propios")
                db._db.close()
            },
            () => {
                console.log("Correcto Ejercicios Propios")
                db._db.close()
                okEjercicios(ejercicios)
            }
        );
    }
    //Trae todos los ejercicios propios para la siguiente version
    traerRutinasPropiasParaGuardar(okRutinas){

        var rutinas = []

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Rutinas r WHERE r.modificable = 1', [], function (tx, res) {
                    for (let i = 0; i < res.rows.length; i++) {
                        rutinas.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log("error al traer rutinas propias")
                db._db.close()
            },
            () => {
                console.log("Correcto Rutinas Propias")
                db._db.close()
                okRutinas(rutinas)
            }
        );
    }
    //Trae todos los ejerciciosRutinas propios para la siguiente version
    traerEjerciciosRutinaParaGuardar(okEjerciciosRutina){

        var ejerciciosRutina = []

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios_Rutina er WHERE er.id_rutina IN (SELECT id_rutina FROM Rutinas r WHERE r.modificable = 1)', [], function (tx, res) {
                    for (let i = 0; i < res.rows.length; i++) {
                        ejerciciosRutina.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log("error al traer ejerciciosRutinas propios")
                db._db.close()
            },
            () => {
                console.log("Correcto Ejercicios Rutina Propio")
                db._db.close()
                okEjerciciosRutina(ejerciciosRutina)
            }
        );
    }
    traerConfiguracion(okConfiguracion) {

        var configuracion = {}

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Configuracion', [], function (tx, res) {
                    configuracion = res.rows._array[0];
                });
            },
            error => {
                console.log("error al traer configuracion propios")
                db._db.close()
            },
            () => {
                console.log("Correcto Configuracion  Propio")
                db._db.close()
                okConfiguracion(configuracion)
            }
        );
    }
    traerPerfil(okPerfil) {

        var perfil = {}

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Perfil', [], function (tx, res) {
                    perfil = res.rows._array[0];
                });
            },
            error => {
                console.log("error al traer perfil propios")
                console.log(error)
                db._db.close();
            },
            () => {
                console.log("Correcto Perfil Propio")
                db._db.close();
                okPerfil(perfil)
            }
        );
    }
    // *****************************************************
    // ********************M.Actualizar*********************
    // *****************************************************

    actualizarEjercicios(ejercicios, ejerciciosRutina, maxId, okEjerciciosGuardados){

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                for (var i = 0; i < ejercicios.length; i++) {
                    tx.executeSql("INSERT INTO Ejercicios (id_ejercicio, id_idioma, id_musculo, id_elemento, nombre_ejercicio, descripcion, ejecucion, favoritos, modificable)"
                        + " VALUES (((Select MAX(id_ejercicio) FROM Ejercicios)+1), 0, ?, ?, ?, ?, ?, ?, 1)", [ejercicios[i].id_musculo, ejercicios[i].id_elemento, ejercicios[i].nombre_ejercicio, ejercicios[i].descripcion, ejercicios[i].ejecucion, ejercicios[i].favoritos])
                for(var j = 0; j < ejerciciosRutina.length; j++){
                    if(ejerciciosRutina[j].id_ejercicio == ejercicios[i].id_ejercicio){
                        ejerciciosRutina[j].id_ejercicio = (maxId.id_ejercicio+1)
                    }
                }
                maxId.id_ejercicio ++
            }
        },
            error => {
                console.log(error)
                db._db.close();
            },
            () => {
                console.log("Correcto Ejercicios");
                db._db.close();
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    okEjerciciosGuardados(ejerciciosRutina)
              
                  }, 2000)
            }
        )
    }

    actualizarRutinas(rutinas, ejerciciosRutina, maxId, okRutinasGuardadas){

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                for (var i = 0; i < rutinas.length; i++) {
                    tx.executeSql("INSERT INTO Rutinas (id_rutina, id_creador, id_tipo, nombre_rutina, nombre_rutina_es, nombre_rutina_en, dias, favoritos, modificable)"
                        + " VALUES (((SELECT MAX(id_rutina) FROM Rutinas)+1), ?, ?, ?, ?, ?, ?, ?, ?)", [rutinas[i].id_creador, rutinas[i].id_tipo, rutinas[i].nombre_rutina, rutinas[i].nombre_rutina_es, rutinas[i].nombre_rutina_en, rutinas[i].dias, rutinas[i].favoritos, rutinas[i].modificable])
                   
                        for(var j = 0; j < ejerciciosRutina.length; j++){

                            if(ejerciciosRutina[j].id_rutina == rutinas[i].id_rutina){

                                ejerciciosRutina[j].id_rutina = (maxId.id_rutina + 1)
                            }
                        }
                        maxId.id_rutina ++

                }
            },
            error => {
                console.log(error)
                db._db.close();
            },
            () => {
                console.log("Correcto Rutina");
                db._db.close()
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    okRutinasGuardadas(ejerciciosRutina)
              
                  }, 5000)
            }
        )
    }
    actualizarEjerciciosRutina(ejerciciosRutina, okEjerciciosRutinaGuardadas){

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                for (var i = 0; i < ejerciciosRutina.length; i++) {
                    tx.executeSql("INSERT INTO Ejercicios_Rutina (id_rutina, id_ejercicio, dia, series, repeticiones, combinado, tiempo, posicion)"
                        + " VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [ejerciciosRutina[i].id_rutina, ejerciciosRutina[i].id_ejercicio, ejerciciosRutina[i].dia, ejerciciosRutina[i].series, ejerciciosRutina[i].repeticiones, ejerciciosRutina[i].combinado, ejerciciosRutina[i].tiempo, ejerciciosRutina[i].posicion])
                }
            },
            error => {
                console.log(error)
                db._db.close();
            },
            () => {
                console.log("Correcto Ejercicios Rutina");
                db._db.close()
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    okEjerciciosRutinaGuardadas()
              
                  }, 3000)
            }
        )
    }
    actualizarPerfil(perfil, okPerfil){

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO Perfil (caloriasBase, caloriasEjercicio, caloriasTotal, id_objetivo, id_experiencia, edad, peso) VALUES ( ?, ?, ?, ?, ?, ?, ?)", [Math.floor(perfil.caloriasBase), Math.floor(perfil.caloriasEjercicio), Math.floor(perfil.caloriasTotal), perfil.id_objetivo, perfil.id_experiencia, perfil.edad, perfil.peso])
            },
            error => {
                console.log(error)
                db._db.close();
            },
            () => {
                console.log("Correcto Perfil");
                db._db.close();
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    okPerfil()
              
                  }, 1000)
            }
        )
    }
    actualizarConfiguracion(configuracion, version, okConfiguracion){

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('UPDATE Configuracion set id_idioma = ?, version = ?', [configuracion.id_idioma, version])
            },
            error => {
                console.log(error)
                db._db.close();
            },
            () => {
                console.log("Correcto Configuracion");
                db._db.close();
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    okConfiguracion()
              
                  }, 1000)
                
            }
        )
    }
    // *****************************************************
    // **********************Planes*************************
    // *****************************************************

    traerInfo(id_experiencia, id_objetivo, okExperiencia) {
        var experiencia
        var objetivo

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Experiencia where id_experiencia = ?', [id_experiencia], function (tx, res) {
                    experiencia = res.rows._array[0];
                });
            },
            error => {
                db._db.close()
                console.log(error)
                alert("Algo Salio Mal")
            },
            () => {
                db._db.close()
                console.log("Correcto")
            }
        );

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Objetivo where id_objetivo = ?', [id_objetivo], function (tx, res) {
                    objetivo = res.rows._array[0];
                });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okExperiencia(experiencia, objetivo)
            }
        );
    }

    traerPlan(okPlan) {
        var perfil = []
        var flag = false
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Perfil p JOIN experiencia e ON p.id_experiencia = e.id_experiencia JOIN objetivo o ON p.id_objetivo = o.id_objetivo WHERE o.id_idioma = (SELECT id_idioma FROM Configuracion) AND e.id_idioma = (SELECT id_idioma FROM Configuracion)', [], function (tx, res) {
                        perfil = res.rows._array[0];
                });
            },
            error => {
                console.log(error)
                db._db.close()
            },
            () => {
                console.log("Correcto")
                db._db.close();
                
                if (perfil != null) {
                    okPlan(perfil, perfil.id_idioma)
                } else {
                    okPlan(null, null)
                }
            }
        );
    }
    guardarPlan(calorias, objetivo, experiencia, edad, peso, mostrarPlan) {

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO Perfil (caloriasBase, caloriasEjercicio, caloriasTotal, id_objetivo, id_experiencia, edad, peso) VALUES ( ?, ?, ?, ?, ?, ?, ?)", [Math.floor(calorias.caloriasBase), Math.floor(calorias.caloriasEjercicio), Math.floor(calorias.caloriasTotal), objetivo, experiencia, edad, peso])
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal al Crear Plan")
            },
            () => {
                console.log("Correcto plan creado")
                db._db.close()
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    mostrarPlan()
              
                  }, 2000) 
            }
        );

    }
    cambiarPlan(calorias, objetivo, experiencia, edad, peso, mostrarPlan) {
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('UPDATE Perfil set caloriasBase = ?, caloriasEjercicio = ?, caloriasTotal = ?, id_objetivo = ?, id_experiencia = ?, edad = ?, peso = ? where id_perfil = 1', [Math.floor(calorias.caloriasBase), Math.floor(calorias.caloriasEjercicio), Math.floor(calorias.caloriasTotal), objetivo, experiencia, edad, peso])
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal al Actualizar Plan")
            },
            () => {
                console.log("Correcto Plan Actualizado")
                db._db.close()
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    mostrarPlan()
              
                  }, 2000) 
            }
        );
    }

    // *****************************************************
    // ********************M.Ejercicios***********************
    // *****************************************************

    traerMusculos(okMusculos) {
        var musculos = []

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Ejercicios_Musculo m JOIN Configuracion c ON m.id_idioma = c.id_idioma', [], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        musculos.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto Musuclos")
                db._db.close()
                okMusculos(musculos)

            }
        );
    }
    //Trae todos los ejercicios en la screen musculo y musculoAgregar
    traerEjercicios(id_musculo, okEjercicios) {

        var ejercicios = []

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT ej.id_idioma, ej.id_ejercicio, ej.id_musculo, ej.nombre_ejercicio, ej.favoritos, ej.modificable, el.nombre_elemento'
                    + ' FROM Ejercicios ej JOIN Ejercicios_Elemento el ON ej.id_elemento = el.id_elemento'
                    + ' WHERE ej.id_musculo = ? AND (ej.id_idioma = (SELECT id_idioma FROM Configuracion) OR ej.id_idioma = 0) AND el.id_idioma = (SELECT id_idioma FROM Configuracion)', [id_musculo], function (tx, res) {
                        for (let i = 0; i < res.rows.length; i++) {
                            ejercicios.push(res.rows._array[i]);
                        }
                    });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                    okEjercicios(ejercicios)
            }
        );
    }
    //Traer los ejercicios favoritos de un musculo seleccionado
    traerEjerciciosMusculoFavs(id_musculo, listo) {
        var ejercicios = []

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT ej.id_idioma, ej.id_ejercicio, ej.id_musculo, ej.nombre_ejercicio, ej.favoritos, ej.modificable, el.nombre_elemento' +
                    ' FROM Ejercicios ej JOIN Ejercicios_Elemento el ON ej.id_elemento = el.id_elemento WHERE ej.id_musculo = ? AND ej.favoritos = 1 AND (ej.id_idioma = (SELECT id_idioma FROM Configuracion) OR ej.id_idioma = 0) AND el.id_idioma = (SELECT id_idioma FROM Configuracion)', [id_musculo], function (tx, res) {
                        for (let i = 0; i < res.rows.length; ++i) {
                            ejercicios.push(res.rows._array[i]);
                        }
                    });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                setTimeout(function(){

                    listo(ejercicios)
              
                  }, 1000) 
            }
        );
    }
    //Trae el ejercicio seleccionado en la screen anterior a la screen ejercicioEspecifico
    traerEjercicioEspecifico(id_ejercicio, okEjercicio) {
        var ejercicio
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT id_idioma, id_ejercicio, id_elemento, id_musculo, nombre_ejercicio, descripcion, ejecucion'
                    + ' FROM Ejercicios WHERE id_ejercicio = ? AND (id_idioma = (SELECT id_idioma FROM Configuracion) OR id_idioma = 0)', [id_ejercicio], function (tx, res) {
                        ejercicio = res.rows._array;
                    });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okEjercicio(ejercicio, ejercicio.id_idioma)
            }
        );
    }
    //Trae los ejercicios con su informacion, de la rutina seleccionada en la screen rutinaEspecifica. (JOIN)
    traerEjerciciosRutinaJoin(rutina, listo) {

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT e.id_idioma, e.id_ejercicio, e.nombre_ejercicio, e.id_musculo, er.dia, er.tiempo, er.series, er.repeticiones, er.combinado, er.posicion'
                + ' FROM Ejercicios e JOIN Ejercicios_Rutina er ON er.id_ejercicio = e.id_ejercicio'
                + ' WHERE er.id_rutina = ? AND (e.id_idioma = (SELECT id_idioma FROM Configuracion) OR e.id_idioma = 0) ORDER BY dia, posicion, combinado', [rutina.id_rutina], function (tx, res) {
                        rutina.rutina = res.rows._array;
                    });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                setTimeout(function(){

                    listo(rutina, rutina.rutina[0].id_idioma)
              
                  }, 1000) 
            }
        );
    }
    hola(rutina, listo) {

        let db = SQLite.openDatabase('appgym.db');
        var ejercicios

        db.transaction(
            tx => {
                tx.executeSql('SELECT e.id_idioma, e.id_ejercicio, e.nombre_ejercicio, e.id_musculo, er.dia, er.tiempo, er.series, er.repeticiones, er.combinado, er.posicion'
                + ' FROM Ejercicios e JOIN Ejercicios_Rutina er ON er.id_ejercicio = e.id_ejercicio'
                + ' WHERE er.id_rutina = ? AND (e.id_idioma = (SELECT id_idioma FROM Configuracion) OR e.id_idioma = 0) ORDER BY dia, posicion, combinado', [rutina.id_rutina], function (tx, res) {
                    ejercicios = res.rows._array;
                });
            },
            error => {
                console.log("Error")
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                //listo(rutina)
            }
        );
    }
    //Favoritear un Ejercicio
    favoritearEjercicio(id_ejercicio, fav, okFavorito) {

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('UPDATE Ejercicios SET favoritos = ? WHERE id_ejercicio = ?', [fav, id_ejercicio])
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okFavorito()
            }
        );
    }
    //Traer el ID MAX para luego crear un ejercicio
    traerIdEjercicioMax(okIdMax) {
        var ejercicio

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql("Select MAX(id_ejercicio) as id_ejercicio FROM Ejercicios", [], function (tx, res) {
                    ejercicio = res.rows._array[0]
                });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okIdMax(ejercicio)
            }
        );
    }
    crearEjercicio(nombre, descripcion, ejecucion, id_elemento, id_musculo, okEjercicioCreado) {
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO Ejercicios (id_ejercicio, id_idioma, nombre_ejercicio, id_musculo, descripcion, ejecucion, id_elemento, favoritos, modificable) VALUES (((SELECT MAX(id_ejercicio) FROM Ejercicios)+1), 0, ?, ?, ?, ?, ?, 1, 1)", [nombre, id_musculo, descripcion, ejecucion, id_elemento])
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    okEjercicioCreado()
              
                  }, 2000)
            }
        );
    }
    actualizarEjercicio(ejercicio, okEjercicioActualizado) {
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('UPDATE Ejercicios SET nombre_ejercicio = ?, descripcion = ?, ejecucion = ?, id_elemento = ?, id_musculo = ?  WHERE id_ejercicio = ? ', [ejercicio.nombre, ejercicio.descripcion, ejercicio.ejecucion, ejercicio.elemento, ejercicio.musculo, ejercicio.id_ejercicio])
            },
            error => {
                alert("Algo Salio Mal")
                db._db.close()
                console.log(error)
            },
            () => {
                console.log("Correcto")
                db._db.close()
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    okEjercicioActualizado()
              
                  }, 2000) 
            }
        );
    }
    conseguirIdEjercicioParaBorrar(nombre, borrarEjercicio) {
        let db = SQLite.openDatabase('appgym.db');
        var id_ejercicio = ''
        db.transaction(
            tx => {
                tx.executeSql('SELECT id_ejercicio FROM Ejercicios where Ejercicios.nombre = ? ', [nombre], function (tx, res) {
                    id_ejercicio = res.rows._array[0].id_ejercicio
                });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                db._db.close()
                borrarEjercicio(id_ejercicio)
            }
        );
    }
    borrarEjercicio(id_ejercicio, okEjercicioBorrado) {

        const db = SQLite.openDatabase('appgym.db');
        console.log(id_ejercicio)

        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () => console.log('Foreign keys turned on'));

        db.transaction(
            tx => {
                tx.executeSql('DELETE FROM  Ejercicios where id_ejercicio = ?', [id_ejercicio])
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    okEjercicioBorrado()
              
                  }, 2000) 
            }
        );
    }
    //Se fija si existe ese ejercicio en una rutina antes de borrarlo
    estaEjercicioRutina(id_ejercicio, okEsta) {
        let db = SQLite.openDatabase('appgym.db');
        var rutinas = []
        db.transaction(
            tx => {
                tx.executeSql('SELECT nombre_rutina FROM Rutinas Join Ejercicios_Rutina on Rutinas.id_rutina = Ejercicios_Rutina.id_rutina where Ejercicios_Rutina.id_ejercicio = ? ', [id_ejercicio], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        rutinas.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                db._db.close()
                setTimeout(function(){

                    okEsta(rutinas, id_ejercicio)
              
                  }, 1000) 
            }
        );
    }
    // *****************************************************
    // ***********************M.Rutinas***********************
    // *****************************************************

    //Trae todos las rutinas en la screen rutinas
    traerRutinas(id_tipo, idioma, okRutinas) {
        var rutinas = []

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT id_rutina, nombre_rutina, nombre_rutina_' + idioma.nombre_idioma + ', dias, r.id_creador, nombre_creador, favoritos, modificable FROM Rutinas r JOIN Rutinas_Creador c ON r.id_creador = c.id_creador WHERE id_tipo= ?', [id_tipo], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        rutinas.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Se traen las rutinas")
                db._db.close()
                setTimeout(function(){

                    okRutinas(rutinas, idioma)
              
                  }, 1000) 
            }
        );
    }
    traerRutinasPropias(idioma, okRutinas) {
        var rutinas = []

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT id_rutina, nombre_rutina, dias, r.id_creador, nombre_creador, favoritos, modificable FROM Rutinas r JOIN Rutinas_Creador c ON r.id_creador = c.id_creador WHERE modificable = 1 ', [], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        rutinas.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                setTimeout(function(){

                    okRutinas(rutinas, idioma)
              
                  }, 1000) 
            }
        );
    }
    //Trae la rutina seleccionada en la screen anterior a la screen rutinaEspecifica
    traerRutinaEspecifica(id_rutina, okRutinas) {
        var rutina

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Rutinas r JOIN Rutinas_Creador c ON r.id_creador = c.id_creador where id_rutina = ?', [id_rutina], function (tx, res) {
                    rutina = res.rows._array;
                });
            },
            error => {
                console.log(error)
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
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    okRutinaBorrada()
              
                  }, 2000) 
            }
        );
    }
    //Guarda la rutina en la base de datos (no terminado)
    crearRutina(rutinaNueva, okRutinaCreada) {
        let db = SQLite.openDatabase('appgym.db');
        db.transaction(
            tx => {
                tx.executeSql("INSERT INTO Rutinas (id_creador, id_tipo, nombre_rutina, dias, favoritos, modificable) VALUES ( 0, ?, ?, ?, 1, 1)", [rutinaNueva.id_tipo, rutinaNueva.nombre_rutina, rutinaNueva.dias])
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Rutina Creada")
                db._db.close()
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    okRutinaCreada(rutinaNueva)
              
                  }, 2000) 
            }
        );
    }
    actualizarRutina(rutinaNueva, okRutinaActualizada) {
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('UPDATE Rutinas SET nombre_rutina = ?, dias = ?  WHERE id_rutina = ? ', [rutinaNueva.nombre, rutinaNueva.dias, rutinaNueva.id_rutina])
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    okRutinaActualizada()
              
                  }, 2000) 
            }
        );
    }
    conseguirIdRutinaParaGuardar(rutinaNueva, okIdRutina) {
        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT id_rutina FROM Rutinas r where r.nombre_rutina = ? ', [rutinaNueva.nombre_rutina], function (tx, res) {
                    rutinaNueva.id_rutina = res.rows._array[0].id_rutina
                });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Id Conseguido")
                db._db.close()
                okIdRutina(rutinaNueva)
            }
        );
    }
    conseguirIdRutinaParaBorrar(nombre, borrarRutina) {
        let db = SQLite.openDatabase('appgym.db');
        var id_rutina = ''

        db.transaction(
            tx => {
                tx.executeSql('SELECT id_rutina FROM Rutinas where Rutinas.nombre_rutina = ? ', [nombre], function (tx, res) {
                    id_rutina = res.rows._array[0].id_rutina
                });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                db._db.close()
                borrarRutina(id_rutina)
            }
        );
    }
    crearEjerciciosRutina(rutinaNueva, okEjerciciosRutinaCreados) {

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                for (var i = 0; i < rutinaNueva.rutina.length; i++) {
                    tx.executeSql("INSERT INTO Ejercicios_Rutina (id_rutina, id_ejercicio, dia, series, repeticiones, combinado, tiempo, posicion) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)", [rutinaNueva.id_rutina, rutinaNueva.rutina[i].id_ejercicio, rutinaNueva.rutina[i].dia, rutinaNueva.rutina[i].series, rutinaNueva.rutina[i].repeticiones, rutinaNueva.rutina[i].combinado, rutinaNueva.rutina[i].tiempo, rutinaNueva.rutina[i].posicion])
                }
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Creados Ejercicios Rutina")
                db._db.close()
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    okEjerciciosRutinaCreados(rutinaNueva)
              
                  }, 2000)
            }
        );
    }
    borrarEjerciciosRutina(id_rutina, rutinaNueva, seBorraronEjercicios) {

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('DELETE FROM  Ejercicios_Rutina where id_rutina = ?', [id_rutina])
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                setTimeout(function(){

                    //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        
                    seBorraronEjercicios(rutinaNueva)
              
                  }, 2000) 
            }
        );
    }
    //Traer el ID MAX para luego crear un ejercicio
    traerIdRutinaMax(ejerciciosRutina, okIdMax) {
        var rutina

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql("Select MAX(id_rutina) as id_rutina FROM Rutinas", [], function (tx, res) {
                    rutina = res.rows._array[0]
                });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto MAX id_rutina")
                db._db.close()
                okIdMax(ejerciciosRutina, rutina)
            }
        );
    }
    // *****************************************************
    // ********************M.Suplementos**********************
    // *****************************************************

    //Trae los tipos de los suplemetos en la screen Suplementos
    traerTipoSuplementos(okSuplemento) {
        var suplementos = []

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Suplementos_Tipo s WHERE s.id_idioma = (SELECT id_idioma FROM Configuracion)', [], function (tx, res) {
                    for (let i = 0; i < res.rows.length; ++i) {
                        suplementos.push(res.rows._array[i]);
                    }
                });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okSuplemento(suplementos, suplementos[0].id_idioma)
            }
        );
    }
    //Trae todos los suplemetos en la screen SuplementosTipos
    traerSuplementos(id_tipo, okSuplementos) {

        var suplementos = []

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT s.id_suplemento, s.nombre_suplemento, s.marca, s.sabores, t.nombre_tipo, s.favoritos FROM Suplementos s' +
                    ' JOIN Suplementos_Tipo t ON s.id_tipo = t.id_tipo' +
                    ' WHERE s.id_tipo = ? AND s.id_idioma = (SELECT id_idioma FROM Configuracion) AND t.id_idioma = (SELECT id_idioma FROM Configuracion)', [id_tipo], function (tx, res) {
                        for (let i = 0; i < res.rows.length; ++i) {
                            suplementos.push(res.rows._array[i]);
                        }
                    });
            },
            error => {
                console.log("Error")
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                setTimeout(function(){

                    okSuplementos(suplementos, suplementos[0].id_idioma)
              
                  }, 1000) 
            }
        );
    }
    //Trae el suplemento seleccionada en la screen anterior a la screen suplemento especifico
    traerSuplementoEspecifico(id_suplemento, okSuplementos) {

        var suplemento

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT * FROM Suplementos WHERE id_suplemento = ? AND id_idioma = (SELECT id_idioma FROM Configuracion)', [id_suplemento], function (tx, res) {
                    suplemento = res.rows._array[0];
                });
            },
            error => {
                console.log("Error")
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()

                okSuplementos(suplemento, suplemento.id_idioma)
            }
        );
    }
    //Favoritear un suplemento
    favoritearSuplemento(id_suplemento, fav, okFavorito) {

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('UPDATE Suplementos set favoritos = ? where id_suplemento = ?', [fav, id_suplemento])
            },
            error => {
                console.log("Error")
                db._db.close()
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

        var ejercicios = []

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT ej.id_idioma, ej.id_ejercicio, ej.id_musculo, ej.nombre_ejercicio, ej.favoritos, ej.modificable, el.nombre_elemento'
                    + ' FROM Configuracion c JOIN Ejercicios ej ON c.id_idioma = ej.id_idioma JOIN Ejercicios_Elemento el ON ej.id_elemento = el.id_elemento'
                    + ' WHERE el.id_idioma = c.id_idioma AND ej.favoritos = 1', [], function (tx, res) {
                        
                        for (let i = 0; i < res.rows.length; ++i) {
                            ejercicios.push(res.rows._array[i]);
                        }
                    });
            },
            error => {
                console.log("Error")
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log(ejercicios)
                console.log("Correcto")
                db._db.close()
                okEjercicios(ejercicios)
            }
        );
    }
    //Trae todos los suplementos que esten en favoritos en la screen SumplementosFavs
    traerSuplementosFavoritas(okSuplementos) {

        var suplementos = []

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT s.id_idioma, s.id_suplemento, s.nombre_suplemento, s.marca, s.sabores, t.nombre_tipo, s.favoritos'
                    + ' FROM Configuracion c JOIN Suplementos s ON c.id_idioma = s.id_idioma JOIN Suplementos_Tipo t ON s.id_tipo = t.id_tipo' +
                    ' WHERE t.id_idioma = c.id_idioma AND s.favoritos = 1', [], function (tx, res) {
                        for (let i = 0; i < res.rows.length; ++i) {
                            suplementos.push(res.rows._array[i]);
                        }
                    });
            },
            error => {
                console.log("Error")
                db._db.close()
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
    traerRutinasFavoritas(okRutinas, idioma) {

        var rutinas = []

        let db = SQLite.openDatabase('appgym.db');

        db.transaction(
            tx => {
                tx.executeSql('SELECT r.id_rutina, r.nombre_rutina, r.nombre_rutina_' + idioma.nombre_idioma + ', r.modificable, r.dias, r.id_creador, c.nombre_creador, r.favoritos '
                    + ' FROM Rutinas r JOIN Rutinas_Creador c ON r.id_creador = c.id_creador'
                    + ' WHERE r.favoritos = 1', [], function (tx, res) {
                        for (let i = 0; i < res.rows.length; ++i) {
                            rutinas.push(res.rows._array[i]);
                        }
                    });
            },
            error => {
                console.log(error)
                db._db.close()
                alert("Algo Salio Mal")
            },
            () => {
                console.log("Correcto")
                db._db.close()
                okRutinas(rutinas, idioma)
            }
        );
    }

}
export default new GenerarBase();
