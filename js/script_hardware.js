var hardware = [];

function cargarHardware() {
  // Realizar la solicitud AJAX para obtener el hardware desde "filtrar_hardware.php"
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Procesar la respuesta JSON y guardar el hardware en la variable "hardware"
      hardware = JSON.parse(xhr.responseText);
    }
  };
  xhr.open('GET', '../php_hardware/filtrar_hardware.php', true);
  xhr.send();
}

function filtrarHardware() {
  var filtroInput = document.getElementById('filtroInput');
  var filtro = filtroInput.value.toUpperCase();

  var tablaHardware = document.getElementById('tablaHardware');
  var filas = tablaHardware.getElementsByTagName('tr');

  // Vaciar la tabla, excepto la primera fila que contiene los encabezados
  for (var i = filas.length - 1; i > 0; i--) {
    tablaHardware.deleteRow(i);
  }

  // Recargar los datos filtrados en la tabla
  for (var i = 0; i < hardware.length; i++) {
    var item = hardware[i];
    var nombre = item.nombre.toUpperCase();
    var apellido = item.apellido.toUpperCase();
    var sistemaOperativo = item.so.toUpperCase();
    var procesador = item.procesador.toUpperCase();
    var ram = item.ram.toUpperCase();
    var disco = item.disco.toUpperCase();
    var ubicacion = item.ubicacion.toUpperCase();
    var gpu = item.gpu.toUpperCase();
    var equipo = item.equipo.toUpperCase();

    if (nombre.includes(filtro) || apellido.includes(filtro) || sistemaOperativo.includes(filtro) ||
        procesador.includes(filtro) || ram.includes(filtro) || disco.includes(filtro) || ubicacion.includes(filtro)) {
      var claseCSS = i % 2 === 0 ? 'color-fondo-1' : 'color-fondo-2';    
      var fila = tablaHardware.insertRow();
      fila.innerHTML = '<td class="' + claseCSS + '">' + item.id + '</td>' +
                       '<td class="' + claseCSS + '">' + item.equipo + '</td>' +
                       '<td class="' + claseCSS + '">' + item.nombre + '</td>' +
                       '<td class="' + claseCSS + '">' + item.apellido + '</td>' +
                       '<td class="' + claseCSS + '">' + item.so + '</td>' +
                       '<td class="' + claseCSS + '">' + item.procesador + '</td>' +
                       '<td class="' + claseCSS + '">' + item.ram + '</td>' +
                       '<td class="' + claseCSS + '">' + item.disco + '</td>' +
                       '<td class="' + claseCSS + '">' + item.ubicacion + '</td>' +
                       '<td class="' + claseCSS + '">' + item.gpu + '</td>' +
                       '<td class="' + claseCSS + '"><a href="formulario_editar_hardware.html?id=' + item.id + '">Editar</a></td>';
    }
  }
}
function editarHardware(id) {
  window.location.href = '../html/formulario_editar_hardware.html?id=' + id;
}

// Función para obtener el ID de hardware de la URL
function obtenerIdHardware() {
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// Función para autocompletar el formulario de edición de hardware
function autocompletarFormularioHardware() {
  var idHardware = obtenerIdHardware();
  var item = hardware.find(function(h) {
    return h.id.toString() === idHardware;
  });

  if (item) {
    document.getElementById('id').value = item.id;
    document.getElementById('equipo').value= item.equipo;
    document.getElementById('nombre').value = item.nombre;
    document.getElementById('apellido').value = item.apellido;
    document.getElementById('sistemaOperativo').value = item.so;
    document.getElementById('procesador').value = item.procesador;
    document.getElementById('ram').value = item.ram;
    document.getElementById('disco').value = item.disco;
    document.getElementById('ubicacion').value = item.ubicacion;
    document.getElementById('gpu').value = item.gpu
  }
}
function actualizarHardware(event) {
  event.preventDefault();

  var id = document.getElementById('id').value;

  var item = hardware.find(function(h) {
    return h.id.toString() === id.toString();
  });

  if (item) {
    var equipo = document.getElementById('equipo').value;
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var sistemaOperativo = document.getElementById('sistemaOperativo').value;
    var procesador = document.getElementById('procesador').value;
    var ram = document.getElementById('ram').value;
    var disco = document.getElementById('disco').value;
    var ubicacion = document.getElementById('ubicacion').value;
    var gpu = document.getElementById('gpu').value; 

    var data = new FormData();
    data.append('id', id);
    data.append('equipo', equipo);
    data.append('nombre', nombre);
    data.append('apellido', apellido);
    data.append('sistemaOperativo', sistemaOperativo);
    data.append('procesador', procesador);
    data.append('ram', ram);
    data.append('disco', disco);
    data.append('ubicacion', ubicacion);
    data.append('gpu' , gpu); 
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../php_hardware/actualizar_hardware.php', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var response = xhr.responseText;
        if (response === 'success') {
          alert('Hardware actualizado exitosamente.');
          window.location.href = '../html_hardware/index_hardware.html';
        } else {
          alert('Error al actualizar el hardware.');
        }
      }
    };
    xhr.send(data);
  } else {
    alert('No se encontró el hardware para actualizar.');
  }
}
// Cargar hardware al cargar la página
window.onload = function() {
  cargarHardware();

  var buscarButton = document.getElementById('button-buscar');
  buscarButton.addEventListener('click', filtrarHardware);

  var filtroInput = document.getElementById('filtroInput');
  filtroInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      filtrarHardware();
    }
  });

  // Autocompletar el formulario de edición si se está en la página de edición
  if (window.location.pathname.includes('../html_hardware/formulario_editar_hardware.html')) {
    autocompletarFormularioHardware();
  }
};



function guardarHardware(event) {
    event.preventDefault();
  
    var id = document.getElementById("id").value;
    var equipo = document.getElementById("equipo").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var sistemaOperativo = document.getElementById("sistemaOperativo").value;
    var procesador = document.getElementById("procesador").value;
    var ram = document.getElementById("ram").value;
    var disco = document.getElementById("disco").value;
    var ubicacion = document.getElementById("ubicacion").value;
    var gpu = document.getElementById("gpu").value
  
    var data = new FormData();
    data.append("id", id);
    data.append('equipo', equipo);
    data.append("nombre", nombre);
    data.append("apellido", apellido);
    data.append("sistemaOperativo", sistemaOperativo);
    data.append("procesador", procesador);
    data.append("ram", ram);
    data.append("disco", disco);
    data.append("ubicacion", ubicacion);
    data.append("gpu", gpu)
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php_hardware/guardar_hardware.php", true); // Ajusta la ruta aquí
    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = xhr.responseText;
        if (response === "success") {
          document.getElementById("formulario").reset();
          alert("Hardware guardado exitosamente.");
        } else {
          alert("Error al guardar el hardware.");
        }
      }
    };
    xhr.send(data);
  }
  
// Cargar hardware al cargar la página
window.onload = function () {
  cargarHardware();

  var buscarButton = document.getElementById('button-buscar');
  buscarButton.addEventListener('click', filtrarHardware);

  var filtroInput = document.getElementById('filtroInput');
  filtroInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      filtrarHardware();
    }
  });
};
