// Encuentra el botón
const unirme=document.getElementById("unirme");
// Encuentra el modal
const modal=document.querySelector(".modal-overlay");
// Encuentra el formulario del modal
const formulario=document.querySelector(".modal");
// Guardar en variables los objeto de cada formulario
const formLogin=document.getElementById("formLogin");
const formRegistro=document.getElementById("formRegistro");
// Encontrar el panel de usuario
const panelUsuario=document.querySelector(".panelUsuario");


// Escucha el evento 'click' en el botón
unirme.addEventListener("click", () => {
    // Cuando el botón se presiona, el modal se hace visible
    modal.style.display="flex";
    formRegistro.style.display="flex";
    // Ocultar el form de login
    formLogin.style.display="none";
});

// Cerrar el modal con 'click' en el fondo
modal.addEventListener("click", () =>{
    modal.style.display="none";
});

// Evita que el modal se cierre si se hace clic dentro del formulario
formulario.addEventListener("click", (e) => {
    e.stopPropagation();
});

// Cerrar el modal con la tecla 'Escape'
document.addEventListener("keydown", (e) => {
    // Si la tecla presionada es 'Escape'
    if (e.key === "Escape") {
        modal.style.display="none";
    }
});

// Escuchar el evento submit
formRegistro.addEventListener("submit", (e)=>{
    e.preventDefault(); // método que evita que se recargue la página por defecto

// Guardar en variables los datos del form para manipularlos
const name=document.getElementById("nameRegistro").value.trim(); // value captura su valor
const email=document.getElementById("emailRegistro").value.trim(); // trim() quita los espacios antes y despues
const terms=document.getElementById("terminosRegistro").checked; // captura si está marcado o no

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

// si todo esta OK, continua la ejecución

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
users.push(newUser); // se guardan los datos del nuevo usuario
localStorage.setItem("users", JSON.stringify(users)); // guardar los datos actualizados pasando de objeto a texto
// enviar mensaje de form enviado con éxito
alert("Registro exitoso");

// Cambiar el nombre en el panel de usuario
// Asignar los datos desde el localStorage a la lista users
users=JSON.parse(localStorage.getItem("users"));
// Guardar el último elemento del array
const lastUser=users[users.length-1];
// Encontrar el panel usuario
const panelUsuario=document.querySelector(".panelUsuario")
// Encontar el h4 del panel de usuario
const userName=panelUsuario.querySelector("h4")
// reemplazar el contenido del h4 por el contendio del dato guardado en name
userName.textContent=lastUser.name
// resetear el form de registro
formRegistro.reset();
// cerrar el modal
modal.style.display="none";
// Hacer aparecer el panel de usuario
panelUsuario.style.display="flex";
});


// Evento click sobre el enlace de iniciar sesion desde el registro
// encontrar el enlace a dentro del formRegistro
const enlace=formRegistro.querySelector("a");
enlace.addEventListener("click", (e)=>{
    e.preventDefault(); // evitar que la página se recargue
    formLogin.style.display="flex"; // hacer aparecer el formLogin
    formRegistro.style.display="none"; // ocultar el formRegistro
});

// Evento de escucha submit del formLogin
// Escuchar el evento submit
formLogin.addEventListener("submit", (e)=>{
    e.preventDefault(); // método que evita que se recargue la página por defecto
// guardar en variables los objetos del form para manipularlos
const name=document.getElementById("nameLogin").value.trim(); // value captura su valor
const email=document.getElementById("emailLogin").value.trim(); // trim() quita los espacios antes y despues
const recordarme=document.getElementById("recordarmeLogin").checked; // captura si está marcado o no

// validación de datos
if (!name && !email){ // si nombre y email están vacíos
    alert("Los campos no deben estar vacíos");
    return;
}else if (!name){ // si solo el nombre está vacío
    alert("el nombre no puede estar vacío");
    return;
}else if (!email){ // si solo el email está vacío
    alert("el mail no puede estar vacío");
    return;
}
// si todo esta OK, continua la ejecución
// recuperar datos del usuario del localStorage
users=JSON.parse(localStorage.getItem("users"));
// para cada usuario en la lista users
for (let usuario of users){
    // si coinciden el nombre y el email entonces
    if (usuario.name===name && usuario.email===email){
        // enviar mensaje de form enviado con éxito
        alert("Inicio de sesión exitoso");
        // Encontrar el panel usuario
        const panelUsuario=document.querySelector(".panelUsuario")
        // Encontar el h4 del panel de usuario
        const userName=panelUsuario.querySelector("h4")
        // reemplazar el contenido del h4 por el contendio del dato guardado en name
        userName.textContent=usuario.name
        // resetear el formLogin
        formLogin.reset();
        // cerrar el modal
        modal.style.display="none";
        // Hacer aparecer el panel de usuario
        panelUsuario.style.display="flex";
        return; // terminar ejecución del for
    }
}
// si los datos no coinciden o no se encontraron
alert("Usuario no encontrado. Para acceder debes registrarte.");
});

// Evento click sobre el enlace de registrarme desde el login
// encontrar el enlace a dentro del formLogin
const enlaceLogin=formLogin.querySelector("a");
enlaceLogin.addEventListener("click", (e)=>{
    e.preventDefault(); // evitar que la página se recargue
    formRegistro.style.display="flex"; // hacer aparecer el formRegistro
    formLogin.style.display="none"; // ocultar el formLogin
});