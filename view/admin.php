<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./lpd.js"></script>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    
</body>
</html>
<?php
// Inicializamos la sesión
// session_start();

// // Si existe creada la variable de sesión "username" le permitirá pasar al listado
// if ($_SESSION['usuario']) {

?>

    <header>
        <button id="cerrarSesionBtn" class="botonLila" onclick='cerrarSesion();'>Cerrar Sesión</button>
        <button id="recursos" class="botonLila" onclick='redirigirARecursos();'>Recursos </button>
    </header>

    <form action="" method="post" id="frmbusqueda">
        <div class="form-group">
            <br>
            <input type="text" name="buscar" id="buscar" placeholder="Buscar..." class="form-control">
            <h3>USUARIOS</h3>
            <button type='button' id='crear_boton' onclick='BotonCrear();'>Crear</button>
            <br>
        </div>
    </form>

    <div class="container" id="container">
        <div class="row">
            <div class="card-busqueda">
                <div>
                    <table class="table table-hover table-responsive">
                        <thead>
                            <tr>
                                <th>id_user</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Contraseña</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Editar</th>
                                <th>Eliminar</th>               
                               
                            </tr>
                        </thead>
                        <tbody id="resultado">
                            <!-- Aquí irán los datos de la tabla -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>


    
   

