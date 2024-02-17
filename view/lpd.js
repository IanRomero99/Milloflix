
function botonRegistrarFormulario() {
    // Oculta el contenedor principal
    document.getElementById('mostrar_pelis').style.display = 'none';

    // Muestra el formulario de registro
    document.getElementById('form_registrar').style.display = 'block';

    document.getElementById('form_iniciar_sesion').style.display = 'none';
}

  function botonIniciarSesionFormulario() {
    // Muestra el contenedor principal
    document.getElementById('mostrar_pelis').style.display = 'none';

    // Oculta el formulario de registro
    document.getElementById('form_registrar').style.display = 'none';
  
    document.getElementById('form_iniciar_sesion').style.display = 'block';
}


function botonSalir () {

     // Muestra el contenedor principal
     document.getElementById('mostrar_pelis').style.display = 'block';

     // Oculta el formulario de registro
     document.getElementById('form_registrar').style.display = 'none';
   
     document.getElementById('form_iniciar_sesion').style.display = 'none';

}

function botonCrearPelis () {
    // Oculta el contenedor principal de películas
    document.getElementById('mostrar_pelis').style.display = 'none';

    // Oculta el formulario de búsqueda
    document.getElementById('frmbusqueda').style.display = 'none';

    // Oculta el resultado de la búsqueda
    document.getElementById('resultado').style.display = 'none';
  
    // Oculta el contenedor de películas
    document.getElementById('resultado_peliculas').style.display = 'none';

    // Muestra el formulario de creación de películas
    document.getElementById('form__crear').style.display = 'block';
}


// function validar_registrar() {
//   // Validar usuario
//   var input_usuario = document.getElementById("username");
//   var error_usuario = document.getElementById("error_nombre_reg");

//   if (input_usuario.value.trim() === "" || /^\s+$/.test(input_usuario.value)) {
//       error_usuario.textContent = "El usuario está vacío";
//       error_usuario.style.color = "red";
//       input_usuario.style.border = "1px solid red";
//       return false;
//   } else {
//       input_usuario.style.border = "";
//       error_usuario.textContent = "";
//   }

//   var palabras = input_usuario.value.split(" ");
//   var palabrasValidas = 0;

//   for (var i = 0; i < palabras.length; i++) {
//       if (palabras[i].length >= 1) {
//           palabrasValidas++;
//       }
//   }

//   if (palabrasValidas !== 1) {
//       error_usuario.textContent = "El usuario solo debe tener una palabra";
//       error_usuario.style.color = "red";
//       input_usuario.style.border = "1px solid red";
//       return false;
//   } else {
//       error_usuario.textContent = "";
//   }

//   // Validar contraseña
//   var input_pwd = document.getElementById("pwd_reg");
//   var error_pwd = document.getElementById("error_pwd_reg");

//   if (input_pwd.value.trim() === "" || /^\s+$/.test(input_pwd.value)) {
//       error_pwd.textContent = "La contraseña está vacía";
//       error_pwd.style.color = "red";
//       input_pwd.style.border = "1px solid red";
//       return false;
//   } else {
//       input_pwd.style.border = "";
//       error_pwd.textContent = "";
//   }

//   if (input_pwd.value.length < 9) {
//       error_pwd.textContent = "La contraseña no cumple los requisitos";
//       error_pwd.style.color = "red";
//       input_pwd.style.border = "1px solid red";
//       return false;
//   } else {
//       error_pwd.textContent = "";
//   }

//   // Agrega aquí la validación del rol si es necesario

//   return true;
// }


function CrearUsuario() {
  var form_registrar = document.getElementById("formulario_reg");
  var formdata = new FormData(form_registrar);
  var ajax = new XMLHttpRequest();

  // Definimos la función que manejará la respuesta de la solicitud Ajax
  ajax.onreadystatechange = function() {
    // Si se ha completado la solicitud y la respuesta está lista
    if (ajax.readyState == 4) {
      // Verificamos el estado de la respuesta
      if (ajax.status == 200) {
        var resultado = JSON.parse(ajax.responseText);
        // Verificamos si la propiedad "message" del objeto JSON es "ok"
        if (resultado.message == "ok") {
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            showConfirmButton: false,
            timer: 1500
          });
          // Resetear el formulario
          form_registrar.reset();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear el usuario',
            showCancelButton: false,
            timer: 1500
          });
        }
      } else {
        console.error("Error en la solicitud AJAX: " + ajax.status);
      }
    }
  };

  // Configuramos la solicitud Ajax
  ajax.open("POST", "../proc/proc_registrarse.php", true);
  ajax.send(formdata);
}


  
function IniciarSesion() {
  var form_iniciar_sesion = document.getElementById("formulario_ini");
  var formdata = new FormData(form_iniciar_sesion);
  var ajax = new XMLHttpRequest();

  // Definimos la función que manejará la respuesta de la solicitud Ajax
  ajax.onreadystatechange = function() {
      // Si se ha completado la solicitud y la respuesta está lista
      if (ajax.readyState == 4) {
          // Verificamos el estado de la respuesta
          if (ajax.status == 200) {
              // Parseamos la respuesta JSON
              var resultado = JSON.parse(ajax.responseText);
              if (resultado.success) {
                  if (resultado.role === 'cliente') {
                      Swal.fire({
                          icon: 'success',
                          title: 'Has iniciado sesión como cliente',
                          showConfirmButton: false,
                          timer: 1500
                      });
                      window.location.href = "../view/index2.php";
                  } else if (resultado.role === 'admin') {
                      Swal.fire({
                          icon: 'success',
                          title: 'Has iniciado sesión como administrador',
                          showConfirmButton: false,
                          timer: 1500
                      });
                      window.location.href = "../view/admin.php";
                  }
                  // Resetear el formulario
                  form_iniciar_sesion.reset();
              } else {
                  // Manejar diferentes casos de error
                  switch (resultado.error) {
                      case "Noexiste":
                          Swal.fire({
                              icon: 'error',
                              title: 'Usuario no encontrado',
                              showCancelButton: false,
                              timer: 1500
                          });
                          break;
                      case "pendiente":
                          Swal.fire({
                              icon: 'warning',
                              title: 'Tu cuenta está pendiente de aprobación',
                              showCancelButton: false,
                              timer: 1500
                          });
                          break;
                      case "inactivo":
                          Swal.fire({
                              icon: 'error',
                              title: 'Tu cuenta está inactiva',
                              showCancelButton: false,
                              timer: 1500
                          });
                          break;
                      case "Passwordincorrect":
                          Swal.fire({
                              icon: 'error',
                              title: 'Contraseña incorrecta',
                              showCancelButton: false,
                              timer: 1500
                          });
                          break;
                      case "Missing fields":
                          console.error("Campos faltantes en la solicitud");
                          break;
                      default:
                          Swal.fire({
                              icon: 'error',
                              title: 'Error al iniciar sesión',
                              text: resultado.error || 'Error desconocido',
                              showCancelButton: false,
                              timer: 1500
                          });
                          break;
                  }
              }
          } else {
              console.error("Error en la solicitud AJAX: " + ajax.status);
          }
      }
  };

  // Configuramos la solicitud Ajax
  ajax.open("POST", "../proc/proc_iniciar_sesion.php", true);
  ajax.send(formdata);
}






// BUSCADOR DEL USUARIO 
document.addEventListener('DOMContentLoaded', function() {
  var buscar = document.getElementById("buscar");

  if (buscar) {
      buscar.addEventListener("keyup", function() {
          var valor = buscar.value;
          if (valor === "") {
              listarUsuarios('');
          } else {
              listarUsuarios(valor);
          }
      });
  } else {
      console.error('Elemento con ID "buscar" no encontrado');
      listarUsuarios(''); //listamos usuarios
  }
});


// Listar usuarios
function listarUsuarios(valor) {
    var resultado = document.getElementById('resultado'); // Obtenemos el elemento con el id 'resultado' y lo guardamos en la variable resultado
    
    // Creamos una nueva instancia de FormData y agregamos la clave 'busqueda' con el valor proporcionado
    var formdata = new FormData();
    formdata.append('busqueda', valor);
    
    // Creamos un objeto XMLHttpRequest
    var ajax = new XMLHttpRequest();
    
    // Indicamos el método de envío y la URL del archivo PHP
    ajax.open('POST', '../proc/listar_usuarios.php');
  
    // Definimos la función que se ejecutará cuando la solicitud Ajax haya sido completada
    ajax.onload = function() {
        // Variable para construir la cadena de HTML
        var str = "";
  
        // Verificamos si la solicitud HTTP fue exitosa (código 200)
        if (ajax.status === 200) {
            // Parseamos la respuesta JSON del servidor
            // console.log(ajax.responseText);
            var json = JSON.parse(ajax.responseText);
            // Variable para construir las filas de la tabla HTML
            var tabla = "";
  
            // Iteramos sobre cada elemento del array JSON
            json.forEach(function(item) {
                // Construimos una fila de la tabla con los datos del elemento actual
                str = "<tr><td>" + item.id_user + "</td>";
                str += "<td>" + item.nombre_user + "</td>";
                str += "<td>" + item.correo_user + "</td>";
                str += "<td>" + item.pwd_user + "</td>";
                str += "<td>" + item.nombre_rol + "</td>"; 
                str += "<td>" + item.nombre_estado + "</td>"; 
                // Agregamos esta línea para mostrar el tipo de rol
                str += "<td><button type='button' id='editar' onclick='BotonCambiar_estado(" + item.id_user + ")'>Cambiar estado</button>";
                str += "</td>";
                str += "</tr>";
                tabla += str;
            });
  
            // Insertamos la tabla construida en el elemento con id 'resultado'
            resultado.innerHTML = tabla;
        } else {
            // En caso de error, mostramos un mensaje de error en el elemento 'resultado'
            resultado.innerText = "Error en la solicitud Ajax";
        }
    };
  
    // Enviamos la solicitud HTTP al servidor con los datos en 'formdata'
    ajax.send(formdata);
  }
  
 
  
  function BotonCambiar_estado(id_user) {
    Swal.fire({
        title: "¿Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            // Creamos una nueva instancia de FormData
            var formdata = new FormData();
            // Agregamos el ID del usuario al objeto FormData
            formdata.append('id_user', id_user);
            // Creamos un objeto XMLHttpRequest
            var ajax = new XMLHttpRequest();
            // Definimos el método, la URL y si es asíncrono
            ajax.open('POST', '../proc/cambiar_estado.php', true);

            ajax.onload = function() {
                if (ajax.status === 200) { // Si la solicitud es exitosa
                    // console.log(ajax.responseText)
                    if (ajax.responseText === "ok") { // Si la respuesta es "ok"
                        Swal.fire({
                            icon: 'success',
                            title: '¡Se ha cambiado el estado correctamente!',
                            showCancelButton: false,
                            timer: 1500
                        });
                        // Aquí podrías llamar a la función para listar los usuarios nuevamente
                        // listarUsuarios(valor);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al cambiar el estado',
                            showCancelButton: false,
                            timer: 1500
                        });
                    }
                }
            }
            ajax.send(formdata); // Envía la solicitud HTTP al servidor con los datos en 'formdata'
        }
    })
}
setInterval(function() {
    // Obtener el valor actual del campo de búsqueda
    var valor = buscar.value;

    // Llamar a la función para listar usuarios con el valor actual
    listarUsuarios(valor);
    // CrudPelis(valor_peli);
}, 1000); 




  // BUSCADOR DE PELICULAS
  document.addEventListener('DOMContentLoaded', function() {
    var buscar_pelis = document.getElementById("buscar_peliculas");
  
    if (buscar_pelis) {
        buscar_pelis.addEventListener("keyup", function() {
            var valor_peli = buscar_pelis.value; // Usar buscar_pelis.value en lugar de buscar.value
            if (valor_peli === "") {
                CrudPelis('');
            } else {
                CrudPelis(valor_peli);
            }
        });
    } else {
        console.error('Elemento con ID "buscar" no encontrado');
    }
});

  CrudPelis(''); //listamos usuarios
  
  // Listar usuarios
  function CrudPelis(valor_peli) {
      var resultado = document.getElementById('resultado_peliculas'); // Obtenemos el elemento con el id 'resultado' y lo guardamos en la variable resultado
      
      // Creamos una nueva instancia de FormData y agregamos la clave 'busqueda' con el valor proporcionado
      var formdata = new FormData();
      formdata.append('busqueda', valor_peli);
      
      // Creamos un objeto XMLHttpRequest
      var ajax = new XMLHttpRequest();
      
      // Indicamos el método de envío y la URL del archivo PHP
      ajax.open('POST', '../proc/listar_pelis.php');
    
      // Definimos la función que se ejecutará cuando la solicitud Ajax haya sido completada
      ajax.onload = function() {
          // Variable para construir la cadena de HTML
          var str = "";
    
          // Verificamos si la solicitud HTTP fue exitosa (código 200)
          if (ajax.status === 200) {
              // Parseamos la respuesta JSON del servidor
              // console.log(ajax.responseText);
              var json = JSON.parse(ajax.responseText);
              // Variable para construir las filas de la tabla HTML
              var tabla = "";
    
              // Iteramos sobre cada elemento del array JSON
              json.forEach(function(item) {
                  // Construimos una fila de la tabla con los datos del elemento actual
                  str = "<tr><td>" + item.id_peli + "</td>";
                  str += "<td>" + item.desc_peli + "</td>";
                //   str += "<td>" + item.caratula_peli + "</td>";
                str += '<td><img src="' + item.caratula_peli + '" alt="Imagen de la Película" class="img_crud"></td>';
                  str += "<td>" + item.trailer_peli + "</td>";
                  str += "<td>" + item.ano + "</td>"; 
                  str += "<td>" + item.nombre_pais + "</td>"; 
                  str += "<td>" + item.nombre_gen + "</td>"; 
                //   str += "<td>" + item.nombre_pers + "</td>"; 
                  // Agregamos esta línea para mostrar el tipo de rol
                  str += "<td><button type='button' id='editar' onclick='BotonEditar(" + item.id_peli + ")'>Editar</button>";
                  str += "</td>";
                  str += "<td><button type='button' id='eliminar' onclick='BotonEliminar(" + item.id_peli + ")'>Eliminar</button>";
                  str += "</td>";
                  str += "</tr>";
                  tabla += str;
              });
    
              // Insertamos la tabla construida en el elemento con id 'resultado'
              resultado.innerHTML = tabla;
          } else {
              // En caso de error, mostramos un mensaje de error en el elemento 'resultado'
              resultado.innerText = "Error en la solicitud Ajax";
          }
      };
    
      // Enviamos la solicitud HTTP al servidor con los datos en 'formdata'
      ajax.send(formdata);
    }
    
    // Llamamos a la función listarUsuarios con un valor vacío para cargar todos los usuarios al principio
    CrudPelis('');
    
    function CrearPeli(id_peli) {
        // Obtenemos el elemento con el id "form_crear"
        var crear = document.getElementById("form__crear");
    
    
        if (crear.style.display === "block") {
            // Si es "block", cambia a "none" para ocultar el formulario
            crear.style.display = "none";
        } else {
            // Si no es "block", cambia a "block" para mostrar el formulario
            crear.style.display = "block";
        }
        // Creamos una nueva instancia de FormData
        var formdata = new FormData(crear);
    
        // Agregamos nueva clave y valor al objeto FormData
        formdata.append('id_peli', id_peli);
    
        // Creamos el objeto XMLHttpRequest
        var ajax = new XMLHttpRequest();
    
        // Definimos método, URL y que sea asíncrono
        ajax.open('POST', '../proc/crear_pelis.php', true);
    
        // Definimos la función que se ejecutará cuando la solicitud AJAX sea completada
        ajax.onload = function() {
            // Variable para construir las filas de la tabla HTM
    
            // Verificamos si la solicitud fue exitosa (código de estado 200)
            if (ajax.status === 200) {
                if (ajax.responseText == "ok") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Pelicula añadida',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Resetear el formulario
                    crear.reset();
                    // Refrescar el listado de registros y eliminar filtros que haya activos
                    CrudPelis('');
                    
                }else{
                    console.log("ERROR");
                }
            }
                    
    
        };
    
        // Enviamos la solicitud HTTP al servidor con los datos en 'formdata'
        ajax.send(formdata);
    }
    


// Recoger los roles
// Creacion de la funcion 

function recogerAno() {
    // Cogemos el elemento select donde se mostrarán los años
    var selectAno = document.getElementById("ano_crear");

    // Creamos una solicitud de Ajax
    var ajax = new XMLHttpRequest();

    // Definimos la función que manejará la respuesta de la solicitud Ajax
    ajax.onreadystatechange = function() {
        // Si la solicitud se ha completado y la respuesta está lista
        if (ajax.readyState === 4 && ajax.status === 200) {
            // Parseamos la respuesta JSON
            // console.log(ajax.responseText)
            var respuestaAno = ajax.responseText;
            // console.log(respuestaAno)
            try {
                // Convertimos la respuesta JSON a un array de objetos
                var anosJSON = JSON.parse(respuestaAno);
                console.log(anosJSON)
                // Limpiamos el select de años
                selectAno.innerHTML = "";
                
                // Recorremos los años y los añadimos al select
                for (var i = 0; i < anosJSON.length; i++) {
                    selectAno.innerHTML += "<option value='" + anosJSON[i].ano + "'>" + anosJSON[i].ano + "</option>";
                }
            } catch (e) {
                console.error("Error al parsear la respuesta JSON.");
            }
        }
    };

    // Configuramos la solicitud Ajax
    ajax.open("POST", "../proc/ano.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send();
}

// Llamamos a la función para que se ejecute al cargar la página
recogerAno();



function recogerPais() {
    // Cogemos el elemento select donde se mostrarán los países
    var selectPais = document.getElementById("pais_crear");

    // Creamos una solicitud de Ajax
    var ajax = new XMLHttpRequest();

    // Definimos la función que manejará la respuesta de la solicitud Ajax
    ajax.onreadystatechange = function() {
        // Si la solicitud se ha completado y la respuesta está lista
        if (ajax.readyState === 4 && ajax.status === 200) {
            // Parseamos la respuesta JSON
            // console.log(ajax.responseText)
            var respuestaPais = ajax.responseText;
            
            try {
                // Convertimos la respuesta JSON a un array de objetos
                var paisJSON = JSON.parse(respuestaPais);
                console.log(paisJSON)
                // Limpiamos el select de países
                selectPais.innerHTML = "";
                
                // Recorremos los países y los añadimos al select
                for (var i = 0; i < paisJSON.length; i++) {
                    selectPais.innerHTML += "<option value='" + paisJSON[i].nombre_pais + "</option>";
                }
            } catch (e) {
                console.error("Error al parsear la respuesta JSON.");
            }
        }
    };

    // Configuramos la solicitud Ajax
    ajax.open("POST", "../proc/pais.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send();
}

// Llamamos a la función para que se ejecute al cargar la página
recogerPais();



function recogerGenero() {
    // Cogemos el elemento select donde se mostrarán los países
    var selectGenero = document.getElementById("genero_crear");

    // Creamos una solicitud de Ajax
    var ajax = new XMLHttpRequest();

    // Definimos la función que manejará la respuesta de la solicitud Ajax
    ajax.onreadystatechange = function() {
        // Si la solicitud se ha completado y la respuesta está lista
        if (ajax.readyState === 4 && ajax.status === 200) {
            // Parseamos la respuesta JSON
            // console.log(ajax.responseText)
            var respuestaGenero = ajax.responseText;
            console.log(respuestaGenero)
            
            try {
                // Convertimos la respuesta JSON a un array de objetos
                var generoJSON = JSON.parse(respuestaGenero);
                // console.log(respuestaAno)
                // Limpiamos el select de países
                selectGenero.innerHTML = "";
                
                // Recorremos los países y los añadimos al select
                for (var i = 0; i < generoJSON.length; i++) {
                    selectGenero.innerHTML += "<option value='" + paisJSON[i].nombre_gen + "'>" + paisJSON[i].nombre_gen + "</option>";
                }
            } catch (e) {
                console.error("Error al parsear la respuesta JSON.");
            }
        }
    };

    // Configuramos la solicitud Ajax
    ajax.open("POST", "../proc/genero.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send();
}

// Llamamos a la función para que se ejecute al cargar la página
recogerGenero();

// function validar_registrar () {

// // Validar usuario

//   // Recogemos los id del input del usuario y luego del span que hemos creado
//   // Validar usuario
//   var nombre_registrar = document.getElementById("nombre_registrar");
//   var error_nombre = document.getElementById("error_nombre");
//   // cogemos la variable nombre_registrar  y miramos si esta vacio  o contiene solo espacios
//   if (nombre_registrar.value.trim() === "" || /^\s+$/.test(nombre_registrar.value)) {
//     error_nombre.textContent = "El usuario está vacío";
//     // Le aplicamos unos estilos para que la letra tenga color rojo, y que el input los bordes que se vean de color rojo
//     error_nombre.style.color = "red";
//     nombre_registrar.style.border = "1px solid red";
//     return false;
//   } else {
//     // Si esta bien dejamos el input y el span vacíos
//     nombre_registrar.style.border = "";
//     error_nombre.textContent = "";
//   }

//   // Validar que el usuario no tenga espacios 
//   var palabras = nombre_registrar.value.split(" ");
//   // Creamos una variable de palabras válidas
//   var palabrasValidas = 0;

//   // Recorrera toda la palabra hasta que detecte un espacio
//   for (var i = 0; i < palabras.length; i++) {
//     if (palabras[i].length >= 1) {
//       palabrasValidas++;
//     }
//   }

//   // Si el usuario tiene espacios saltara el error
//   if (palabrasValidas !== 1) {
//     // Utilizamos el text content para añadir el texto en el span
//     error_nombre.textContent = "El usuario solo debe tener una palabra";

//     // Le aplicamos unos estilos para que la letra tenga color rojo, y que el input los bordes que se vean de color rojo
//     error_nombre.style.color = "red";
//     nombre_registrar.style.border = "1px solid red";
//     return false;
//   } else {
//     // Si esta bien dejamos el input y el span vacíos
//   }

//   // Validar contraseña

//   // Recogemos los id del input del error y luego del span que hemos creado
//   var input_pwd = document.getElementById("pwd_registrar");
//   var error_pwd = document.getElementById("error_pwd_reg");


//   // Cogemos la variable nombre_registrar  y miramos si esta vacio  o contiene solo espacios
//   if (input_pwd.value.trim() === "" || /^\s+$/.test(input_pwd.value)) {
//     // Utilizamos el text content para añadir el texto en el span
//     error_pwd.textContent = "La contraseña está vacía";
//     // Le aplicamos unos estilos para que la letra tenga color rojo, y que el input los bordes que se vean de color rojo
//     error_pwd.style.color = "red";
//     input_pwd.style.border = "1px solid red";
//     return false;
//   } else {
//     // Si esta bien dejamos el input y el span vacíos
//     input_pwd.style.border = "";
//     error_pwd.textContent = "";
//   }

//   // Validar que la contraseña tiene al menos 9 caracteres
//   if (input_pwd.value.length < 9) {
//     // Utilizamos el text content para añadir el texto en el span
//     error_pwd.textContent = "La contraseña no cumple los requisitos";
//     // Le aplicamos unos estilos para que la letra tenga color rojo, y que el input los bordes que se vean de color rojo
//     error_pwd.style.color = "red";
//     input_pwd.style.border = "1px solid red";
//     return false;
//   } else {

//     return true;
//   }
// }






//   // var correo_registrar = document.getElementById("correo_registrar");
//   // var correo_registrar = correo_registrar.value.trim();
  
//   // if (valor_email === "") {
//   //     // El campo está vacío, muestra un mensaje de error
//   //     var errorMensaje_email = document.createElement("span");
//   //     errorMensaje_email.style.color = "red";
//   //     errorMensaje_email.innerHTML = "El campo de correo no puede estar vacío.";
  
//   //     // Cambia el color del borde a rojo
//   //     correo_registrar.style.border = "1px solid red";
  
//   //     // Verifica si ya hay un mensaje de error y elimínalo antes de agregar el nuevo
//   //     var mensajeAnteriorEmail = correo_registrar.nextElementSibling;
//   //     if (mensajeAnteriorEmail && mensajeAnteriorEmail.tagName === "SPAN") {
//   //         mensajeAnteriorEmail.remove();
//   //     }
  
//   //     // Agrega el mensaje de error
//   //     correo_registrar.parentNode.insertBefore(errorMensaje_email, correo_registrar.nextElementSibling);
  
//   //     return false; // Indica que hay un error y el formulario no debe ser enviado
//   // }
//   // if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(valor_email)) {
//   //     // El formato del correo electrónico es incorrecto, muestra un mensaje de error
//   //     var errorMensaje_email = document.createElement("span");
//   //     errorMensaje_email.style.color = "red";
//   //     errorMensaje_email.innerHTML = "El formato del correo electrónico es incorrecto.";
  
//   //     // Cambia el color del borde a rojo
//   //     correo_registrar.style.border = "1px solid red";
  
//   //     // Verifica si ya hay un mensaje de error y elimínalo antes de agregar el nuevo
//   //     var mensajeAnteriorEmail = correo_registrar.nextElementSibling;
//   //     if (mensajeAnteriorEmail && mensajeAnteriorEmail.tagName === "SPAN") {
//   //         mensajeAnteriorEmail.remove();
//   //     }
  
//   //     // Agrega el mensaje de error
//   //     correo_registrar.parentNode.insertBefore(errorMensaje_email, correo_registrar.nextElementSibling);
  
//   //     return false; // Indica que hay un error y el formulario no debe ser enviado
//   // }
  

