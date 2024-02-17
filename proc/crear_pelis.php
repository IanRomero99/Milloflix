<?php
// Inicializamos la sesión
session_start();

if (isset($_SESSION['usuario'])) {
    // Obtenemos los datos del formulario
    $desc_peli = $_POST["desc_crear"];
    $caratula_peli = $_POST["caratula_peli"];
    $trailer_peli = $_POST["trailer_peli"];
    $id_ano_peli = $_POST["ano_crear"];
    $id_pais = $_POST["pais_crear"];
    $id_gen = $_POST["genero_crear"];

    // Incluimos la conexión a la base de datos
    require_once("./conexion.php");

    // Verificamos si la película ya existe en la base de datos
    $sql_check = "SELECT COUNT(*) FROM tbl_peliculas WHERE desc_peli = :desc_peli";
    $stmt_check = $pdo->prepare($sql_check);
    $stmt_check->bindParam(':desc_peli', $desc_peli);
    $stmt_check->execute();
    $pelicula_count = $stmt_check->fetchColumn();

    if ($pelicula_count > 0) {
        echo "existe";
    } else {
        // Insertamos la nueva película en la base de datos
        $consulta_insertar_pelicula = $pdo->prepare("INSERT INTO tbl_peliculas (desc_peli, caratula_peli, trailer_peli, id_ano_peli, id_pais, id_gen, id_dir, id_trabajo) VALUES (:desc_peli, :caratula_peli, :trailer_peli, :id_ano_peli, :id_pais, :id_gen, :id_dir, :id_trabajo)");
        $consulta_insertar_pelicula->bindParam(":desc_crear", $desc_peli);
        $consulta_insertar_pelicula->bindParam(":caratula_peli", $caratula_peli);
        $consulta_insertar_pelicula->bindParam(":trailer_peli", $trailer_peli);
        $consulta_insertar_pelicula->bindParam(":ano_crear", $id_ano_peli);
        $consulta_insertar_pelicula->bindParam(":pais_crear", $id_pais);
        $consulta_insertar_pelicula->bindParam(":genero_crear", $id_gen);
        $consulta_insertar_pelicula->execute();

        // Verificamos si la inserción fue exitosa
        if ($consulta_insertar_pelicula->rowCount() > 0) {
            echo "ok";
            exit();
        }
    }
} else {
    echo "Usuario no autenticado.";
}
?>
