
*********************** Antes de ejecutar los comando ***********************

Crear la base de datos por un cliente de mongoDB, en este caso el nombre del schema es "pelicula".

*********************** Dump collection mongo ***********************

1-Conectarse por CMD  por windows.

2-Posicinarse en la carpeta bin donde se encuentra instalado mongoDB.

3- Ejecutar el siguiente comando para el dump datos.

mongodump --db pelicula --out D:/APP/Documentacion/Facultad/Distribuidas/Backend/script/mongodump-2019-04-26

Ejemplo:

D:\APP\MongoDB\bin>mongodump --db pelicula --out D:/C02536/Documentacion/Facultad/Distribuidas/Distriuidas/Backend/script/mongodump-2019-04-26

2019-04-27T15:13:29.676-0300    writing pelicula.comentarios to
2019-04-27T15:13:31.121-0300    writing pelicula.usuarios to
2019-04-27T15:13:32.595-0300    done dumping pelicula.usuarios (8 documents)
2019-04-27T15:13:32.596-0300    done dumping pelicula.comentarios (25 documents)

***************** Opcional Export mongo **********************

Exportado de collections

D:\APP\MongoDB\bin>mongoexport --db pelicula --collection usuarios --out

usuarios.json
2019-04-27T14:47:56.987-0300    connected to: localhost
2019-04-27T14:47:57.026-0300    exported 8 records

D:\APP\MongoDB\bin>mongoexport --db pelicula --collection comentarios --out comentarios.json
2019-04-27T14:54:20.904-0300    connected to: localhost
2019-04-27T14:54:20.920-0300    exported 25 records

*********************** Resorte mongo ***********************

1-Conectarse por CMD  por windows.

2-Posicinarse en la carpeta bin donde se encuentra instalado mongoDB.

3- Ejecutar el siguiente comando para crear un el schema peliculas a partir de dump.

mongorestore --d pelicula --out D:/APP/Documentacion/Facultad/Distribuidas/Backend/script/mongodump-2019-04-26

Documentación  extraída del siguiente sitio oficial de mongodb:

https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/



