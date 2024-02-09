
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
  }
});
listarUsuarios(''); //listamos usuarios

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
              str += "<td><button type='button' id='editar' onclick='BotonEditar(" + item.id_user + ")'>Editar</button>";
              str += "</td>";
              str += "<td><button type='button' id='eliminar' onclick='BotonEliminar(" + item.id_user + ")'>Eliminar</button>";
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
  

