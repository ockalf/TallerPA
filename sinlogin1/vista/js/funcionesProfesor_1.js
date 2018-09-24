6+$(function() {
    var TallerAvanzada = {};

    (function(app) {

        app.init = function() {
            app.buscarPersonas();
            
            app.bindings();
        };

        app.bindings = function() {
            $("#guardar").on("click", function(event) {
                event.preventDefault();
                if ($("#id").val()==0) {//Si el id es cero entonces se guarda una nueva persona
                    app.guardarPersona();
                }else{//Si el id es distinto de cero entonces se modifica una persona
                    app.modificarPersona();
                }
            });

            $("#formProfesor").bootstrapValidator({
                excluded: [],
            });
        };
        
   
        
        app.guardarPersona = function() {//funcion para guardar un profesor
            //alert("entre en agregar");
            var url = "../../controlador/ruteador/Ruteador.php?accion=agregar&Formulario=Profesor";
            var datosEnviar = $("#formProfesor").serialize();
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function(datosRecibidos) {
                    $("#modalProfesor").modal('hide');
                    app.actualizarTabla(datosRecibidos, $("#id").val());
                    app.limpiarModal();
                },
                error: function(datosRecibidos) {
                    alert("Error en guardar persona");
                    alert(datosRecibidos);
                }
            });
        };   
     

        app.rellenarTabla = function(data) {//funcion para rellenar la tabla profesores
            //alert("Entre en rellenar tabla");
            var html = "";
            $.each(data, function(clave, profesor) {
                html += '<tr>' +
                        '<td>' + profesor.nombre + '</td>' +
                        '<td>' + profesor.apellido + '</td>' +
                        '<td>' + profesor.titulo + '</td>' +
                        '<td>' + profesor.calle + '</td>' +
                        '<td>' + profesor.numero + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_persona="' + profesor.id_persona + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_persona="' + profesor.id_persona + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>' +
                        '</tr>';
            });
            $("#cuerpoTablaProfesor").html(html);
        };
        
        app.actualizarTabla = function(profesor, id) {//funcion para actualizar o modificar la tabla profesor
            if (id == 0) { //ES guardar una persona nueva
                var html = '<tr>' +
                        '<td>' + profesor.nombre + '</td>' +
                        '<td>' + profesor.apellido + '</td>' +
                        '<td>' + profesor.titulo + '</td>' +
                        '<td>' + profesor.calle + '</td>' +
                        '<td>' + profesor.numero + '</td>' +
                        '<td>' +
                        '<a class="pull-left editar" data-id_persona="' + profesor.id_persona + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                        '<a class="pull-right eliminar" data-id_persona="' + profesor.id_persona + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>' +
                        '</td>' +
                        '</tr>';
                $("#cuerpoTablaProfesor").append(html);
                
            } 
        };
        
        app.borrarFila = function(id) {//funcion para borrar una fila de la tabla profesor
            var fila = $("#cuerpoTablaProfesor").find("a[data-id_persona='" + id + "']").parent().parent().remove();
        };
        
        app.limpiarModal = function(){//funcion para limpiar el modal de profesores
            $("#id").val(0);
            $("#nombre").val('');
            $("#apellido").val('');
            $("#titulo").val('');
            $("#calle").val('');
            $("#numero").val('');
        };
        
        app.init();

    })(TallerAvanzada);


});
