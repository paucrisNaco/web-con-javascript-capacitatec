//--------------------------------------------------------------
// GUARDAR EN VARIABLES TODOS LOS ELEMENTOS DEL DOM A MANIPULAR
// -------------------------------------------------------------
// Botón "Unirme"
const unirme=document.getElementById("unirme");
// Modal-overla y modal
const modal=document.querySelector(".modal-overlay");
const formulario=document.querySelector(".modal");
// Formularios de registro y login
const formLogin=document.getElementById("formLogin");
const formRegistro=document.getElementById("formRegistro");
// Encontrar el panel de usuario y el elemento h4
const panelUsuario=document.querySelector(".panelUsuario");
const userName=panelUsuario.querySelector("h4");
// Del formulario de registro
const enlace=formRegistro.querySelector("a");
// Del formulario de login
const enlaceLogin=formLogin.querySelector("a");

//-----------
// FUNCIONES
//-----------

// estructura función normal
// function nombreFuncion(parámetros){
//      bloque de código, pasos que se ejecutan;
//      return; si fuera necesario
// }

// estructura función flecha
// const nombreFuncion=(parámetro)=>{
//    bloque de código, pasos que se ejecutan;
//    return; si fuera necesario
//};

function abrirModal(){
    modal.style.display="flex";
}
function cerrarModal(){
    modal.style.display="none";
}
function mostrarRegistro(){
    formRegistro.style.display="flex";
}
function ocultarRegistro(){
    formRegistro.style.display="none";
}
function mostrarLogin(){
    formLogin.style.display="flex";
}
function ocultarLogin(){
    formLogin.style.display="none";
}

function abrirModalRegistro() {
    abrirModal();
    mostrarRegistro();
    ocultarLogin();
}
const abrirModalRegistro=()=>{
    abrirModal();
    mostrarRegistro();
    ocultarLogin();    
};

function abrirModalLogin(){
    abrirModal();
    mostrarLogin();
    ocultarRegistro();
}


//⭐ 3) “Cerrar el modal con la tecla Escape”
const teclaEscape=(e)=>{
    if (e.key==="Escape"){
        cerrarModal();
    }
};

//⭐ 4) “validación de datos” (Registro)
function validacionRegistro(name, email, terms){
    // validación de datos
    if (!name && !email && !terms){ // si los tres están vacíos / marcados
        alert("Los campos no deben estar vacíos");
        return;
    }else if (!name){ // si solo el nombre está vacío
        alert("el nombre no puede estar vacío");
        return;
    }else if (!email){ // si solo el email está vacío
        alert("el mail no puede estar vacío");
        return;
    }else if (!terms){ // si solo el check no está marcado
        alert("debes aceptar términos y condiciones");
        return;
    }
    return true; // este return devuelve verdadero si todo está ok
}


//⭐ 5) “guardar los datos en el localStorage”
// guardar los datos en el localStorage - falso json
//👉 Claramente puede ser otra función (registrar usuario).
// guardar los datos en el localStorage - falso json
const newUser={ // Guardar en la variable newUser un objeto del array
    name: name,
    email: email,
    terms: terms
};
// traer el estante (array) del depósito (localStorage)
let users=JSON.parse(localStorage.getItem("users"));
if (!users){ // si la lista no existe
    users=[]; // se crea una vacía
}
function cargarUsers(){
    let users=JSON.parse(localStorage.getItem("users"));
    if (!users){
        users=[];
    }
    return users;
}
users.push(newUser); // se guardan los datos del nuevo usuario
localStorage.setItem("users", JSON.stringify(users)); // guardar los datos actualizados pasando de objeto a texto
function guardarUsers(users, newUser){
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
}
// enviar mensaje de form enviado con éxito
alert("Registro exitoso");

//⭐ 6) “Cambiar el nombre en el panel de usuario”
// Asignar los datos desde el localStorage a la lista users
users=JSON.parse(localStorage.getItem("users"));
// Guardar el último elemento del array
const lastUser=users[users.length-1];
function guardarUsers(){
    let users=JSON.parse(localStorage.getItem("users"));
    return users;
}
function cargarUsers(){
    let users=JSON.parse(localStorage.getItem("users"));
    return users;
}

const obtenerUsuarios = () => JSON.parse(localStorage.getItem("users"));
const obtenerUltimoUsuario = (usuarios) => usuarios[usuarios.length - 1];

function lastUser(users){
    users=cargarUsers();
    const lastUser=users[users.length-1];
    return lastUser;
}

function cargarUsers(){
    let users=JSON.parse(localStorage.getItem("users"));
    return users;
}

function cambiarUserName(){
    userName.textContent=lastUser.name
}

//⭐ 7) “resetear el form de registro”
const resetFormRegistro=()=>{
    formRegistro.reset();
}

//⭐ 8) “Hacer aparecer el panel de usuario”
const mostrarPanel=()=>{
    panelUsuario.style.display="flex";
}

//⭐ 9) “validación de datos” (Login)
//👉 Otra función que puede ser la MISMA que la del registro, adaptada.

//⭐ 10) “recuperar datos del usuario del localStorage”
//👉 Podría ser una función tipo buscarUsuario(name, email).

//⭐ 11) “enviar mensaje de login exitoso + dibujar el panel”
//👉 Todo eso podría ser una función separada.

//⭐ 12) “si los datos no coinciden…”
//👉 Podrías tener una función que maneje el login fallido.

//🔥 RESUMEN SIMPLE
//Con solo mirar tus comentarios, estas son las funciones que podrías crear:
//⭐ abrirModal
//⭐ cerrarModal
//⭐ validarRegistro
//⭐ registrarUsuario
//⭐ actualizarPanelUsuario
//⭐ validarLogin
//⭐ buscarUsuario
//⭐ mostrarUsuarioLogueado
//⭐ manejarLoginFallido


// Van dentro del evento submit del login
const nameLogin=document.getElementById("nameLogin").value.trim(); // value captura su valor
const emailLogin=document.getElementById("emailLogin").value.trim(); // trim() quita los espacios antes y despues
const recordarme=document.getElementById("recordarmeLogin").checked; // captura si está marcado o no