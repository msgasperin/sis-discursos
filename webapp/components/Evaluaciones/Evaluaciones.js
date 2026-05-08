// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ FUNCIONES MODAL LISTADO PEDIDOS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const TabEvaluaciones = () => {
   let fecha = fnFechaActual();
   activarLoad('Cargando evaluaciones...');
   let html =
   `<div class="row">
      <div class="col-xl-10 col-lg-10 col-md-10 col-sm-8 col-6 mt-2">
         <div class="fs-4"> <i class="bi bi-clipboard-data"></i> Evaluaciones</div>
      </div>
      <div class="col-xl-2 col-lg-2 col-md-2 col-sm-4 col-6 mt-2">
         <button class="btn btn-dark btn-lib btn-redondo w-100 fs-6" type="button" id="btnNuevaCita" onclick="ModalFormEvaluacion();"><i class="bi bi-plus-lg"></i> Nueva evaluación</button>
      </div>
   </div>
   <div class="row mt-3">
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mt-3" align="right">
         <div class="input-group">
            <input type="date" name="inpFechaIniCita" id="inpFechaIniCita" class="form-control" value="${fecha}">
            <input type="date" name="inpFechaFinCita" id="inpFechaFinCita" class="form-control" value="${fechaRangoAdelante}">
            <button class="btn btn-dark" type="button" onclick="fn_obtiene_pedidos_fecha();"><i class="bi bi-arrow-clockwise"></i></button>
         </div>
      </div>
      <div class="col-xl-3 offset-xl-5 col-lg-3 offset-lg-5 col-md-4 offset-md-4 col-sm-6 col-12 mt-3" align="right">
         <div class="input-group">
            <input type="text" name="inpBusquedaEvaluaciones" id="inpBusquedaEvaluaciones" class="form-control border-end-0" placeholder="Buscar evaluaciones"  onkeyUp="fn_buscar_evaluaciones();">
            <span class="input-group-text border-start-0 bg-white"><i class="bi bi-search"></i></span>
         </div>
      </div>
   </div>
   <div class="mt-4">
      <div id="listado_evaluaciones"></div>
   </div>`;

   $('#containerMain').html(html);
   setTimeout(() => {
      pintarEvaluaciones('listado_evaluaciones');
      closeLoad();
   }, 500);
}

const pintarEvaluaciones = (containerId) => {
   const contenedor = document.getElementById(containerId);
   
   const evaluaciones = [
      { id: '1', cliente: 'Industrias Alfa', registro: '01-05-2026', aplicacion: '10-05-2026', hora:'12:00', personas: 15, tipo: 'Guía de referencia I', estatus: 'Programada', color: 'primary' },
      { id: '2', cliente: 'Servicios Beta', registro: '02-05-2026', aplicacion: '08-05-2026', hora:'12:00', personas: 45, tipo: 'Guía de referencia II', estatus: 'Aplicada', color: 'success', resultado: 'Muy Alto' },
      { id: '3', cliente: 'Logística Delta', registro: '03-05-2026', aplicacion: '12-05-2026', hora:'12:00', personas: 8, tipo: 'Guía de referencia III', estatus: 'Programada', color: 'primary' },
      { id: '4', cliente: 'Consultoría Gama', registro: '04-05-2026', aplicacion: '07-05-2026', hora:'12:00', personas: 120, tipo: 'Guía de referencia II', estatus: 'Aplicada', color: 'success', resultado: 'Bajo' },
      { id: '5', cliente: 'Manufacturas Zeta', registro: '04-05-2026', aplicacion: '15-05-2026', hora:'12:00', personas: 30, tipo: 'Guía de referencia I', estatus: 'Programada', color: 'primary' },
      { id: '6', cliente: 'Tiendas Omega', registro: '05-05-2026', aplicacion: '06-05-2026', hora:'12:00', personas: 22, tipo: 'Guía de referencia III', estatus: 'Aplicada', color: 'success', resultado: 'Alto' },
      { id: '7', cliente: 'Banco Capital', registro: '06-05-2026', aplicacion: '20-05-2026', hora:'12:00', personas: 55, tipo: 'Guía de referencia II', estatus: 'Programada', color: 'primary' }
   ];

   // Función interna para obtener el color quemado del resultado
   const obtenerEstiloResultado = (nivel) => {
      const mapeo = {
         'Muy Alto': { color: '#8b0000', icono: 'bi-exclamation-triangle-fill' },
         'Alto':     { color: '#cc5500', icono: 'bi-exclamation-octagon-fill' },
         'Medio':    { color: '#b8860b', icono: 'bi-info-circle-fill' },
         'Bajo':     { color: '#1e5631', icono: 'bi-check-circle-fill' },
         'Nulo':     { color: '#4a4a4a', icono: 'bi-slash-circle' }
      };
      return mapeo[nivel] || mapeo['Nulo'];
   };

   let html = `<div class="row g-4">`;

   evaluaciones.forEach(ev => {
      // Lógica para el bloque de resultado (solo si está Aplicada)
      let htmlResultado = '';
      if (ev.estatus === 'Aplicada' && ev.resultado) {
         const estilo = obtenerEstiloResultado(ev.resultado);
         htmlResultado = `
            <div class="mt-3 p-2 rounded-3 d-flex align-items-center justify-content-between" 
                 style="background-color: ${estilo.color}10; border: 1px dashed ${estilo.color}50;">
               <div class="d-flex align-items-center">
                  <i class="bi ${estilo.icono} me-2" style="color: ${estilo.color};"></i>
                  <small class="text-secondary fw-medium">Resultado:</small>
               </div>
               <span class="fw-bold" style="color: ${estilo.color}; font-size: 0.8rem;">
                  ${ev.resultado.toUpperCase()}
               </span>
            </div>`;
      }

      html += `
      <div class="col-12 col-md-6 col-lg-4">
         <div class="card h-100 shadow border-0">
            <div class="card-header bg-white border-bottom-0 pt-3 d-flex justify-content-between align-items-center">
               <span class="badge rounded-pill bg-${ev.color} bg-opacity-10 text-${ev.color} border border-${ev.color}">
                  ${ev.estatus}
               </span>
               <small class="text-muted">ID: #${ev.id}</small>
            </div>
            <div class="card-body">
               <h5 class="card-title text-dark fw-bold mb-3">${ev.cliente}</h5>
               
               <div class="mb-2">
                  <p class="text-secondary mb-1 fs-7">Evaluación:</p>
                  <span class="fw-medium text-dark"><i class="bi bi-file-earmark-text me-1"></i>${ev.tipo}</span>
               </div>

               <div class="row mt-3">
                  <div class="col-6">
                     <p class="text-secondary mb-0 fs-8">Registro:</p>
                     <small class="fw-bold text-dark">${ev.registro}</small>
                  </div>
                  <div class="col-6 border-start">
                     <p class="text-secondary mb-0 fs-8">Aplicación:</p>
                     <small class="fw-bold text-dark">${ev.aplicacion} <span class="text-muted fw-normal">${ev.hora}</span></small>
                  </div>
               </div>

               <div class="mt-3 p-2 bg-light rounded d-flex align-items-center">
                  <i class="bi bi-people text-primary me-2"></i>
                  <span class="small text-dark">Personas: <strong>${ev.personas}</strong></span>
               </div>

               <!-- Aquí se inyecta el resultado solo si aplica -->
               ${htmlResultado}

            </div>
            <div class="card-footer bg-white border-top-0 pb-3">
               <div class="d-flex justify-content-end gap-2">`;
                  if (ev.estatus === 'Aplicada') {
                     html+=`
                     <button class="btn btn-sm btn-outline-success px-3 btn-redondo" onclick="ModalVerTests();">
                        Ver Evaluaciones
                     </button>`;
                  }
                  
                  if (ev.estatus === 'Programada') {
                     html+=`
                     <a href="guia1" target="_blank" class="btn btn-sm btn-secondary btn-info-custom btn-redondo text-white" title="Aplicar evaluación">
                        Aplicar evaluación
                     </a>
                     <button class="btn btn-sm btn-outline-secondary btn-redondo ms-1" title="Editar" onclick="ModalFormEvaluacion();">
                        <i class="bi bi-pencil"></i>
                     </button>
                     <button class="btn btn-sm btn-outline-danger btn-redondo ms-1" title="Eliminar">
                        <i class="bi bi-trash"></i>
                     </button>`;
                  }
                  html+=`
               </div>
            </div>
         </div>
      </div>`;
   });

   html += `</div>`;

   contenedor.innerHTML = html;
}

const ModalFormEvaluacion = () => {
   let html = `
   <div class="modal fade modal-superior-blur" id="modalFormEvaluacion" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
      <div class="modal-dialog modal-lg modal-fullscreen-md-down">
         <div class="modal-content sombra-modal">
            <div class="modal-header modal-head-per">
               <h1 class="modal-title fs-5">Registrar Nueva Evaluación</h1>
               <button type="button" class="btn btn-outline-light btn-sm btn-redondo" data-bs-dismiss="modal" aria-label="Close">
                  <i class="bi bi-x-lg"></i>
               </button>
            </div>
            <div class="modal-body bg-light">
               <div class="row">
                  <div class="col-12 mt-2">
                     <b>Cliente *</b>
                     <div class="input-group">
                        <select name="clienteEval" id="clienteEval" class="form-select select2">
                           <option value="0">Seleccionar</option>
                        </select>
                        <button class="btn btn-dark" type="button" onclick="ModalFormCliente();"><i class="bi bi-plus-lg"></i></button>
                     </div>
                  </div>
                  <div class="col-12 mt-3">
                     <b>Fecha de apliación *</b>
                     <input type="date" name="fechaAplicacion" id="fechaAplicacion" class="form-control">
                  </div>
                  <div class="col-12 mt-3">
                     <b>Hora *</b>
                     <input type="time" name="horaEval" id="horaEval" class="form-control">
                  </div>
                  <div class="col-12 mt-2">
                     <b>Guía de evaluación *</b>
                     <select name="evaluacion" id="evaluacion" class="form-select">
                        <option value="0">Seleccionar</option>
                        <option value="1">Guía de evaluación I</option>
                        <option value="2">Guía de evaluación II</option>
                        <option value="3">Guía de evaluación III</option>
                     </select>
                  </div>
                  <div class="col-12 mt-3">
                     <b>No. Personas *</b>
                     <input type="text" inputmode="numeric" name="noPersonas" id="noPersonas" class="form-control" onkeypress="return fnValidaNumeros(event);">
                  </div>
                  <div class="col-12 mt-3">
                     <b>Observación</b>
                     <textarea name="obsEval" id="obsEval" class="form-control" rows="2" maxlength="200"></textarea>
                  </div>
               </div>                     
            </div>
            <div class="modal-footer bg-light border-0" align="right">
               <button type="button" class="btn btn-dark btn-redondo btn-lib">
                  Registrar Evaluación
               </button>
               <button type="buttton" class="btn btn-outline-dark btn-redondo" data-bs-dismiss="modal">
                  Cerrar
               </button>
            </div>
         </div>
      </div>
   </div>`;
   $('#modalAdmin').html(html);
   $('#modalFormEvaluacion').modal('show');
   $('.select2').select2({
      dropdownParent: $('#modalFormEvaluacion'),
      theme: 'bootstrap-5'
   });
   $('.select2').on('select2:open', function () {
      setTimeout(() => {
         let input = document.querySelector('.select2-container--open .select2-search__field');
         if (input) input.focus();
      }, 10);
   });
   setTimeout(() => {
      //Se cargará el catálogo de pacientes
   }, 100);
}

const ModalVerTests = () => {
   let html = `
   <div class="modal fade modal-superior-blur" id="modalVerTests" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
      <div class="modal-dialog modal-xl modal-fullscreen-md-down">
         <div class="modal-content sombra-modal">
            <div class="modal-header modal-head-per">
               <h1 class="modal-title fs-5">Tests aplicados en: Industrias Alfa</h1>
               <button type="button" class="btn btn-outline-light btn-sm btn-redondo" data-bs-dismiss="modal" aria-label="Close">
                  <i class="bi bi-x-lg"></i>
               </button>
            </div>
            <div class="modal-body bg-light">
               <div id="listado_tests_evaluacion"></div>
            </div>
            <div class="modal-footer bg-light border-0" align="right">
               <button type="buttton" class="btn btn-outline-dark btn-redondo" data-bs-dismiss="modal">
                  Cerrar
               </button>
            </div>
         </div>
      </div>
   </div>`;
   $('#modalAdmin').html(html);
   $('#modalVerTests').modal('show');
   setTimeout(() => {
      pintarResumenEvaluaciones('listado_tests_evaluacion')
   }, 100);
}

const pintarResumenEvaluaciones = (containerId) => {
   const contenedor = document.getElementById(containerId);
   
   const resultados = [
      { id: '101', nivel: 'Muy Alto' },
      { id: '102', nivel: 'Alto' },
      { id: '103', nivel: 'Medio' },
      { id: '104', nivel: 'Bajo' },
      { id: '105', nivel: 'Nulo' },
      { id: '106', nivel: 'Muy Alto' },
      { id: '107', nivel: 'Bajo' }
   ];

   const obtenerConfiguracion = (nivel) => {
      const mapeo = {
         'Muy Alto': { color: '#8b0000', icono: 'bi-exclamation-triangle-fill' }, // Rojo Sangre
         'Alto':     { color: '#cc5500', icono: 'bi-exclamation-octagon-fill' },  // Naranja Quemado
         'Medio':    { color: '#b8860b', icono: 'bi-info-circle-fill' },         // Dorado Oscuro
         'Bajo':     { color: '#1e5631', icono: 'bi-check-circle-fill' },        // Verde Bosque
         'Nulo':     { color: '#4a4a4a', icono: 'bi-slash-circle' }              // Gris Carbón
      };
      return mapeo[nivel] || mapeo['Nulo'];
   };

   let html = `<div class="row g-4 mt-2">`;

   resultados.forEach(res => {
      const config = obtenerConfiguracion(res.nivel);
      
      html += `
      <div class="col-6 col-md-4 col-lg-3">
         <!-- Card con borde superior grueso del color quemado -->
         <div class="card h-100 shadow-sm border-0 border-top border-4" style="border-color: ${config.color} !important;">
            <div class="card-body text-center py-4 px-3">
               
               <!-- Ícono con el tono fuerte -->
               <div class="mb-2" style="color: ${config.color};">
                  <i class="bi ${config.icono} fs-1"></i>
               </div>
               
               <!-- ID Numérico con estilo sobrio -->
               <div class="small fw-bold text-muted mb-3" style="letter-spacing: 1px;">
                  ID: ${res.id}
               </div>
               
               <!-- Badge con fondo traslúcido y texto fuerte -->
               <div class="py-2 px-1 rounded-pill fw-bold" 
                    style="font-size: 0.7rem; 
                           color: ${config.color}; 
                           background-color: ${config.color}15; 
                           border: 1px solid ${config.color}40;">
                  ${res.nivel.toUpperCase()}
               </div>

            </div>
         </div>
      </div>`;
   });

   html += `</div>`;

   contenedor.innerHTML = html;
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DECLARACIÓN DE FUNCIONES  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
window.TabEvaluaciones     = TabEvaluaciones;
window.ModalFormEvaluacion = ModalFormEvaluacion; 
window.ModalVerTests       = ModalVerTests;

