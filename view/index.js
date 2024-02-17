


// BUSCADOR DEL USUARIO 
document.addEventListener('DOMContentLoaded', function() {
    var buscar = document.getElementById("buscar_pelis");
  
    if (buscar) {
        buscar.addEventListener("keyup", function() {
            var valor = buscar.value;
            if (valor === "") {
                listarPelis('');
            } else {
                listarPelis(valor);
            }
        });
    } else {
        console.error('Elemento con ID "buscar" no encontrado');
    }
  });
  listarPelis(''); //listamos usuarios

  // Mostrar todas las pelis
function listarPelis() {
    var pelis = document.getElementById('pelis'); // Obtener el elemento donde se mostrarán las películas
    
    // Crear una nueva instancia de XMLHttpRequest
    var ajax = new XMLHttpRequest();
    
    // Indicar el método de envío y la URL del archivo PHP que manejará la solicitud
    ajax.open('POST', '../proc/proc_mostrar_pelis.php');
    
    // Definir la función que se ejecutará cuando la solicitud Ajax haya sido completada
    ajax.onload = function() {
        // Verificar si la solicitud HTTP fue exitosa (código 200)
        if (ajax.status === 200) {
            // Parsear la respuesta JSON del servidor
            // console.log(ajax.responseText)
            var peliculas = JSON.parse(ajax.responseText);
            
            // Construir el HTML para mostrar las imágenes de las películas
            var html = '';
            // console.log(peliculas);
            peliculas.forEach(function(pelicula) {
                // Agregar un elemento <img> para cada película
                html += '<a onclick="obtenerDatosPeliculas('+ pelicula.id_peli +')"><img src="' + pelicula.caratula_peli + '" alt="' + pelicula.desc_peli + '"  class="row__poster row__posterLarge"></a>';
               


            });
           
            // Mostrar las imágenes en el elemento pelis
            pelis.innerHTML = html;
        } else {
            // En caso de error, mostrar un mensaje de error en el elemento pelis
            pelis.innerText = "Error en la solicitud Ajax";
        }
    };
    
    // Enviar la solicitud HTTP al servidor
    ajax.send();
}

// Llamar a la función listarPelis para cargar las imágenes de películas
listarPelis();
// document.addEventListener('DOMContentLoaded', function() {
//     // Pasa el ID de la película que deseas obtener al llamar a la función obtenerDatosPeliculas
//     // obtenerDatosPeliculas(id_peli);
// });



function obtenerDatosPeliculas(id_peli) {
    var xhr = new XMLHttpRequest();
    var formdata = new FormData();
    formdata.append('id_peli', id_peli);
    // formdata.append('id_user', id_user);
    // console.log(id_peli);
    // console.log(id_user);
    xhr.onload = function() {
        if (xhr.status === 200) {
            // console.log(xhr.responseText);
            var peliculas = JSON.parse(xhr.responseText); // Convertir la respuesta JSON a un array de objetos
            if (peliculas.length > 0) { // Verificar si hay al menos una película en el array
                var pelicula = peliculas[0]; // Obtener la primera película del array
                var html = "<div>";
                html += "<h2>" + pelicula.desc_peli + "</h2>";
                html += '<img src="' + pelicula.caratula_peli + '" alt="Imagen de la Película" class="img_crud">';
                html += "<p> Año de estreno: " + pelicula.ano + "</p>";
                html += "<p> País: " + pelicula.nombre_pais + "</p>";
                html += "<p> Género: " + pelicula.nombre_gen + "</p>";
                html += "<input type='button' name='volver' value='Volver' id='volverInicio' onclick='volverInicio()'>";
                // html += "<input type='button' name='like' value='Like' id='like' onclick='darLike(" + id_peli + ","+ id_user +")'>";
                html += "<input type='button' name='like' value='Like' id='like' onclick='darLike(" + pelicula.id_peli + ")'>";




                html += "</div>";
                document.getElementById("dato_peli").innerHTML = html;
            } else {
                console.error('No se encontraron películas con el ID proporcionado.');
            }
        } else {
            console.error('Error al obtener los datos de las películas. Estado de la solicitud:', xhr.status);
        }
    };
    
    xhr.open('POST', '../proc/proc_verdatos_pelicula.php');
    xhr.send(formdata);
}

function darLike(id_peli) {
    var xhr = new XMLHttpRequest();
    var formdata = new FormData();
    formdata.append('id_peli', id_peli);
   
    xhr.open('POST', '../proc/proc_dar_like.php'); // Asegúrate de apuntar al archivo PHP correcto
    xhr.onload = function() {
        if (xhr.status === 200) {
            try {
                console.log(xhr.responseText)
                var resultado = JSON.parse(xhr.responseText);
                if (resultado === 'ok') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Has dado like',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (resultado === 'BORRADO') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Has borrado el like',
                        showCancelButton: false,
                        timer: 1500
                    });
                } else {
                    console.error('Error al dar like a la película:', resultado);
                }
            } catch (error) {
                console.error('Error al parsear la respuesta JSON:', error);
            }
        } else {
            console.error('Error al realizar la solicitud:', xhr.status);
        }
    };
    
    xhr.send(formdata);
}


