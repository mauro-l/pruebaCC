
import { decodificadorMensaje } from '../src/codificador.js';

const USUARIOS_REGISTRADOS = [
    {
    nombre: 'pepe',
    email: 'pepe@gmail.com',
    clave: 'Pepe1234'
},
{
    nombre:'mauro',
    email: 'mauro@gmail.com',
    clave:'Mauro123'
}];

let USUARIOS_ACTIVOS = [...USUARIOS_REGISTRADOS];

/* -v-v-v-v- INICIO DE SESION -v-v-v-v- */

const DATOS = document.getElementById('signIn');
const ERROR = document.getElementById('msgError');
const ERROR_PASS = document.getElementById('msgPass');
const HELP_MSG = document.getElementById('msgHelp');

//escucha de evento de formulario
DATOS.addEventListener('submit', (e)=>{
    
    e.preventDefault();

    //busca si existen usuarios creados en el local storage para guardarlo en un arreglo para su futura verificacion.
    const datosLocalStorage = JSON.parse(localStorage.getItem("usuariosCreados"));
    
    //si hay usuarios creados en el localStorage se decodifica la clave antes de agregarlos en el arrays de usuarios activos.
    if(datosLocalStorage){
        const usuariosLS = datosLocalStorage.map(user=>{
            return{
                ...user,
                clave: decodificadorMensaje(user.clave)
            }
        });
        USUARIOS_ACTIVOS = [...USUARIOS_REGISTRADOS, ...usuariosLS];
    }
    console.log('USUARIOS ACTIVOS', USUARIOS_ACTIVOS);

    //se capturan los datos ingresados por el usuario 
    const EMAIL_FORMULARIO = document.getElementById('username');
    const PASS_FORMULARIO = document.getElementById('password');

    //se busca si hay coincidencias
    const usuarioEncontrado = USUARIOS_ACTIVOS.find(user => user.email == EMAIL_FORMULARIO.value);

    console.log('USUARIO ENCONTRADO', usuarioEncontrado);
    if(usuarioEncontrado){
        //encuentra coincidencias en los mail ingresado procede a verificar si las contraseñas coinciden

        if(PASS_FORMULARIO.value == usuarioEncontrado.clave){

            //si coinciden contraseña envia mensaje de bienvenida y redirecciona al inicio de pagina
            EMAIL_FORMULARIO.classList.add('text-green-800');
            PASS_FORMULARIO.classList.add('text-green-900');

            setTimeout(() => {
                EMAIL_FORMULARIO.classList.remove('text-green-800');
                PASS_FORMULARIO.classList.remove('text-green-900');
            }, 2000);  

            localStorage.setItem('sesionIniciada', JSON.stringify(usuarioEncontrado));

            Swal.fire({
                title: `Bienvenido ${usuarioEncontrado.nombre}`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });

            setTimeout(() => {
                window.location.href = "/index.html";
            }, 2000);

        }else{
            //Si las contraseñas no coinciden envia mensaje de error de contraseña
            ERROR_PASS.classList.remove('hidden');
            ERROR_PASS.classList.add('block');
            EMAIL_FORMULARIO.classList.add('border-b-red-900');
            PASS_FORMULARIO.classList.add('border-b-red-900');

            setTimeout(() => {
                ERROR_PASS.classList.remove('block');
                ERROR_PASS.classList.add('hidden');
                EMAIL_FORMULARIO.classList.remove('border-b-red-900');
                PASS_FORMULARIO.classList.remove('border-b-red-900');
            }, 2000);
        }
    }else{
        //En caso de que no coincidan los mail ingresados envia mensaje de error de datos incorrectos
        ERROR.classList.remove('hidden');
        ERROR.classList.add('block');
        EMAIL_FORMULARIO.classList.add('border-b-red-900');
        PASS_FORMULARIO.classList.add('border-b-red-900');

        setTimeout(() => {
            ERROR.classList.remove('block');
            ERROR.classList.add('hidden');
            EMAIL_FORMULARIO.classList.remove('border-b-red-900');
            PASS_FORMULARIO.classList.remove('border-b-red-900');
        }, 2000);

    }
    
})

HELP_MSG.addEventListener('click', ()=>{
    Swal.fire({
        title: "No recuerdas el usuario?",
        text: `email: pepe@gmail.com, clave: Pepe1234 `,
        icon: "question"
      });
})