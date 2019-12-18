BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Suplementos" (
	"id"	INTEGER,
	"nombre"	TEXT,
	"descripcion"	TEXT,
	"marcas"	TEXT
);
CREATE TABLE IF NOT EXISTS "Ejercicios" (
	"id"	INTEGER,
	"nombre"	TEXT,
	"musculo"	TEXT,
	"descripcion"	TEXT,
	"ejecucion"	TEXT,
	"imagen1"	TEXT,
	"imagen2"	TEXT
);
INSERT INTO "Suplementos" VALUES (1,'caca','mucha caca','star nutrition');
INSERT INTO "Ejercicios" VALUES (1,'Press de Banca','Pecho','Mi nombre es rodrigo','Mi nombre es rodrigo',NULL,NULL);
INSERT INTO "Ejercicios" VALUES (2,'Trasnuca','Espalda','Mi nombre es rodrigo','Mi nombre es Espaldovich',NULL,NULL);
COMMIT;
