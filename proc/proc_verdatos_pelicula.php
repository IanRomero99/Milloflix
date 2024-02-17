<?php
include_once("./conexion.php");
// print_r($_POST);
 $id_peli = $_POST['id_peli'];
// Verificar si se recibió el ID de la película a través de la solicitud GET
if(isset($_POST['id_peli'])) { 



    // Preparar la consulta SQL para obtener los datos de la película específica
    $consulta = $pdo->prepare("SELECT p.id_peli, p.desc_peli, p.caratula_peli, p.trailer_peli, a.ano, pa.nombre_pais, g.nombre_gen
                                FROM tbl_peliculas p
                                JOIN tbl_ano a ON p.id_ano_peli = a.id_ano_peli
                                JOIN tbl_pais pa ON p.id_pais = pa.id_pais
                                JOIN tbl_genero g ON p.id_gen = g.id_gen
                                WHERE p.id_peli = :id_peli"); // Filtrar por el ID de la película

    // Vincular el parámetro ID de la película
    $consulta->bindParam(':id_peli', $id_peli, PDO::PARAM_INT);

    // Ejecutar la consulta
    $consulta->execute();

    // Obtener el resultado como un array asociativo
    $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);

    // Verificar si se encontraron resultados
    if($resultado) {
        // Si se encontraron resultados, convertirlos a JSON y enviarlos como respuesta
        echo json_encode($resultado);
    } else {
        // Si no se encontraron resultados, enviar un mensaje de error
        echo json_encode(array('error' => 'No se encontraron datos para la película con el ID proporcionado.'));
    }
} else {
    // Si no se recibió el ID de la película a través de la solicitud GET, enviar un mensaje de error
    echo json_encode(array('error' => 'No se proporcionó el ID de la película en la solicitud.'));
}
?>
