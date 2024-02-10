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
            console.log(ajax.responseText)
            var peliculas = JSON.parse(ajax.responseText);
            
            // Construir el HTML para mostrar las imágenes de las películas
            var html = '';
            peliculas.forEach(function(pelicula) {
                // Agregar un elemento <img> para cada película
                html += '<img src="' + pelicula.caratula_peli + '" alt="' + pelicula.desc_peli + '"  class="row__poster row__posterLarge">';
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
