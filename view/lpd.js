
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
    
    

        // if (crear.style.display === "block") {
        //     // Si es "block", cambia a "none" para ocultar el formulario
        //     crear.style.display = "none";
        // } else {
        //     // Si no es "block", cambia a "block" para mostrar el formulario
        //     crear.style.display = "block";
        // }
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
                console.log(ajax.responseText)
                if (ajax.responseText === "ok") {
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
                    Swal.fire({
                    icon: 'error',
                    title: 'Error al crear la película',
                    showCancelButton: false,
                    timer: 1500
                });
                }
            }
                    
    
        };
    
        // Enviamos la solicitud HTTP al servidor con los datos en 'formdata'
        ajax.send(formdata);
    }
    


// Recoger los roles
// Creacion de la funcion 

function recogerAno() {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                try {
                    var respuestaAño = JSON.parse(ajax.responseText); // Convertir la respuesta a un objeto JavaScript
                    var selectAño = document.getElementById("ano_crear");

                    // Limpiar opciones existentes
                    selectAño.innerHTML = "";

                    // Agregar la opción predeterminada
                    var opciones = document.createElement("option");
                    opciones.value = "";
                    opciones.text = "Seleccionar una opción";
                    selectAño.appendChild(opciones);

                    // Verificar si la respuesta está en el formato esperado
                    if (Array.isArray(respuestaAño)) {
                        // Agregar nuevas opciones
                        respuestaAño.forEach(function(año) {
                            var option = document.createElement("option");
                            option.value = año.id_ano_peli;
                            option.text = año.ano;
                            selectAño.appendChild(option);
                        });
                    } else {
                        console.error("La respuesta no es un array:", respuestaAño);
                    }
                } catch (e) {
                    console.error("Error al procesar la respuesta JSON: ", e);
                }
            } else {
                console.error("Error en la solicitud AJAX. Estado: " + ajax.status);
            }
        }
    };

    // Configurar y enviar la solicitud
    ajax.open("GET", "../proc/ano.php", true);
    ajax.send();
}

// Llamamos a la función para que se ejecute al cargar la página
recogerAno();



function recogerPais() {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                try {
                    var respuestaPais = JSON.parse(ajax.responseText); // Convertir la respuesta a un objeto JavaScript
                    var selectPais = document.getElementById("pais_crear");

                    // Limpiar opciones existentes
                    selectPais.innerHTML = "";

                    // Agregar la opción predeterminada
                    var opciones = document.createElement("option");
                    opciones.value = "";
                    opciones.text = "Seleccionar una opción";
                    selectPais.appendChild(opciones);

                    // Verificar si la respuesta está en el formato esperado
                    if (Array.isArray(respuestaPais)) {
                        // Agregar nuevas opciones
                        respuestaPais.forEach(function(pais) {
                            var option = document.createElement("option");
                            option.value = pais.id_pais;
                            option.text = pais.nombre_pais;
                            selectPais.appendChild(option);
                        });
                    } else {
                        console.error("La respuesta no es un array:", respuestaPais);
                    }
                } catch (e) {
                    console.error("Error al procesar la respuesta JSON: ", e);
                }
            } else {
                console.error("Error en la solicitud AJAX. Estado: " + ajax.status);
            }
        }
    };

    // Configurar y enviar la solicitud
    ajax.open("GET", "../proc/pais.php", true);
    ajax.send();

}
recogerPais();


function recogerGenero() {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                try {
                    var respuestaGenero = JSON.parse(ajax.responseText); // Convertir la respuesta a un objeto JavaScript
                    var selectGenero = document.getElementById("gen_crear");

                    // Limpiar opciones existentes
                    selectGenero.innerHTML = "";

                    // Agregar la opción predeterminada
                    var opciones = document.createElement("option");
                    opciones.value = "";
                    opciones.text = "Seleccionar una opción";
                    selectGenero.appendChild(opciones);

                    // Verificar si la respuesta está en el formato esperado
                    if (Array.isArray(respuestaGenero)) {
                        // Agregar nuevas opciones
                        respuestaGenero.forEach(function(gen) {
                            var option = document.createElement("option");
                            option.value = gen.id_gen; // Corregido para usar la propiedad id_genero
                            option.text = gen.nombre_gen; // Corregido para usar la propiedad nombre_genero
                            selectGenero.appendChild(option);
                        });
                    } else {
                        console.error("La respuesta no es un array:", respuestaGenero);
                    }
                } catch (e) {
                    console.error("Error al procesar la respuesta JSON: ", e);
                }
            } else {
                console.error("Error en la solicitud AJAX. Estado: " + ajax.status);
            }
        }
    };

    // Configurar y enviar la solicitud
    ajax.open("GET", "../proc/genero.php", true);
    ajax.send();
}

// Llamamos a la función para que se ejecute al cargar la página
recogerGenero();




function BotonEditar(id_peli) {
    var form_editar = document.getElementById("form_editar");
    var crear = document.getElementById("form__crear");
  
    // if (form_editar.style.display === "block") {
    //     // Si es "block", cambia a "none" para ocultar el formulario
    //     form_editar.style.display = "none";
    //     crear.style.display = "block";
    // } else {
    //     // Si no es "block", cambia a "block" para mostrar el formulario
    //     form_editar.style.display = "block";
    //     crear.style.display = "none";
    // }

    // Creamos una nueva instancia de FormData
    var formdata = new FormData();
    // Agregamos una nueva clave y valor al objeto FormData
    formdata.append('id_peli', id_peli);
    // Creamos un objeto XMLHttpRequest
    var ajax = new XMLHttpRequest();
    // Definimos el método, la URL y establecemos que sea asíncrono
    ajax.open('POST', '../proc/consulta_editar_pelis.php', true);

    // Definimos la función que se ejecutará cuando la solicitud AJAX esté completa
    ajax.onload = function () {
        // Verificamos si la solicitud fue exitosa (código de estado 200)
        if (ajax.status === 200) {
            console.log(ajax.responseText)
            var json = JSON.parse(ajax.responseText);

            // Verificamos si hay datos en la respuesta JSON
            document.getElementById("id_peli").value = json.id_peli;
            document.getElementById("desc_editar").value = json.desc_peli;
            document.getElementById("ano_editar").value = json.id_ano_peli;
            document.getElementById("pais_editar").value = json.id_pais;
            document.getElementById("gen_editar").value = json.id_gen;
        } else {
            editar.innerHTML = "Error en la solicitud AJAX";
        }
    }

    // Enviamos la solicitud HTTP al servidor con los datos en 'formdata'
    ajax.send(formdata);
}

// EDITAR PELÍCULA 
function EditarPeli() {
    var editar = document.getElementById("form_editar"); // Obtenemos el elemento con el id "editar"

    // Creamos una nueva instancia de FormData
    var formdata = new FormData(editar);
    
    // Creamos un objeto XMLHttpRequest
    var ajax = new XMLHttpRequest();
    // Definimos el método, la URL y establecemos que sea asíncrono
    ajax.open('POST', '../proc/proc_editar_pelis.php', true);

    // Definimos la función que se ejecutará cuando la solicitud AJAX esté completa
    ajax.onload = function () {
        // Verificamos si la solicitud fue exitosa (código de estado 200)
        if (ajax.status === 200) {
            console.log(ajax.responseText)
            if (ajax.responseText === "ok") {
                // Si la respuesta es "ok", mostramos un mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Película editada',
                    showConfirmButton: false,
                    timer: 1500
                });
                // Resetear el formulario
                editar.reset();
                // Refrescar el listado de registros y eliminar filtros que haya activos
                CrudPelis('');
            } else {
                // Si la respuesta no es "ok", mostramos un mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error al editar la película',
                    showCancelButton: false,
                    timer: 1500
                });
            }
        } else {
            editar.innerHTML = "Error en la solicitud AJAX";
        }
    }

    // Enviamos la solicitud HTTP al servidor con los datos en 'formdata'
    ajax.send(formdata);
}


function recogerAnoEditar() {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                try {
                    var respuestaAño = JSON.parse(ajax.responseText); // Convertir la respuesta a un objeto JavaScript
                    var selectAño = document.getElementById("ano_editar");

                    // Limpiar opciones existentes
                    selectAño.innerHTML = "";

                    // Agregar la opción predeterminada
                    var opciones = document.createElement("option");
                    opciones.value = "";
                    opciones.text = "Seleccionar una opción";
                    selectAño.appendChild(opciones);

                    // Verificar si la respuesta está en el formato esperado
                    if (Array.isArray(respuestaAño)) {
                        // Agregar nuevas opciones
                        respuestaAño.forEach(function(año) {
                            var option = document.createElement("option");
                            option.value = año.id_ano_peli;
                            option.text = año.ano;
                            selectAño.appendChild(option);
                        });
                    } else {
                        console.error("La respuesta no es un array:", respuestaAño);
                    }
                } catch (e) {
                    console.error("Error al procesar la respuesta JSON: ", e);
                }
            } else {
                console.error("Error en la solicitud AJAX. Estado: " + ajax.status);
            }
        }
    };

    // Configurar y enviar la solicitud
    ajax.open("GET", "../proc/ano.php", true);
    ajax.send();
}

// Llamamos a la función para que se ejecute al cargar la página
recogerAnoEditar();

function recogerPaisEditar() {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                try {
                    var respuestaPais = JSON.parse(ajax.responseText); // Convertir la respuesta a un objeto JavaScript
                    var selectPais = document.getElementById("pais_editar");

                    // Limpiar opciones existentes
                    selectPais.innerHTML = "";

                    // Agregar la opción predeterminada
                    var opciones = document.createElement("option");
                    opciones.value = "";
                    opciones.text = "Seleccionar una opción";
                    selectPais.appendChild(opciones);

                    // Verificar si la respuesta está en el formato esperado
                    if (Array.isArray(respuestaPais)) {
                        // Agregar nuevas opciones
                        respuestaPais.forEach(function(pais) {
                            var option = document.createElement("option");
                            option.value = pais.id_pais;
                            option.text = pais.nombre_pais;
                            selectPais.appendChild(option);
                        });
                    } else {
                        console.error("La respuesta no es un array:", respuestaPais);
                    }
                } catch (e) {
                    console.error("Error al procesar la respuesta JSON: ", e);
                }
            } else {
                console.error("Error en la solicitud AJAX. Estado: " + ajax.status);
            }
        }
    };

    // Configurar y enviar la solicitud
    ajax.open("GET", "../proc/pais.php", true);
    ajax.send();

}
recogerPaisEditar();


function recogerGeneroEditar() {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                try {
                    var respuestaGenero = JSON.parse(ajax.responseText); // Convertir la respuesta a un objeto JavaScript
                    var selectGenero = document.getElementById("gen_editar");

                    // Limpiar opciones existentes
                    selectGenero.innerHTML = "";

                    // Agregar la opción predeterminada
                    var opciones = document.createElement("option");
                    opciones.value = "";
                    opciones.text = "Seleccionar una opción";
                    selectGenero.appendChild(opciones);

                    // Verificar si la respuesta está en el formato esperado
                    if (Array.isArray(respuestaGenero)) {
                        // Agregar nuevas opciones
                        respuestaGenero.forEach(function(gen) {
                            var option = document.createElement("option");
                            option.value = gen.id_gen; // Corregido para usar la propiedad id_genero
                            option.text = gen.nombre_gen; // Corregido para usar la propiedad nombre_genero
                            selectGenero.appendChild(option);
                        });
                    } else {
                        console.error("La respuesta no es un array:", respuestaGenero);
                    }
                } catch (e) {
                    console.error("Error al procesar la respuesta JSON: ", e);
                }
            } else {
                console.error("Error en la solicitud AJAX. Estado: " + ajax.status);
            }
        }
    };

    // Configurar y enviar la solicitud
    ajax.open("GET", "../proc/genero.php", true);
    ajax.send();
}

// Llamamos a la función para que se ejecute al cargar la página
recogerGeneroEditar();


// ELIMINAR USUARIO
function BotonEliminar(id_peli) {
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
            // Agregamos una nueva clave y valor al objeto FormData
            formdata.append('id_peli', id_peli);
            // Creamos un objeto XMLHttpRequest
            var ajax = new XMLHttpRequest();
            // Definimos el método, la URL y establecemos que sea asíncrono
            ajax.open('POST', '../proc/proc_eliminar_pelis.php', true);
            ajax.onload = function() {
                if (ajax.status === 200) {
                    if (ajax.responseText === "ok") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Película eliminada',
                            showCancelButton: false,
                            timer: 1500
                        }).then(() => {
                            // Recargar la página o realizar alguna otra acción necesaria
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al eliminar la película',
                            showCancelButton: false,
                            timer: 1500
                        });
                    }
                }
            }
            // Enviamos la solicitud HTTP al servidor con los datos en 'formdata'
            ajax.send(formdata);
        }
    });
}


// function crearPeli(id_peli) {
//     // Obtenemos el elemento con el id "form_crear"
//     var crear = document.getElementById("form__crear");


//     if (crear.style.display === "block") {
//         // Si es "block", cambia a "none" para ocultar el formulario
//         crear.style.display = "none";
//     } else {
//         // Si no es "block", cambia a "block" para mostrar el formulario
//         crear.style.display = "block";
//     }
//     // Creamos una nueva instancia de FormData
//     var formdata = new FormData(crear);

//     // Agregamos nueva clave y valor al objeto FormData
//     formdata.append('id_peli', id_peli);

//     // Creamos el objeto XMLHttpRequest
//     var ajax = new XMLHttpRequest();

//     // Definimos método, URL y que sea asíncrono
//     ajax.open('POST', './crear_pelis.php', true);

//     // Definimos la función que se ejecutará cuando la solicitud AJAX sea completada
//     ajax.onload = function() {
//         // Variable para construir las filas de la tabla HTM

//         // Verificamos si la solicitud fue exitosa (código de estado 200)
//         if (ajax.status === 200) {
//             if (ajax.responseText == "ok") {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Pelicula creado',
//                     showConfirmButton: false,
//                     timer: 1500
//                 });
//                 // Resetear el formulario
//                 crear.reset();
//                 // Refrescar el listado de registros y eliminar filtros que haya activos
//                 listarUsuarios('');
                
//             }else{
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error al crear la película',
//                     showCancelButton: false,
//                     timer: 1500
//                 });
//             }
//         }
                

//     };

//     // Enviamos la solicitud HTTP al servidor con los datos en 'formdata'
//     ajax.send(formdata);
// }

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
  

