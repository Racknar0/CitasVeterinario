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


/************** ( 'RESITRAR EVENTOS' ) **************/
eventListeners();

function eventListeners() {
  mascotaInput.addEventListener("input", datosCita);
  propietarioInput.addEventListener("input", datosCita);
  telefonoInput.addEventListener("input", datosCita);
  fechaInput.addEventListener("input", datosCita);
  horaInput.addEventListener("input", datosCita);
  sintomasInput.addEventListener("input", datosCita);
}

/************** ( 'OBJETO CON INFO DE LAS CITAS' ) **************/
const citaObj = {
  masota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};


/************** ( 'FUCNCIONES' ) **************/

//agrega datpos de la cita
function datosCita(e) {
  citaObj[e.target.name] = e.target.value;

  console.log(citaObj);
}
