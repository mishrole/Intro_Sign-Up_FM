const form = document.querySelector('.intro__signup--form');
const inputs = document.querySelectorAll('.intro__signup--input');
const btnClaim = document.querySelector('.intro__signup--cta');

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners() {
    inputs.forEach(element => element.addEventListener('blur', validateForm));
    form.addEventListener('submit', claimTrial);
}

function validateForm(e) {
    if(e.target.value.trimStart().length > 0) {
        e.target.classList.remove('border-red');

        if(e.target.nextElementSibling.classList.value === 'error-message') {
            e.target.nextElementSibling.remove();
        }
    } else {
        e.target.classList.add('border-red');
        const message = notification(`${e.target.placeholder} cannot be empty`, 'error');

        if(e.target.nextElementSibling.classList.value != 'error-message') {
            form.insertBefore(message, e.target.nextElementSibling);
        }
    }

    /*
        ↑ Input.length > 0            Error message was removed
        ↓ Input.type === email        We need to create and insert a new error message
    */

    if(e.target.type === 'email') {
        if(regexEmail.test(e.target.value) === false) {

            if(e.target.nextElementSibling.classList.value != 'error-message') {
                const message = notification('Looks like this is not an email', 'error');
                form.insertBefore(message, e.target.nextElementSibling);
                e.target.classList.add('border-red');
            }
        }
    }
}

function claimTrial(e) {
    e.preventDefault();
    const message = notification('Free trial activated', 'success');
    console.log(message)
}

function notification(message, type) {
    const notification = document.createElement('p');
    notification.textContent = `${message}`;
    notification.classList.add(`${type}-message`);
    return notification;
}



// Validación de campos obligatorios
// Nombre y apellido sólo letras
// Contraseña entre 1 y 6 dígitos
// Email válido
// Añadir fecha de nacimiento y validar edad > 18