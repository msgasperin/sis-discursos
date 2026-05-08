// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ FUNCIONES MODAL LISTADO EVALUACIONES +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const TabEvaluacionesCliente = () => {
   let fecha = fnFechaActual();
   activarLoad('Cargando evaluaciones...');
   let html =
   `<div class="row">
      <div class="col-12 mt-2">
         <div class="fs-4"> <i class="bi bi-clipboard-data"></i> Evaluaciones</div>
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
      <div id="listado_evaluaciones_cliente"></div>
   </div>`;

   $('#containerMain').html(html);
   setTimeout(() => {
      pintarEvaluacionesPorCliente('listado_evaluaciones_cliente', 'Industrial Alfa');
      closeLoad();
   }, 500);
}

const pintarEvaluacionesPorCliente = (containerId, clienteNombre) => {
   const contenedor = document.getElementById(containerId);
   
   const dataGlobal = [
      { id: '1', cliente: 'Industrias Alfa', registro: '01-05-2026', aplicacion: '10-05-2026', hora:'12:00', personas: 15, tipo: 'Guía de referencia I', estatus: 'Programada', color: 'primary' },
      { id: '2', cliente: 'Servicios Beta', registro: '02-05-2026', aplicacion: '08-05-2026', hora:'12:00', personas: 45, tipo: 'Guía de referencia II', estatus: 'Aplicada', color: 'success', resultado: 'Muy Alto' },
      { id: '3', cliente: 'Logística Delta', registro: '03-05-2026', aplicacion: '12-05-2026', hora:'12:00', personas: 8, tipo: 'Guía de referencia III', estatus: 'Finalizada', color: 'dark' },
      { id: '4', cliente: 'Servicios Beta', registro: '04-05-2026', aplicacion: '07-05-2026', hora:'12:00', personas: 120, tipo: 'Guía de referencia II', estatus: 'Aplicada', color: 'success', resultado: 'Bajo' },
      { id: '5', cliente: 'Servicios Beta', registro: '04-05-2026', aplicacion: '15-05-2026', hora:'12:00', personas: 30, tipo: 'Guía de referencia I', estatus: 'Programada', color: 'primary' },
      { id: '6', cliente: 'Servicios Beta', registro: '05-05-2026', aplicacion: '06-05-2026', hora:'12:00', personas: 22, tipo: 'Guía de referencia III', estatus: 'Aplicada', color: 'success', resultado: 'Alto' },
      { id: '7', cliente: 'Banco Capital', registro: '06-05-2026', aplicacion: '20-05-2026', hora:'12:00', personas: 55, tipo: 'Guía de referencia II', estatus: 'Programada', color: 'primary' }
   ];

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

   let html = `<div class="row g-3">`;

   dataGlobal.forEach(ev => {
      let htmlResultado = '';
      
      if (ev.estatus === 'Aplicada' && ev.resultado) {
          const estilo = obtenerEstiloResultado(ev.resultado);
          htmlResultado = `
          <div class="mt-auto pt-2"> <!-- mt-auto empuja el resultado al final del card -->
            <div class="p-1 px-2 rounded-2 d-flex align-items-center justify-content-between" 
                  style="background-color: ${estilo.color}10; border: 1px dashed ${estilo.color}40;">
               <small style="color: ${estilo.color}; font-size: 0.7rem;" class="fw-bold">
                  <i class="bi ${estilo.icono} me-1"></i> ${ev.resultado.toUpperCase()}
               </small>
            </div>
          </div>`;
      } else {
          // Placeholder opcional para mantener la simetría perfecta si se desea
          htmlResultado = `<div class="mt-auto pt-2" style="visibility: hidden;">
                             <div class="p-1 px-2"><small>&nbsp;</small></div>
                           </div>`;
      }

      html += `
      <div class="col-12 col-md-4">
         <div class="card h-100 shadow border-0 border-bottom border-3 border-${ev.color}">
            <div class="card-body p-3 d-flex flex-column"> <!-- flex-column permite usar mt-auto -->
               <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="badge rounded-pill bg-${ev.color} bg-opacity-10 text-${ev.color} fs-9">
                        ${ev.estatus}
                  </span>
                  <small class="text-muted fs-9">#${ev.id}</small>
               </div>
               
               <h6 class="fw-bold mb-1" style="font-size: 0.9rem;">${ev.tipo}</h6>
               
               <div class="d-flex gap-3 mt-2 mb-2">
                  <div>
                        <p class="text-secondary mb-0" style="font-size: 0.7rem;">Aplicación</p>
                        <small class="fw-medium">${ev.aplicacion}</small>
                  </div>
                  <div class="border-start ps-3">
                        <p class="text-secondary mb-0" style="font-size: 0.7rem;">Personal</p>
                        <small class="fw-medium">${ev.personas} pers.</small>
                  </div>
               </div>

               ${htmlResultado}
            </div>
            <div class="card-footer bg-white border-top-0 pb-3">
               <div class="d-flex justify-content-end gap-2">`;
                  if (ev.estatus === 'Aplicada' || ev.estatus === 'Finalizada') {
                     html+=`
                     <button class="btn btn-sm btn-menta px-3 btn-redondo" onclick="ModalVerTests();">
                        Ver Evaluaciones
                     </button>`;
                  }

                  if (ev.estatus === 'Finalizada') {
                     html+=`
                     <button class="btn btn-sm btn-mostaza btn-redondo ms-1" title="Ver programa" onclick="ModalVerPrograma();">
                        Ver programa
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

const verTest = () => {
   window.open('guia1');
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
   $('#modalAdminExt').html(html);
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
         <div class="card h-100 shadow-sm border-0 border-top border-4 pointer" style="border-color: ${config.color} !important;" onclick="verTest();">
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
window.TabEvaluacionesCliente = TabEvaluacionesCliente;
window.ModalVerTests          = ModalVerTests;

window.verTest                = verTest;

