/************** ( '// Campos del form' ) **************/

const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");


/************** ( '//UI' ) **************/
const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");

class  Citas {
    constructor () {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id)
    }
}


class  UI {
    imprimirAlerta(mensaje, tipo) {
        //crear div
        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12')
        

        // Agregar clase en base al tipo
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        //mensaje de error 
        divMensaje.textContent = mensaje;
        //agrega al dom
        document.querySelector('#contenido').insertBefore(divMensaje , document.querySelector('.agregar-cita'));
        //quitar mensaje 5 seg
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

    imprimirCitas({citas}) {

        this.limpiarHTML();

        citas.forEach(cita => {
            const {mascota , propietario, telefono, fecha, hora, sintomas ,id} = cita;

            const divCita = document.createElement('DIV');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propiertarioParrafo = document.createElement('P');
            propiertarioParrafo.innerHTML = `
            <span class="font-weight-bolder">Propiertario: </span">${propietario}`;

            const telefonoParrafo = document.createElement('P');
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Telefono: </span">${telefono}`;

            const fechaParrafo = document.createElement('P');
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha: </span">${fecha}`;

            const horaParrafo = document.createElement('P');
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora: </span">${hora}`;

            const sintomasParrafo = document.createElement('P');
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">Sintomas: </span">${sintomas}`;
            
            // boton para eliminar esta cita
            const btnEliminar = document.createElement('BUTTON');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>`;

            btnEliminar.onclick = () => eliminarCita(id);


            // agregar parrafos al divoCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propiertarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);

            //Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHTML( ) {
        while ( contenedorCitas.firstChild) {
            contenedorCitas.removeChild( contenedorCitas.firstChild )
        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();

/************** ( 'REGISTRAR EVENTOS' ) **************/
eventListeners();

function eventListeners() {
  mascotaInput.addEventListener("input", datosCita);
  propietarioInput.addEventListener("input", datosCita);
  telefonoInput.addEventListener("input", datosCita);
  fechaInput.addEventListener("input", datosCita);
  horaInput.addEventListener("input", datosCita);
  sintomasInput.addEventListener("input", datosCita);

  formulario.addEventListener("submit", nuevaCita);
}

/************** ( 'OBJETO CON INFO DE LAS CITAS' ) **************/
const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};


/************** ( 'FUNCTIONS' ) **************/

//agrega datpos de la cita
function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

//valida y agrega nueva citas a la calse de citas
function nuevaCita (e) {
    e.preventDefault();

    // Extraer info de obj de cita
    const {mascota , propietario, telefono, fecha, hora, sintomas} = citaObj;

    // Validar
    if ( mascota === ''  || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ) {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }  
    
    // generar id unico
    citaObj.id = Date.now();

    //creando una nueva cita
    administrarCitas.agregarCita({...citaObj}); //! se añade dentro de un objeto para q se pase el ultimo valor

    // Reinicar el objeto para la validacion
    reiniciarObjeto ();
    formulario.reset();

    // Mostrar Html de las citas
    ui.imprimirCitas(administrarCitas);
}


function reiniciarObjeto () {
        citaObj.mascota = "",
        citaObj.propietario = "",
        citaObj.telefono = "",
        citaObj.fecha = "",
        citaObj.hora = "",
        citaObj.sintomas = ""
};


function eliminarCita(id) {
    // eliminar la cita
    administrarCitas.eliminarCita(id);

    //muestra mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');

    //refresca cita
    ui.imprimirCitas(administrarCitas);
}