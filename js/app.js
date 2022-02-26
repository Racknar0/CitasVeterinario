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
        console.log(this.citas);
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
}


function reiniciarObjeto () {
        citaObj.mascota = "",
        citaObj.propietario = "",
        citaObj.telefono = "",
        citaObj.fecha = "",
        citaObj.hora = "",
        citaObj.sintomas = ""
};
