

<?php

interface DbSentencias {
    
//PERSONA
const INSERTAR_PERSONA = "INSERT INTO `persona`(`Nombre`, `Apellido`) VALUES (?,?)";
const ELIMINAR_PERSONA = "DELETE FROM `persona` WHERE Id_Persona = ?";
const ACTUALIZAR_PERSONA = "UPDATE `persona` SET `Nombre`= ?,`Apellido`= ? WHERE Id_Persona = ?";
const BUSCAR_PERSONA = "SELECT * FROM `persona` WHERE Id_Persona = ?";

//DOMICILIO
const INSERTAR_DOMICILIO = "INSERT INTO `domicilio`(`calle`, `numero`) VALUES (?,?)";
const ELIMINAR_DOMICILIO = "DELETE FROM `domicilio` WHERE id_domicilio = ?";
const ACTUALIZAR_DOMICILIO = "UPDATE `domicilio` SET `calle`= ?,`numero`= ? WHERE id_domicilio = ?";
const BUSCAR_DOMICILIO = "SELECT * FROM `domicilio` WHERE id_domicilio = ?";
const BUSCAR_DOMICILIOS = "SELECT * FROM `domicilio`";

//ALUMNO
const INSERTAR_ALUMNO = "INSERT INTO `usobackend`.`persona2`(`nombre`,`apellido`,`legajo`,`estado`,`fk_domicilio`)VALUES (?,?,?,'A',(SELECT MAX(`id_domicilio`) FROM domicilio));";
const ELIMINAR_ALUMNO = "DELETE FROM `persona2` WHERE id_persona = ? AND estado = 'A'";
const ACTUALIZAR_ALUMNO = "UPDATE `persona2` SET `nombre`= ?,`apellido`= ?, `legajo`= ? WHERE id_persona = ? AND estado = 'A'";
const BUSCAR_ALUMNO = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
WHERE `persona2`.`estado` = 'A' AND `persona2`.`id_persona` = ?;";
const BUSCAR_ALUMNOS = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
WHERE `persona2`.`estado` = 'A' AND ? = ?;";
const LISTAR_ALUMNOS = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
WHERE `persona2`.`estado` = 'A';";
const BUSCAR_ULTIMOALUMNO = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` 
                            INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
                            WHERE `persona2`.`estado` = 'A' AND `persona2`.`id_persona` = (SELECT MAX(id_persona) FROM `persona2`);";

//PROFESOR
const INSERTAR_PROFESOR = "INSERT INTO `usobackend`.`persona2`(`nombre`,`apellido`,`titulo`,`estado`,`fk_domicilio`)VALUES (?,?,?,'P',(SELECT MAX(`id_domicilio`) FROM domicilio));";
const ELIMINAR_PROFESOR = "DELETE FROM `persona2` WHERE id_persona = ? AND estado = 'P'";
const ACTUALIZAR_PROFESOR = "UPDATE `persona2` SET `nombre`= ?,`apellido`= ?, `titulo`= ? WHERE id_persona = ? AND estado = 'P'";
const BUSCAR_PROFESOR = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
WHERE `persona2`.`estado` = 'P' AND `persona2`.`id_persona` = ?;";
const BUSCAR_PROFESORES = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
WHERE `persona2`.`estado` = 'P' AND ? = ?;";
const LISTAR_PROFESORES = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
WHERE `persona2`.`estado` = 'P';";
const BUSCAR_ULTIMOPROFESOR = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` 
                            INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
                            WHERE `persona2`.`estado` = 'P' AND `persona2`.`id_persona` = (SELECT MAX(id_persona) FROM `persona2`);";

//SESION
const BUSCAR_USUARIO = "SELECT * FROM usuario WHERE nombre_usuario = ?";


//ALIMENTACION
const BUSCAR_ALIMENTACIONES = "SELECT * FROM `alimentacion`";

//ANIMALES  
const BUSCAR_ANIMALES = "SELECT `animal`.`id`, `animal`.`nombre`, `nombreCientifico`, `clase`, `alimentacion`.`nombre` AS 'alimentacion'
                        FROM `animal`, `alimentacion` 
                        WHERE  `animal`.`idAlimentacion`= `alimentacion`.`id`";
const BUSCAR_ULTIMOANIMAL = "SELECT `animal`.`nombre`, `nombreCientifico`, `clase`, `alimentacion`.`nombre` AS 'alimentacion'
                            FROM `animal`, `alimentacion` 
                            WHERE  `animal`.`idAlimentacion`= `alimentacion`.`id` AND `animal`.`id` = (SELECT MAX(id) FROM `animal`)";
const INSERTAR_ANIMAL = "INSERT INTO `animal`(`id`, `nombre`, `nombreCientifico`, `clase`, `idAlimentacion`) VALUES (null, ?, ?, ?, ?)";
const ELIMINAR_ANIMAL = "DELETE FROM `animal` WHERE `animal`.`id` = ?;";
const ACTUALIZAR_ANIMAL = "UPDATE `animal` SET `nombre`= ?,`nombreCientifico`= ?, `clase`= ?, `idAlimentacion`= ? WHERE id = ?;";

const BUSCAR_ANIMAL = "SELECT `animal`.`nombre`,`animal`.`id`, `nombreCientifico`, `clase`, `alimentacion`.`nombre` AS 'alimentacion'
                            FROM `animal`, `alimentacion` 
                            WHERE  `animal`.`idAlimentacion`= `alimentacion`.`id` AND `animal`.`id` = ?";


}
