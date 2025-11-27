//--------------------------------------------------------------
// GUARDAR EN VARIABLES TODOS LOS ELEMENTOS DEL DOM A MANIPULAR
// -------------------------------------------------------------
// Botón "Unirme"
const unirme=document.getElementById("unirme");
// Modal-overlay y modal
const modal=document.querySelector(".modal-overlay");
const formulario=document.querySelector(".modal");
const gatito=document.querySelector(".overlayGato");
// Formularios de registro y login
const formLogin=document.getElementById("formLogin");
const formRegistro=document.getElementById("formRegistro");
// Encontrar el panel de usuario y el elemento h4
const panelUsuario=document.querySelector(".panelUsuario");
const userName=panelUsuario.querySelector("h4");
// Del formulario de registro
const enlace=formRegistro.querySelector("a");
// Del formulario de login
const enlaceRegistro=document.getElementById("registrarme");
const enlaceContraseña=document.getElementById("contraseña");
// Del navbar
const login=document.getElementById("login");

//-----------
// FUNCIONES
//-----------

/* funciones flecha */
const abrirModal=()=>modal.style.display="flex";
const cerrarModal=()=>modal.style.display="none";
const mostrarRegistro=()=>formRegistro.style.display="flex";
const ocultarRegistro=()=>formRegistro.style.display="none";
const mostrarLogin=()=>formLogin.style.display="flex";
const ocultarLogin=()=>formLogin.style.display="none";
const mostrarPanel=()=>panelUsuario.style.display="flex";
const mostrarGato=()=>gatito.style.display="flex";
const ocultarGato=()=>gatito.style.display="none";
// Convertir objeto a texto y guardar el usaurio en el localSotrage
const guardarUsers=(users)=>localStorage.setItem("users", JSON.stringify(users));
// tiempo de espera
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/* funciones normales */
function abrirModalRegistro() {
    abrirModal();
    mostrarRegistro();
    ocultarLogin();
}
function abrirModalLogin(){
    abrirModal();
    mostrarLogin();
    ocultarRegistro();
}
function activarPanel(){
    cerrarModal();
    mostrarPanel();
}
// validación de datos del form Registro
function validacionRegistro(name, email, terms){
    if (!name && !email && !terms){ // si los tres están vacíos / marcados
        alert("Los campos no deben estar vacíos");
        return false;
    }else if (!name){ // si solo el nombre está vacío
        alert("el nombre no puede estar vacío");
        return false;
    }else if (!email){ // si solo el email está vacío
        alert("el mail no puede estar vacío");
        return false;
    }else if (!terms){ // si solo el check no está marcado
        alert("debes aceptar términos y condiciones");
        return false;
    }
    return true; // este return devuelve verdadero si todo está ok
}
// validación de datos del form Login
function validacionLogin(name, email){
    if (!name && !email){ // si nombre y email están vacíos
        alert("Los campos no deben estar vacíos");
        return false;
    }else if (!name){ // si solo el nombre está vacío
        alert("el nombre no puede estar vacío");
        return false;
    }else if (!email){ // si solo el email está vacío
        alert("el mail no puede estar vacío");
        return false;
    }
    return true;
}
// Crear nuevo usuario
function crearUsuario(name, email, terms){
    return{
        name: name,
        email: email,
        terms: terms
    };
}
// Recuperar datos desde el localStorage
// si hay datos convierte de texto a objeto sino entrega una lista vacía
function cargarUsers(){
    let users=JSON.parse(localStorage.getItem("users"));
    if (!users){
        users=[];
    }
    return users;
}
// buscar usuarios en la lista users del localStorage
function buscarUsuario(name, email){
    const users=cargarUsers();
    for (let usuario of users){
        if (usuario.name===name && usuario.email===email){
            return usuario;
        }
    }
    return false;
}

/* funciones asincronas */
// cargar la base de datos json
async function cargarDatosDelJSON(){
    try{
        // “Pedir” los datos del JSON
        const response = await fetch("../data/fakeDB.json"); // ruta a tu archivo JSON
        if (!response.ok) {
            throw new Error("No se pudo cargar el JSON: " + response.status);
        }
        const data=await response.json(); // convertir a objeto JS
        return data.users; // devolver la lista de usuarios
    }catch (error) {
        console.error("Error al cargar datos del JSON:", error);
        return []; // devolver lista vacía si falla
    }
}
// buscar en la base de datos json
async function buscarJson(name, email){
    const users=await cargarDatosDelJSON(); // espera que carge la DB
    for (let usuario of users){
        if (usuario.name===name && usuario.email===email){
            return usuario; // devuelve el usuario si coincide
        }
    }
    return false;
}

//---------
// EVENTOS
//---------

// Escucha el evento 'click' en el botón unirme
unirme.addEventListener("click", ()=>abrirModalRegistro());
// Cerrar el modal con 'click' en el fondo
modal.addEventListener("click", ()=>cerrarModal());
// Evita que el modal se cierre si se hace clic dentro del formulario
formulario.addEventListener("click", (e)=>e.stopPropagation());
// Cerrar el modal con evento tecla
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal(); // Si se preciona Escape cerrar el modal
});

// Escuchar el evento submit del > Registro <
formRegistro.addEventListener("submit", (e)=>{
    e.preventDefault(); // método que evita que se recargue la página por defecto
// Guardar en variables los datos del form para manipularlos
const name=document.getElementById("nameRegistro").value.trim(); // value captura su valor
const email=document.getElementById("emailRegistro").value.trim(); // trim() quita los espacios antes y despues
const terms=document.getElementById("terminosRegistro").checked; // captura si está marcado o no
// llamar a la función para validar el registro de usuario
if (!validacionRegistro(name, email, terms)){
    return; // si algo falla, termina.
};
// si todo esta OK, continua la ejecución

//crear usuario
const newUser=crearUsuario(name, email, terms);
// traer el estante (array) del depósito (localStorage)
const users=cargarUsers();
// se guardan los datos del nuevo usuario
users.push(newUser);
// guardar los datos actualizados pasando de objeto a texto
guardarUsers(users);
// enviar mensaje de form enviado con éxito
alert("Registro exitoso");

// Guardar el último elemento del array users
const lastUser=users[users.length-1];
// Cambiar el nombre en el panel de usuario
// reemplazar el contenido del h4 por el contendio del dato guardado en name
userName.textContent=lastUser.name
// resetear el form de registro
formRegistro.reset();
// cerrar el modal y hacer aparecer el panel de usuario
activarPanel();
});

// Evento click sobre el enlace de iniciar sesion desde el registro
enlace.addEventListener("click", (e)=>{
    e.preventDefault(); // evitar que la página se recargue
    abrirModalLogin(); // hacer aparecer el formLogin y ocultar el formRegistro
});

// Escuchar el evento submit del > Login <
formLogin.addEventListener("submit", async (e)=>{
    e.preventDefault(); // método que evita que se recargue la página por defecto
// guardar en variables los objetos del form para manipularlos
const name=document.getElementById("nameLogin").value.trim(); // value captura su valor
const email=document.getElementById("emailLogin").value.trim(); // trim() quita los espacios antes y despues
const recordarme=document.getElementById("recordarmeLogin").checked; // captura si está marcado o no

// validación de datos
if (!validacionLogin(name, email)){
    return;
};
// si todo esta OK, continua la ejecución

 // Primero buscar en localStorage
let encontrado=buscarUsuario(name, email);
// Si no se encontró, buscar en JSON
if (!encontrado){
    mostrarGato();
    encontrado = await buscarJson(name, email);
    await delay(500);
    ocultarGato(); // ocultamos solo después de buscar en JSON
}
// si no se encontró alert
if (!encontrado){
    alert("Usuario no encontrado. Para acceder debes registrarte.");
    abrirModalRegistro();
    return;
};
// si se encontró continúa la ejecución
alert("Inicio de sesión exitoso");
// reemplazar el contenido del h4 por el contendio del dato guardado en name
userName.textContent=encontrado.name
// resetear el form de registro
formLogin.reset();
// cerrar el modal y hacer aparecer el panel de usuario
activarPanel();
});

// Evento click sobre el enlace de registrarme desde el login
enlaceRegistro.addEventListener("click", (e)=>{
    e.preventDefault(); // evitar que la página se recargue
    abrirModalRegistro(); // hacer aparecer el formRegistro y ocultar el formLogin
});

// Evento clic sobre el enlace de la contraseña desde el login
enlaceContraseña.addEventListener("click", (e)=>{
    e.preventDefault();
    // mail to para recuperar contraseña
})

// Evento clic en iniciar sesion desde el navbar
login.addEventListener("click", (e)=>{
    e.preventDefault();
    abrirModalLogin();
});