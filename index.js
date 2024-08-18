import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDEGzNQ6p7RyrfDBdLCn4PKeIC8k27RXd0",
  authDomain: "favela-919d5.firebaseapp.com",
  projectId: "favela-919d5",
  storageBucket: "favela-919d5.appspot.com",
  messagingSenderId: "53016151702",
  appId: "1:53016151702:web:9703db7d0dbe944ad4a4b7",
  measurementId: "G-KHH8Y3VFJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let emailR = document.querySelector("#emailR");
let passR = document.querySelector("#passR");
let buttonR = document.querySelector("#buttonR");
let emailL = document.querySelector("#emailL");
let passL = document.querySelector("#passL");
let buttonL = document.querySelector("#buttonL");
let buttonO = document.querySelector('#buttonO');
let userEmail = document.querySelector('#userEmail');
let statusIcon = document.querySelector('#statusIcon');

let registerContainer = document.querySelector('#registerContainer');
let loginContainer = document.querySelector('#loginContainer');
let userInfo = document.querySelector('#userInfo');

// Mostrar alerta de bienvenida
function showWelcomeAlert() {
  Swal.fire({
    title: '¡Bienvenido!',
    text: 'Es necesario que te registres o inicies sesion.',
    icon: 'success',
    timer: 5000,  // Tiempo en milisegundos (3000 ms = 3 segundos)
    timerProgressBar: true,  // Muestra una barra de progreso
    backdrop: true,  // Habilita el fondo oscuro
    allowOutsideClick: false,  // Desactiva el clic fuera de la alerta
    allowEscapeKey: false  // Desactiva el escape con la tecla
  });
}

// Mostrar la alerta de bienvenida al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  showWelcomeAlert();
});

// Registro usuario
buttonR.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, emailR.value, passR.value)
    .then(() => {
      signInWithEmailAndPassword(auth, emailR.value, passR.value)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Registro e inicio de sesión exitoso!',
            text: 'Ahora estás registrado y has iniciado sesión correctamente.',
            backdrop: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        })
        .catch((error) => console.error("Error al iniciar sesión después del registro: ", error.message));
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire({
          icon: 'error',
          title: 'Correo en uso',
          text: 'El correo electrónico ya está registrado. Por favor, intente con otro correo.',
          backdrop: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      } else if (error.code === 'auth/weak-password') {
        Swal.fire({
          icon: 'error',
          title: 'Contraseña débil',
          text: 'La contraseña es demasiado débil. Por favor, elija una contraseña más segura.',
          backdrop: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar: ' + error.message,
          backdrop: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      }
      console.log(error);
    });
});

// Login
buttonL.addEventListener('click', () => {
  signInWithEmailAndPassword(auth, emailL.value, passL.value)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: 'Has iniciado sesión correctamente.',
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    })
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        Swal.fire({
          icon: 'error',
          title: 'Usuario no encontrado',
          text: 'No se encontró una cuenta con este correo electrónico.',
          backdrop: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      } else if (error.code === 'auth/wrong-password') {
        Swal.fire({
          icon: 'error',
          title: 'Contraseña incorrecta',
          text: 'Contraseña incorrecta. Por favor, intente de nuevo.',
          backdrop: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al iniciar sesión: ' + error.message,
          backdrop: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      }
      console.log(error);
    });
});

// LogOut
buttonO.addEventListener('click', () => {
  signOut(auth).then(() => {
    Swal.fire({
      icon: 'success',
      title: 'Desconectado',
      text: 'Desconectado exitosamente.',
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
    userEmail.textContent = "No hay usuario conectado";
    statusIcon.className = 'fa';
  }).catch((error) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al desconectarse: ' + error.message,
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
    console.log(error);
  });
});

// Detecta los cambios en la sesión
onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmail.textContent = `Email: ${user.email}`;
    statusIcon.className = 'fa fa-check-circle';
    statusIcon.style.color = 'green';
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'none';
    userInfo.style.display = 'block';
  } else {
    userEmail.textContent = "No hay usuario conectado";
    statusIcon.className = 'fa';
    registerContainer.style.display = 'block';
    loginContainer.style.display = 'block';
    userInfo.style.display = 'none';
  }
});