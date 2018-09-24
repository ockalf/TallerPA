$(function() {
    var TallerAvanzada = {};

    (function(app) {

        app.init = function() {
            app.buscarAlimentaciones();
            app.buscarAnimales();
            
            app.bindings();
        };
 
        app.buscarAlimentaciones = function() {//funcion para listar todos los Animales
            //alert("Entre en buscarPersonas");
            var url = "../../controlador/ruteador/Ruteador.php?accion=listarAlimentaciones&Formulario=Animal";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function(data) {

                    $.each(data, function(clave, element) {
                        var {nombre, id} = element;
                        
                        document.getElementById('alimentacion').innerHTML += `
                            <option value="${id}">${nombre}</option>
                        `;

                    });

                },
                error: function(data) {
                    console.log(data)
                    alert('error buscar persona');
                }
            });
        };
        
        app.buscarAnimales = function() {//funcion para listar todos los Animales
            //alert("Entre en buscarPersonas");
            var url = "../../controlador/ruteador/Ruteador.php?accion=listar&Formulario=Animal";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function(data) {

                    $.each(data, function(clave, element) {
                        var { nombre, nombreCientifico, clase, alimentacion, id } = element;
                        
                        document.getElementById('cuerpoTablaAnimal').innerHTML += `
                            <tr>
                                <td>${nombre}</td>
                                <td>${nombreCientifico}</td>
                                <td>${clase}</td>
                                <td>${alimentacion}</td>
                                <td>
                                    <a class="pull-left editar" data-id_animal="${id}">Editar</a>
                                    <a class="pull-right eliminar" data-id_animal="${id}">Eliminar</a>
                                </td>
                            </tr>
                        `;

                    });

                },
                error: function(data) {
                    console.log(data)
                    alert('error buscar animales');
                }
            });
        };
        
        app.bindings = function() {
            $("#agregarAnimal").on('click', function(event) {  //Evento para el Click del boton agregarAnimal
                $("#id").val(0);
                $("#tituloModal").html("Nuevo Animal");
                $("#modalAnimal").modal({show: true});
            });
            
            $("#buscarAnimal").on('click', function(event) {  //Evento para el Click del boton buscarAnimal
                $("#tituloModalBuscar").html("Buscar Animal");
                $("#modalBuscar").modal({show: true});
            });
            
            $("#imprimir").on('click', function(event) {  //Evento para el Click del boton imprimirAnimal
                app.imprimir();
            });

            $("#cuerpoTablaAnimal").on('click', '.editar', function(event) {  //Evento para el Click en editarAnimal
                $("#id").val($(this).attr("data-id_animal"));
                $("#nombre").val($(this).parent().parent().children().first().html());
                $("#nombreCientifico").val($(this).parent().parent().children().first().next().html());
                $("#clase").val($(this).parent().parent().children().first().next().next().html());
                $("#alimentacion").val($(this).parent().parent().children().first().next().next().next().html());
                $("#tituloModal").html("Editar Animal");
                $("#modalAnimal").modal({show: true});
            });

            $("#cuerpoTablaAnimal").on('click', '.eliminar', function() { ////Evento para el Click en eliminarAnimal
                app.eliminarAnimal($(this).attr("data-id_animal"));
            });

            $("#guardar").on("click", function(event) {
                event.preventDefault();
                if ($("#id").val()==0) {//Si el id es cero entonces se guarda una nueva persona
                    app.guardarAnimal();
                }else{//Si el id es distinto de cero entonces se modifica una persona
                    app.modificarAnimal();
                }
            });
            
            $("#btnBuscar").on("click", function(event) {   //Evento para el Click en buscar Animal
                event.preventDefault();
                app.buscar();
            });

            $("#formAnimal").bootstrapValidator({
                excluded: [],
            });
        };
        
        app.buscar = function(){//funcion para buscar un Animal por criterio
            alert("entre en buscar");
            var url = "../../controlador/ruteador/Ruteador.php?accion=buscar&Formulario=Animal";
            var datosEnviar = {criterio:$("#criterio").val(),buscar:$("#txtBusqueda").val()};
            alert("criterio: "+datosEnviar.criterio+" valor buscado:"+datosEnviar.buscar);
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function(datosRecibidos) {
                    alert("busque con exito");
                    alert(datosRecibidos);
                    $("#modalBuscar").modal('hide');
                    app.rellenarTabla(datosRecibidos);
                },
                error: function(datosRecibidos) {
                    alert("Error al buscar");
                    alert(datosRecibidos);
                    $("#modalBuscar").modal('hide');
                }
            });
        };
        
        app.imprimir = function(){//funcion para imprimir
            var aux = $("#tablaAnimal").html();//recupero el html del la tablaAnimal
            aux = aux.replace("<th>acciones</th>","");//reemplazo el <th>acciones</th> por cadena vacia
            var inicio = aux.indexOf("<td><a class",0);//busco la primera aparicion de esa cadena y guardo su posicion
            while (inicio > 0){
                var fin = aux.indexOf("</td>", inicio) + 5;//busco el final del <td> y guardo su posicion
                var strBorrar = aux.substring(inicio,fin);//extraigo el string que debo borrar de la tabla
                aux = aux.replace(strBorrar,"");//reemplazo el string a borrar por cadena vacia
                inicio = aux.indexOf("<td><a class",0);
            }
            $("#html").val(aux);
            $("#imprimirAnimales").submit();//imprimo
        };
        
        app.guardarAnimal = function() {//funcion para guardar un Animal
            //alert("entre en agregar");
            var url = "../../controlador/ruteador/Ruteador.php?accion=agregar&Formulario=Animal";
            var datosEnviar = $("#formAnimal").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function(data) {
                    $("#modalAnimal").modal('hide');
                    app.actualizarTabla(data, $("#id").val());
                    app.limpiarModal();
                },
                error: function(data) {
                    alert("Error en guardar persona");
                }
            });
        };

        app.borrarFila = function(id) {//funcion para borrar una fila de la tabla Animal
            $("#cuerpoTablaAnimal").find("a[data-id_animal='" + id + "']").parent().parent().remove();
        };
        
        app.modificarAnimal = function() {//funcion para modificar un Animal
            //alert("entre en modificar");
            var url = "../../controlador/ruteador/Ruteador.php?accion=modificar&Formulario=Animal";
            var datosEnviar = $("#formAnimal").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                data: datosEnviar,
                success: function(datosRecibidos) {
                    $("#modalAnimal").modal('hide');
                    app.actualizarTabla(datosRecibidos, $("#id").val());
                    app.limpiarModal();
                },
                error: function(datosRecibidos) {
                    alert("Error en guardar persona");
                    alert(datosRecibidos);
                }
            });
        };
        
        app.eliminarAnimal = function(id) {//funcion para eliminar un Animal
            var url = "../../controlador/ruteador/Ruteador.php?accion=eliminar&Formulario=Animal";
            //alert(id);
            var datosEnviar = {id:id};
            $.ajax({
                url: url,
                method: "POST",
                data: datosEnviar,
                success: function(datosRecibidos) {
                    app.borrarFila(id);
                },
                error: function(datosRecibidos) {
                    alert('error al eliminar');
                }
            });
        };

        app.actualizarTabla = function(Animal, id) {//funcion para actualizar o modificar la tabla Animal
            if (id == 0) { //ES guardar una persona nueva
                var { nombre, nombreCientifico, clase, alimentacion, id } = Animal[0];
                        
                document.getElementById('tablaAnimal').innerHTML += `
                    <tr>
                        <td>${nombre}</td>
                        <td>${nombreCientifico}</td>
                        <td>${clase}</td>
                        <td>${alimentacion}</td>
                        <td>
                            <a class="pull-left editar" data-id_persona="${id}"><span class="glyphicon glyphicon-pencil"></span>Editar</a>
                            <a class="pull-right eliminar" data-id_persona="${id}"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>
                        </td>
                    </tr>
                `;
                
            } else {    //Es Modificar una persona existente
                var { id, nombreCientifico, clase, alimentacion, nombre } = JSON.parse(Animal)[0];

                elem = `
                    <td>${nombre}</td>
                    <td>${nombreCientifico}</td>
                    <td>${clase}</td>
                    <td>${alimentacion}</td>
                    <td>
                        <a class="pull-left editar" data-id_persona="${id}">Editar</a>
                        <a class="pull-right eliminar" data-id_persona="${id}">Eliminar</a>
                    </td>
                `;
                $("#cuerpoTablaAnimal").find("a[data-id_animal='" + id + "']").parent().parent().html(elem);

            }
        };
        
        app.limpiarModal = function(){//funcion para limpiar el modal de Animales
            // $("#id").val(0);
            // $("#nombre").val('');
            // $("#nombreCientifico").val('');
            // $("#clase").val('');
            // $("#alimentacion").val('');
        };
        
        app.init();

    })(TallerAvanzada);


});
