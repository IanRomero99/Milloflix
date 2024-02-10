<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Milloflix</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
<div id="mostrar_pelis" style="display: block" >

  <div class="nav" id="nav">
    
    <img src="../img/MILLOFLIX-31-1-2024.png" alt="" class="nav__logo">
    <button id="registrar" class="botonLila" onclick='botonRegistrarFormulario();'>Registrar</button>
    <button id="iniciar_sesion" class="botonLila" onclick='botonIniciarSesionFormulario();'>Iniciar Sesion</button>
    <img src="../img/netflix-avatar.png" alt="" class="nav__avatar">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  </div>
  <!-- header -->
  <div class="banner">
    <div class="banner__contents">
        <h1 class="banner__title">LPD</h1>
        <div class="banner__buttons">
         <button class="banner__button">Play</button> 
         <button class="banner__button">My List</button> 
        </div>
        <div class="banner__description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, eaque? Consequatur cum voluptatem quod porro fuga magni nulla aut odio? Repellat libero ipsum minima excepturi odio exercitationem ipsa, amet eligendi.
        </div>
    </div>
    <div class="banner--fadeBottom">

    </div>
  </div>
<!-- Milloflix TOP 5 -->


  <div class="row">
    <h2>MILLOFLIX TOP 5</h2>
    <div class="row__posters">
      <img src="../img/large-movie1.jpg" alt="" class="row__poster row__posterLarge">
      <img src="../img/large-movie2.jpg" alt="" class="row__poster row__posterLarge">
      <img src="../img/large-movie3.jpg" alt="" class="row__poster row__posterLarge">
      <img src="../img/large-movie4.jpg" alt="" class="row__poster row__posterLarge">
      <img src="../img/large-movie5.jpg" alt="" class="row__poster row__posterLarge">
    </div>
  </div>

  <!-- Trending Now -->
  <div class="row">
    <h2>MILLOFLIX TRENDING NOW</h2>
    <div class="row__posters">
      <img src="../img/small-movie1.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie2.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie3.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie4.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie5.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie6.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie7.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie8.jpg" alt="" class="row__poster ">
    </div>
  </div>

  <!-- Top Rated -->
  <div class="row">
    <h2>Top rated</h2>
    <div class="row__posters">
      <img src="../img/small-movie1.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie2.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie3.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie4.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie5.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie6.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie7.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie8.jpg" alt="" class="row__poster ">
    </div>
  </div>

  <!-- Action Movies -->
  <div class="row">
    <h2>Action Movies</h2>
    <div class="row__posters">
      <img src="../img/small-movie1.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie2.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie3.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie4.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie5.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie6.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie7.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie8.jpg" alt="" class="row__poster ">
    </div>
  </div>

  
  <!-- Comedy Movies -->
  <div class="row">
    <h2>Comedy Movies</h2>
    <div class="row__posters">
      <img src="../img/small-movie1.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie2.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie3.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie4.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie5.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie6.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie7.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie8.jpg" alt="" class="row__poster ">
    </div>
  </div>

  <!-- Horror Movies -->
  <div class="row">
    <h2>Horror Movies</h2>
    <div class="row__posters">
      <img src="../img/small-movie1.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie2.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie3.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie4.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie5.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie6.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie7.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie8.jpg" alt="" class="row__poster ">
    </div>
  </div>

  <!-- Romance Movies -->
  <div class="row">
    <h2>Romance Movies</h2>
    <div class="row__posters">
      <img src="../img/small-movie1.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie2.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie3.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie4.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie5.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie6.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie7.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie8.jpg" alt="" class="row__poster ">
    </div>
  </div>

  <!-- Documentaries -->
  <div class="row">
    <h2>Documentaries</h2>
    <div class="row__posters">
      <img src="../img/small-movie1.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie2.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie3.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie4.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie5.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie6.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie7.jpg" alt="" class="row__poster ">
      <img src="../img/small-movie8.jpg" alt="" class="row__poster ">
    </div>
  </div>
  <script>
    const nav = document.getElementById('nav');

    window.addEventListener('scroll', () => {
      if(window.scrollY >= 100) {
        nav.classList.add('nav__black');
      } else {
        nav.classList.remove('nav__black');
      }
    })
  </script>
</div>
<div id="form_registrar" style="display: none" >

  <div class="form-wrapper">
    <h2>Registrar</h2>
    <form action="" method="post" id="formulario_reg" onsubmit='validar_registrar();'>
    <input type="hidden" name="id_rol" value="2">
    <input type="hidden" name="id_estado" value="1">
    <div class="form-control">
        <input type="text" placeholder="Nombre..." id="username" name="username">
        <!-- <label>Email or phone number</label> -->
        <span id="error_nombre_reg"></span>
      </div>
      <div class="form-control">
        <input type="text" placeholder="Correo electronico..." id="correo_reg" name="correo_reg">
        <!-- <label>Email or phone number</label> -->
        <span id="error_correo_reg"></span>
      </div>
      <div class="form-control">
        <input type="password" placeholder="Contraseña..." id="pwd_reg" name="pwd_reg">
        <!-- <label>Password</label> -->
        <span id="error_pwd_reg"></span>
      </div>
      <button type="button" id="enviar_reg" name="enviar_reg" value="Enviar" onclick ='CrearUsuario();'>Enviar</button>
      <!-- <button class="botonLila" onclick='botonSalir();'>Volver</button> -->
      <div class="form-help">
        </div>
        <a>Need Help</a>
      </div>
    </form>
    <button class="botonLila" onclick='botonSalir();'>Volver</button>
    <p>New to Netflix? <a>Sign up now</a></p>
    <small>This page is protected by Google reCAPTCHA to ensure you're not a bot <a>Learn more.</a></small>
  </div>
</div>

<div id="form_iniciar_sesion" style="display: none">
  <div class="form-wrapper">
    <h2>Iniciar Sesión</h2>
    <form action="" method="post" id="formulario_ini" onsubmit='validar_iniciar_sesion();'>
      <div class="form-control">
        <input type="text" placeholder="Correo..." id="correo_ini" name="correo_ini">
        <!-- <label>Email or phone number</label> -->
      </div>
      <div class="form-control">
        <input type="password" placeholder="Contraseña..." id="pwd_ini" name="pwd_ini">
        <!-- <label>Password</label> -->
      </div>
      <button type="button" id="enviar_ini" name="enviar_ini" value="Enviar" onclick ='IniciarSesion();'>Enviar</button>
      <div class="form-help">
        <div class="remember-me">
        </div>
        <a>Need Help</a>
      </div>
    </form>
    <button class="botonLila" onclick='botonSalir();'>Volver</button>
    <p>New to Netflix? <a>Sign up now</a></p>
    <small>This page is protected by Google reCAPTCHA to ensure you're not a bot <a>Learn more.</a></small>
  </div>
</div>
<script src="./lpd.js"></script>
