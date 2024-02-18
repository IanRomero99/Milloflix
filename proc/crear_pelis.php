<?php
// Inicializamos la sesión
session_start();

// Verificar si el usuario ha iniciado sesión como admin
if (!isset($_SESSION['admin'])) {
    // Redireccionar a la página de inicio de sesión si el usuario no ha iniciado sesión como admin
    header("Location: ../view/index.php");
    exit();
}

// Solo continuamos si se han enviado archivos
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["caratula_peli"])) {
    // Obtener los datos del formulario
    $desc_peli = $_POST["desc_crear"];
    $caratula_peli_nombre = $_FILES["caratula_peli"]["name"]; // Nombre original del archivo
    $caratula_peli_temp = $_FILES["caratula_peli"]["tmp_name"];
    $caratula_peli_tipo = $_FILES["caratula_peli"]["type"];
    $id_ano_peli = $_POST["ano_crear"];
    $id_pais = $_POST["pais_crear"];
    $id_gen = $_POST["gen_crear"];
    // Directorio donde se almacenarán las imágenes
    $directorio_destino = "../img/";

    // Movemos la imagen del directorio temporal al directorio de destino
    $ruta_caratula_peli = $directorio_destino . $caratula_peli_nombre;
    if (!move_uploaded_file($caratula_peli_temp, $ruta_caratula_peli)) {
        // Si no se puede mover el archivo, muestra un mensaje de error
        die('Error: No se pudo mover el archivo al directorio de destino.');
    }

    // Incluimos la conexión a la base de datos
    require_once("./conexion.php");

    // Verificamos si la película ya existe en la base de datos
    $sql_check = "SELECT COUNT(*) FROM tbl_peliculas WHERE desc_peli = :desc_peli";
    $stmt_check = $pdo->prepare($sql_check);
    $stmt_check->bindParam(':desc_peli', $desc_peli);
    $stmt_check->execute();
    $pelicula_count = $stmt_check->fetchColumn();

    if ($pelicula_count > 0) {
        echo "La película ya existe.";
    } else {
        // Insertamos la nueva película en la base de datos
        $consulta_insertar_pelicula = $pdo->prepare("INSERT INTO tbl_peliculas (desc_peli, caratula_peli, id_ano_peli, id_pais, id_gen) VALUES (:desc_peli, :caratula_peli, :id_ano_peli, :id_pais, :id_gen)");
        $consulta_insertar_pelicula->bindParam(":desc_peli", $desc_peli);
        // Almacenamos solo la ruta de la imagen en la base de datos
        $consulta_insertar_pelicula->bindParam(":caratula_peli", $ruta_caratula_peli);
        $consulta_insertar_pelicula->bindParam(":id_ano_peli", $id_ano_peli);
        $consulta_insertar_pelicula->bindParam(":id_pais", $id_pais);
        $consulta_insertar_pelicula->bindParam(":id_gen", $id_gen);
        $consulta_insertar_pelicula->execute();

        // Verificamos si la inserción fue exitosa
        if ($consulta_insertar_pelicula->rowCount() > 0) {
            echo "ok";
        } else {
            echo "Error al insertar la película.";
        }
    }
} else {
    echo "Error: No se han recibido datos del formulario o no se ha seleccionado ningún archivo.";
}
?>
