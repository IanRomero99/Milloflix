<?php
// Incluir el archivo de conexión a la base de datos
include_once("../proc/conexion.php");




// Verificamos si el campo de búsqueda no está vacío
if (!empty($_POST["busqueda"])) {
    // Guardamos el valor en una variable
    $data = $_POST["busqueda"];
    $query = "SELECT id_peli, desc_peli FROM tbl_peliculas WHERE desc_peli";

} else {
// Consultar las rutas de las imágenes y los títulos de las películas
$query = "SELECT id_peli, desc_peli ,caratula_peli  FROM tbl_peliculas";
$resultado = $pdo->query($query); // Ejecutar la consulta utilizando el objeto PDO
}
// Verificar si la consulta se realizó correctamente
if ($resultado) {
    $imagenes = []; // Inicializar un array para almacenar las rutas de las imágenes y los títulos
    // Iterar sobre los resultados y agregar las rutas y los títulos al array
    while ($fila = $resultado->fetch(PDO::FETCH_ASSOC)) {
        $imagen = [
            'id_peli' => $fila ['id_peli'],
            'caratula_peli' => $fila['caratula_peli'],
            'desc_peli' => $fila['desc_peli']
        ];
        $imagenes[] = $imagen;
    }
    // Convertir el array a JSON y mostrarlo
    echo json_encode($imagenes);
} else {
    // Manejar errores si la consulta falla
    echo "Error al consultar las rutas de las imágenes de la tabla de películas.";
}
?>
