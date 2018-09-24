<?php

    require_once 'ControladorGeneral.php';

    class ControladorAnimal extends ControladorGeneral{

        function __construct(){
            parent::__construct();
        }

        public function listarAlimentaciones (){
            try{
                $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_ALIMENTACIONES);
                $resultado = $resultado->fetchAll();
                return $resultado;
            } catch (Exeption $e){
                echo "Failed: " . $e->getMessage();
            }
        }

        public function listar($datos){
            try{
                $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_ANIMALES);
                $resultado = $resultado->fetchAll();
                return $resultado;
            } catch (Exeption $e){
                echo "Failed: " . $e->getMessage();
            }
        }

        public function agregar($datos){
            try{
                $this->refControladorPersistencia->iniciarTransaccion();
                
                $par = array(
                    "nombre" =>                 $datos['nombre'],
                    "nombreCientifico" =>       $datos['nombreCientifico'], 
                    "clase" =>                  $datos['clase'], 
                    "idAlimentacion" =>         $datos['alimentacion']
                );

                $resultado = $this -> refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_ANIMAL, $par);
                $this->refControladorPersistencia->confirmarTransaccion();

                return $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_ULTIMOANIMAL)->fetchAll();

            } catch (Exeption $e){
                echo "Failed: " . $e->getMessage();
            }
        }

        public function eliminar($datos){
            try{
                $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ELIMINAR_ANIMAL, $datos);
            } catch (Exeption $e){
                echo "Failed: " . $e->getMessage();                
            }

        }

        public function modificar($datos){
            try{
                $this->refControladorPersistencia->iniciarTransaccion();
                $par = array(
                    "nombre" =>                 $datos['nombre'],
                    "nombreCientifico" =>       $datos['nombreCientifico'], 
                    "clase" =>                  $datos['clase'], 
                    "idAlimentacion" =>         $datos['alimentacion'],
                    "id" =>                     $datos['id']
                );
                $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ACTUALIZAR_ANIMAL, $par);
                $this->refControladorPersistencia->confirmarTransaccion();
                
                return $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_ANIMAL, array("id" => $par['id']))->fetchAll();;

            }catch (Exeption $e){
                echo "Failed: " . $e->getMessage();                
            }
        }

        public function buscar($datos){}

    }