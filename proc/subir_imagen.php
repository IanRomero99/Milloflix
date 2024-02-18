<?php
// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["submit"])) {
    // Verificar si se ha seleccionado un archivo
    if (isset($_FILES["imagen"]) && $_FILES["imagen"]["error"] == 0) {
        $nombre_archivo = $_FILES["imagen"]["name"];
        $tipo_archivo = $_FILES["imagen"]["type"];
        $tamano_archivo = $_FILES["imagen"]["size"];
        $ruta_temporal = $_FILES["imagen"]["tmp_name"];
        
        // Directorio donde se guardará la imagen (debe tener permisos de escritura)
        $directorio_destino = "img/";
        
        // Mover el archivo de la ruta temporal al directorio de destino
        if (move_uploaded_file($ruta_temporal, $directorio_destino . $nombre_archivo)) {
            echo "La imagen se ha subido correctamente.";
            
            // Aquí puedes almacenar la información de la imagen en la base de datos si lo deseas
            // Por ejemplo, puedes guardar la ruta de la imagen en una tabla de la base de datos
            // Y luego recuperarla cuando sea necesario para mostrar la imagen
            
            // Ejemplo de inserción en una base de datos MySQL (debes tener la conexión establecida previamente)
            // $ruta_imagen = $directorio_destino . $nombre_archivo;
            // $sql = "INSERT INTO imagenes (ruta) VALUES ('$ruta_imagen')";
            // $resultado = mysqli_query($conexion, $sql);
            
        } else {
            echo "Hubo un error al subir la imagen.";
        }
    } else {
        echo "Por favor selecciona una imagen.";
    }
}
?>
