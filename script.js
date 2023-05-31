var usuarios = [];

function cargarUsuarios() {
  // Realizar la solicitud AJAX para obtener los usuarios desde "filtrar.php"
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Procesar la respuesta JSON y guardar los usuarios en la variable "usuarios"
      usuarios = JSON.parse(xhr.responseText);
    }
  };
  xhr.open('GET', 'filtrar.php', true);
  xhr.send();
}

function filtrarUsuarios() {
  var filtroInput = document.getElementById('filtroInput');
  var filtro = filtroInput.value.toUpperCase();

  var empresaInput = document.getElementById('empresaInput');
  var idEmpresa = empresaInput.value;

  var tablaUsuarios = document.getElementById('tablaUsuarios');
  var filas = tablaUsuarios.getElementsByTagName('tr');

  // Vaciar la tabla, excepto la primera fila que contiene los encabezados
  for (var i = filas.length - 1; i > 0; i--) {
    tablaUsuarios.deleteRow(i);
  }

  // Recargar los datos filtrados en la tabla
  for (var i = 0; i < usuarios.length; i++) {
    var usuario = usuarios[i];
    var apellido = usuario.apellido.toUpperCase();
    var nombre = usuario.nombre.toUpperCase();
    var ip = usuario.ip.toUpperCase();

    if ((nombre.includes(filtro) || ip.includes(filtro) || apellido.includes(filtro)) &&
        (idEmpresa === '' || usuario.idEmpresa.toString() === idEmpresa)) {
      var fila = tablaUsuarios.insertRow();
      fila.innerHTML = '<td>' + usuario.id + '</td>' +
                       '<td>' + usuario.nombre + '</td>' +
                       '<td>' + usuario.apellido + '</td>' +
                       '<td>' + usuario.empresa + '</td>' +
                       '<td>' + usuario.servidores + '</td>' +
                       '<td>' + usuario.usuario + '</td>' +
                       '<td>' + usuario.contraseña + '</td>' +
                       '<td>' + usuario.sector + '</td>' +
                       '<td>' + usuario.interno + '</td>' +
                       '<td>' + usuario.email + '</td>' +
                       '<td>' + usuario.impresora + '</td>' +
                       '<td>' + usuario.ip + '</td>';
    }
  }
}

function guardarUsuario(event) {
  event.preventDefault();

  var id = document.getElementById("id").value;
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var empresa = document.getElementById("empresa").value;
  var servidores = document.getElementById("servidores").value;
  var usuario = document.getElementById("usuario").value;
  var contraseña = document.getElementById("contraseña").value;
  var sector = document.getElementById("sector").value;
  var interno = document.getElementById("interno").value;
  var email = document.getElementById("email").value;
  var impresora = document.getElementById("impresora").value;
  var ip = document.getElementById("ip").value;

  var data = new FormData();
  data.append("id", id);
  data.append("nombre", nombre);
  data.append("apellido", apellido);
  data.append("empresa", empresa);
  data.append("servidores", servidores);
  data.append("usuario", usuario);
  data.append("contraseña", contraseña);
  data.append("sector", sector);
  data.append("interno", interno);
  data.append("email", email);
  data.append("impresora", impresora);
  data.append("ip", ip);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "guardar_usuario.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = xhr.responseText;
      if (response === "success") {
        document.getElementById("formulario").reset();
        alert("Usuario guardado exitosamente.");
      } else {
        alert("Error al guardar el usuario.");
      }
    }
  };
  xhr.send(data);
}

// Cargar usuarios al cargar la página
window.onload = function () {
  cargarUsuarios();

  var buscarButton = document.getElementById('button-buscar');
  buscarButton.addEventListener('click', filtrarUsuarios);

  var empresaInput = document.getElementById('empresaInput');
  empresaInput.addEventListener('change', filtrarUsuarios);
};
