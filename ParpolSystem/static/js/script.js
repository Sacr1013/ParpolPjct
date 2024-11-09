const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

const registerSubmitBtn = document.getElementById('registerSubmit');
const loginSubmitBtn = document.getElementById('loginSubmit');

// Cambiar entre el formulario de registro y el de inicio de sesión
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Manejar la acción del botón "Registrarse"
registerSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    if (name && email && password) {
        
        
        // Cambiar al formulario de inicio de sesión automáticamente
        container.classList.remove("active");
        
        // Limpiar los campos del formulario de registro (opcional)
        registerForm.reset();
    } else {
        alert("Por favor, completa todos los campos de registro.");
    }
});

// Manejar la acción del botón "Iniciar Sesión"
loginSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email && password) {
        // Obtener la URL de redirección almacenada en el atributo data-url
        const redirectUrl = loginSubmitBtn.getAttribute('data-url');
        window.location.href = redirectUrl; // Redirige a la URL de 'base'
    } else {
        alert("Por favor, completa todos los campos de inicio de sesión.");
    }
});
