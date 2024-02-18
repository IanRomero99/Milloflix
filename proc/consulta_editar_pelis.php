<?php

// Inicializamos la sesión
session_start();

// Verificar si el usuario ha iniciado sesión como admin
if (!isset($_SESSION['admin'])) {
    // Redireccionar a la página de inicio de sesión si el usuario no ha iniciado sesión como admin
    header("Location: ../view/index.php");
    exit();
}

// Verificar si se recibió el parámetro id_peli
if (isset($_POST['id_peli'])) {
    // Obtener el valor de id_peli
    $id_peli = $_POST['id_peli'];
    
    // Incluir la conexión a la base de datos
    require_once("./conexion.php");
    
    // Preparar y ejecutar la consulta SQL
    $sql_check = "SELECT * FROM tbl_peliculas WHERE id_peli = :id_peli";
    $stmt_check = $pdo->prepare($sql_check);
    $stmt_check->bindParam(':id_peli', $id_peli);
    $stmt_check->execute();
    
    // Obtener el resultado de la consulta
    $resultado = $stmt_check->fetch(PDO::FETCH_ASSOC);
    
    // Verificar si se encontró la película con el id especificado
    if ($resultado) {
        // Envía la respuesta como JSON
        echo json_encode($resultado);
    } else {
        // Si no se encontró la película, enviar un mensaje de error
        echo json_encode(["error" => "No se encontró la película con el ID especificado"]);
    }
} else {
    // Si no se recibió el parámetro id_peli, enviar un mensaje de error
    echo json_encode(["error" => "No se proporcionó el ID de la película"]);
}

?>
