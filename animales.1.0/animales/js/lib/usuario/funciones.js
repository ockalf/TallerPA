$(function () {
    var TallerAvanzada = {};
    
    (function (app) {
        
        app.init = function () {
            app.buscarPersonas();
            app.bindings();
        };
        
        app.bindings = function () {            
            $("#cuerpoTabla").on('click', 'tr td button ',(e) => { 
                _value = (id) => {return document.getElementById(id).value}

                document.getElementById('cuerpoTabla').innerHTML += `
                    <tr class="animate">
                        <td>${_value('nombre')}</td>
                        <td>${_value('nombreCientifico')}</td>
                        <td>${_value('familia')}</td>
                        <td><a onclick='window.confirm("Se eliminará el animal con id: ${_value('id')}")' >Eliminar</a> <a href="">Editar</a> </td>
                    </tr>
                `;
            })
        };

        app.buscarPersonas = function () {//funcion para listar todos las personas
            //alert("Entre en buscarPersonas");

            var archivo = "http://localhost/talleravanzada/entrega/animales/controladorBackend/buscar.php";

            $.ajax({
                url: archivo,
                method: 'GET',
                dataType: 'json',
                success: function (datosRecibidos) {
                    app.rellenarTabla(datosRecibidos);
                },
                error: function () {
                    alert('error en servidor - buscar persona');
                }
            });
        };


        app.rellenarTabla = function (datosPersona) {//funcion para rellenar la tabla profesores
            //alert("Entre en rellenar tabla");
            var lineas = "";

            $.each(datosPersona, function (clave, animal) {

                lineas += `
                    <tr>
                        <td>${animal.nombre}</td>
                        <td>${animal.nombreCientifico}</td>
                        <td>${animal.familia}</td>
                        <td><a onclick='window.confirm("Se eliminará el animal con id: ${animal.id}")'  >Eliminar</a> <a href="">Editar</a> </td>
                    </tr>
                `;

            });

            document.getElementById('cuerpoTabla').innerHTML += lineas;

        };

        app.init();

    })(TallerAvanzada);


});
