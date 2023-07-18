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
    var sector = usuario.sector.toUpperCase();
    var usu = usuario.usuario.toUpperCase();

    if ((nombre.includes(filtro) || ip.includes(filtro) || apellido.includes(filtro) || usu.includes(filtro) ||  sector.includes(filtro))  &&
        (idEmpresa === '' || usuario.idEmpresa.toString() === idEmpresa)) {
      var claseCSS = i % 2 === 0 ? 'color-fondo-1' : 'color-fondo-2';    
      var fila = tablaUsuarios.insertRow();
      fila.innerHTML = '<td class="' + claseCSS + '">' + usuario.id + '</td>' +
  '<td class="' + claseCSS + '">' + usuario.nombre + '</td>' +
  '<td class="' + claseCSS + '">' + usuario.apellido + '</td>' +
  '<td class="' + claseCSS + '">' + usuario.empresa + '</td>' +
  '<td class="' + claseCSS + '">' + usuario.servidores + '</td>' +
  '<td class="' + claseCSS + '">' + usuario.usuario + '</td>' +
  '<td class="' + claseCSS + '">' + usuario.contraseña + '</td>' +
  '<td class="' + claseCSS + '">' + usuario.sector + '</td>' +
  '<td class="' + claseCSS + '">' + usuario.interno + '</td>' +
  '<td class="' + claseCSS + '">' + usuario.email + '</td>' +
  '<td class="' + claseCSS + '">' + usuario.impresora + '</td>' +
  '<td class="' + claseCSS + '">' + usuario.ip + '</td>' +
  '<td class="' + claseCSS + '"><a href="formulario_editar.html?id=' + usuario.id + '" onclick="editarUsuario(' + usuario.id + ')">Editar</a></td>';

    }
  }
}

function editarUsuario(id) {
  window.location.href = 'formulario_editar.html?id=' + id;
}

function obtenerIdUsuario() {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

function autocompletarFormulario() {
  var idUsuario = obtenerIdUsuario();
  var usuario = usuarios.find(function(u) {
    return u.id === idUsuario;
  });

  if (usuario) {
    document.getElementById('id').value = usuario.id;
    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('apellido').value = usuario.apellido;
    document.getElementById('empresa').value = usuario.empresa;
    document.getElementById('servidores').value = usuario.servidores;
    document.getElementById('usuario').value = usuario.usuario;
    document.getElementById('contraseña').value = usuario.contraseña;
    document.getElementById('sector').value = usuario.sector;
    document.getElementById('interno').value = usuario.interno;
    document.getElementById('email').value = usuario.email;
    document.getElementById('impresora').value = usuario.impresora;
    document.getElementById('ip').value = usuario.ip;
  }
}

function actualizarUsuario(event) {
  event.preventDefault();

  var id = document.getElementById("id").value; // Obtener el ID del usuario a actualizar

  // Buscar al usuario por su ID en el arreglo "usuarios"
  var usuario = usuarios.find(function(u) {
    return u.id.toString() === id.toString();
  });

  if (usuario) {
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
    xhr.open("POST", "actualizar_usuario.php", true); // Archivo PHP para actualizar el usuario
    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = xhr.responseText;
        if (response === "success") {
          alert("Usuario actualizado exitosamente.");
          // Realizar cualquier acción adicional después de actualizar el usuario
        } else {
          alert("Error al actualizar el usuario.");
        }
      }
    };
    xhr.send(data);
  } else {
    alert("No se encontró el usuario para actualizar.");
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

  var filtroInput = document.getElementById('filtroInput');
  filtroInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      filtrarUsuarios();
    }
  });

  // Autocompletar el formulario de edición si se está en la página de edición
  if (window.location.pathname.includes('formulario_editar.html')) {
    autocompletarFormulario();
  }
};
