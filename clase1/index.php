<?php

    $user = 'root';
    $pass = '';
    $host = 'localhost';

    $conn = new mysqli($host, $user , $pass);

    if( $conn -> connect_error) {
        die('error');
    }else{
        echo 'success'.'</br>'.'</br>';
    }  

    $db = 'usobackend';
    mysqli_select_db($conn, $db);

    $cadenasql= 'select * from usuario';
    $response = mysqli_query($conn, $cadenasql);

    while ($row = $response->fetch_assoc()) {
        echo $row['nombre_usuario'].'</br>';
    }

    //echo '<br>'.$response['nombre_usuario'];


    mysqli_close($conn);