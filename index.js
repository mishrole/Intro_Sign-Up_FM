const intro = document.querySelector('.intro');
const introSignup = document.querySelector('.intro__signup');
const form = document.querySelector('.intro__signup--form');
const inputs = document.querySelectorAll('.intro__signup--input');
const btnClaim = document.querySelector('.intro__signup--cta');

const firstname = document.querySelector('#firstname');
const lastname = document.querySelector('#lastname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexName = /^[a-zA-Z\s]*$/;
const regexPassword = /^.{1,6}$/;

eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', disableSubmit(true));
    inputs.forEach(element => element.addEventListener('blur', validateFormOnBlur));
    form.addEventListener('submit', claimFreeTrial);
}

function disableSubmit(status) {
    if (status) {
        btnClaim.disabled = status;
        btnClaim.classList.add('btn-disabled');
    } else {
        btnClaim.disabled = status;
        btnClaim.classList.remove('btn-disabled');
    }
}

function validateFormOnBlur(e) {

    if(e.target.value.trim().length > 0) {
        if(e.target.nextElementSibling.classList.value === 'error-message') {
            e.target.classList.remove('border-red');
            e.target.nextElementSibling.remove();
        }
    } else {
        errorMessage(e, `${e.target.placeholder} cannot be empty`);
    }

    /*
        ↑ Input.length > 0            Error message was removed
        ↓ Input.type === email        We need to create and insert a new error message
    */

    if(e.target.type === 'email') {
        if(regexEmail.test(e.target.value) === false) {
            errorMessage(e, `Looks like this is not an email`);
        }
    }

    if(e.target.type === 'text') {
        if(regexName.test(e.target.value) === false) {
            errorMessage(e, `${e.target.placeholder} must include only letters`);
        }
    }

    if(e.target.type === 'password') {
        e.target.value = e.target.value.trim();
        if(regexPassword.test(e.target.value.trim()) === false) {
            errorMessage(e, `${e.target.placeholder} must be at least 1 to 6 characters long`);
        }
    }

    if(regexName.test(firstname.value) 
    && regexName.test(lastname.value) 
    && regexEmail.test(email.value) 
    && regexPassword.test(password.value.trim())) {
        disableSubmit(false);
    } else {
        disableSubmit(true);
    }
}

function claimFreeTrial(e) {
    e.preventDefault();

    let userEmail = email.value;

    const container = document.createElement('div');
    container.classList.add('intro__signup--form');
    const image = document.createElement('img');
    image.classList.add('intro__signup--image');
    image.src = './assets/images/mail-send.svg';
    const textContainer = document.createElement('div');
    textContainer.classList.add('intro__signup--success-message');
    const title = document.createElement('h3');
    title.textContent = 'Your purchase was a success!';
    const subtitle = document.createElement('p');
    subtitle.textContent = `We sent a cofirmation email to ${userEmail}`;

    textContainer.appendChild(title);
    textContainer.appendChild(subtitle);
    
    container.appendChild(image);
    container.appendChild(textContainer);
    
    introSignup.insertBefore(container, document.querySelector('.intro__signup--form'))
    form.remove();
}

function notification(message, type) {
    const notification = document.createElement('p');
    notification.textContent = `${message}`;
    notification.classList.add(`${type}-message`);

    return notification;
}

function errorMessage(e, errorMessage) {
    if(e.target.nextElementSibling.classList.value !== 'error-message') {
        const message = notification(`${errorMessage}`, 'error');
        form.insertBefore(message, e.target.nextElementSibling);
        e.target.classList.add('border-red');
    }
}

// Añadir fecha de nacimiento y validar edad > 18