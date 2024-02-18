
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./lpd.js"></script>
    <link rel="stylesheet" href="./style.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    
</body>
</html>


    <header>
        <button id="cerrarSesionBtn" class="botonLila" onclick='cerrarSesion();'>Cerrar Sesión</button>
        <button id="recursos" class="botonLila" onclick='redirigirARecursos();'>Recursos </button>
    </header>

    <form action="" method="post" id="frmbusqueda" style="display: block;">
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
                                <th>Cambiar Estado</th>
                                          
                               
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


    <form action="" method="post" id="frmbusqueda" >
        <div class="form-group">
            <br>
            <input type="text" name="buscar_peliculas" id="buscar_peliculas" placeholder="Buscar..." class="form-control">
            <h3>PELICULAS</h3>
            <button type='button' id='crear_boton_pelis' onclick='botonCrearPelis();'>Crear</button>
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
                                <th>id_peli</th>
                                <th>Descripción</th>
                                <th>Caratula</th>
                                <th>Año</th>
                                <th>Pais</th>
                                <th>Genero</th>
                                <!-- <th>Personal</th>   -->
                                <th>Editar</th>
                                <th>Eliminar</th>                
                               
                            </tr>
                        </thead>
                        <tbody id="resultado_peliculas">
                            <!-- Aquí irán los datos de la tabla -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <form id="form__crear"  onsubmit="return validar();">
            <div style="padding: 10px;">
            <div class="main_div">
            <div class="title">Crear</div>
            <!-- <img src='./src/LOGO3.png' alt="Imagen de Github"> -->
            <!-- Creamos el label para el usuario con su input de texto -->
            <div class="input_box">
                <label for="desc_crear">Descripción:</label>
                <input type="text" id="desc_crear" name="desc_crear" placeholder="Descripcion...">
                <div class="icon"><i class="fas fa-user"></i></div>
                <br>
                <!-- El span servirá para que salten los errores de javascript -->
                <span id="error_usuario"></span>
            </div>
        
            <br>


            <br>

            <!-- Creamos el label para la contraseña con su input de texto -->
            <div class="input_box">
            <label for="file">Seleccionar fichero caratula:</label>
         <input type="file" name="caratula_peli" id="caratula_peli">
        
                <!-- El span servirá para que salten los errores de javascript -->
                <!-- <span id="error_contrasena"></span> -->
            </div>



            <div class="input_box">
    <label for="ano_crear">Año:</label>
    <select id="ano_crear" name="ano_crear">
        <!-- Las opciones se llenarán dinámicamente desde la base de datos -->
    </select>
    <div class="icon"><i class="fas fa-lock"></i></div>
    <br>
    <!-- El span servirá para que salten los errores de javascript -->
    <!-- <span id="error_rol"></span> -->
</div>

    
<div class="input_box">
    <label for="pais_crear">Pais:</label>
    <select id="pais_crear" name="pais_crear">
        <!-- Las opciones se llenarán dinámicamente desde la base de datos -->
    </select>
    <div class="icon"><i class="fas fa-lock"></i></div>
    <br>
    <!-- El span servirá para que salten los errores de javascript -->
    <!-- <span id="error_rol"></span> -->
</div>

    
<div class="input_box">
    <label for="gen_crear">Genero:</label>
    <select id="gen_crear" name="gen_crear">
        <!-- Las opciones se llenarán dinámicamente desde la base de datos -->
    </select>
    <div class="icon"><i class="fas fa-lock"></i></div>
    <br>
    <!-- El span servirá para que salten los errores de javascript -->
    <!-- <span id="error_rol"></span> -->
</div>
<input type="button" id="enviar_crear" name="enviar" value="Enviar" onclick="CrearPeli();">

</form>



<form id="form_editar"  onsubmit="return validar();">
            <div style="padding: 10px;">
            <div class="main_div">
            <div class="title">Editar</div>
            <!-- <img src='./src/LOGO3.png' alt="Imagen de Github"> -->
            <!-- Creamos el label para el usuario con su input de texto -->
            <div class="input_box">
            <input type="hidden" id="id_peli" name="id_peli">
                <label for="desc_editar">Descripción:</label>
                <input type="text" id="desc_editar" name="desc_editar" placeholder="Descripcion...">
                <div class="icon"><i class="fas fa-user"></i></div>
                <br>
                <!-- El span servirá para que salten los errores de javascript -->
                <span id="error_usuario"></span>
            </div>
        
            <br>


            <br>

            <!-- Creamos el label para la contraseña con su input de texto -->
            <div class="input_box">
            <label for="file">Seleccionar fichero caratula:</label>
         <input type="file" name="caratula_peli" id="caratula_peli">
        
                <!-- El span servirá para que salten los errores de javascript -->
                <!-- <span id="error_contrasena"></span> -->
            </div>



            <div class="input_box">
    <label for="ano_editar">Año:</label>
    <select id="ano_editar" name="ano_editar">
        <!-- Las opciones se llenarán dinámicamente desde la base de datos -->
    </select>
    <div class="icon"><i class="fas fa-lock"></i></div>
    <br>
    <!-- El span servirá para que salten los errores de javascript -->
    <!-- <span id="error_rol"></span> -->
</div>

    
<div class="input_box">
    <label for="pais_editar">Pais:</label>
    <select id="pais_editar" name="pais_editar">
        <!-- Las opciones se llenarán dinámicamente desde la base de datos -->
    </select>
    <div class="icon"><i class="fas fa-lock"></i></div>
    <br>
    <!-- El span servirá para que salten los errores de javascript -->
    <!-- <span id="error_rol"></span> -->
</div>

    
<div class="input_box">
    <label for="gen_editar">Genero:</label>
    <select id="gen_editar" name="gen_editar">
        <!-- Las opciones se llenarán dinámicamente desde la base de datos -->
    </select>
    <div class="icon"><i class="fas fa-lock"></i></div>
    <br>
    <!-- El span servirá para que salten los errores de javascript -->
    <!-- <span id="error_rol"></span> -->
</div>
<input type="button" id="enviar_editar" name="enviar" value="Enviar" onclick="EditarPeli();">

</form>