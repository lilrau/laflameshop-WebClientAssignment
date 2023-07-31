let slideNum = 1;

function showSlide(n) {
    let slide = document.getElementById(`slide${n}`).style.display = "block";
    slideNum = n;
}

function hideSlide(n) {
    let slide = document.getElementById(`slide${n}`).style.display = "none";
}

showSlide(slideNum);

function plusSlides(n) { // para trocar o anuncio escrito
    if (slideNum == 1 && n == -1) {
        hideSlide(slideNum);
        showSlide(3);
    } else if (slideNum == 3 && n == 1) {
        hideSlide(slideNum);
        showSlide(1);
    } else {
        hideSlide(slideNum);
        showSlide(slideNum + n);
    }
}

let anouncNum = 1;

function showAnounc(n) {
    let anounc = document.getElementById(`anounc${n}`).style.display = "block";
    anouncNum = n;
}

function hideAnounc(n) {
    let anounc = document.getElementById(`anounc${n}`).style.display = "none";
}

showAnounc(anouncNum);

function plusAnouncs(n) { // para trocar as imagens do carrossel
    if (anouncNum == 1 && n == -1) {
        hideAnounc(anouncNum);
        showAnounc(4);
    } else if (anouncNum == 4 && n == 1) {
        hideAnounc(anouncNum);
        showAnounc(1);
    } else {
        hideAnounc(anouncNum);
        showAnounc(anouncNum + n);
    }
}

var timer0;
var timer1;

function startTimer0() { // para trocar os anuncios automaticamente
    timer0 = setInterval(function () {
        plusSlides(1);
    }, 5000);
}
startTimer0();

function startTimer1() { // para trocar as imagens automaticamente
    timer1 = setInterval(function () {
        plusAnouncs(1);
    }, 6500);
}
startTimer1();

// para checar o formulário de cadastro
document.getElementById('accbtn').addEventListener('click', function () {
    var section = document.getElementById('register');
    var inputs = section.querySelectorAll('input');
    var isEmpty = false;

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type !== 'button' && inputs[i].value === '') {
            isEmpty = true;
            break;
        }
    }

    if (isEmpty) {
        alert('Por favor, preencha todos os campos!');
    } else {
        validateCPF();
    }
});

// para checar o cpf
function validateCPF() {
    var cpf = document.getElementById('cpf').value;
    cpf = cpf.replace(/[^\d]+/g, ''); // remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        alert('CPF inválido! Por favor verifique as informações.')
        return false;
    }

    var soma = 0;
    var resto;

    for (var i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
        alert('CPF inválido! Por favor verifique as informações.')
        return false;
    }

    soma = 0;

    for (var i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
        alert('CPF inválido! Por favor verifique as informações.')
        return false;
    }
    validateEmail();
    return true;
}

// para checar o email
function validateEmail() {
    var email = document.getElementById('email').value;

    // regex para validar o formato do e-mail
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email)) {
        validatePass();
        return true;
    } else {
        alert('E-mail inválido! Por favor verifique as informações.');
        return false;
    }
}

// para checar a senha
function validatePass() {
    var input = document.getElementById('password');
    var valor = input.value;

    if (valor.length >= 8) {
        validateDate();
        return true;
    } else {
        alert('Sua senha deve conter ao menos 8 dígitos.');
        return false;
    }
}

// para checar a data
function validateDate() {
    var inputData = document.getElementById('date').value;
    var dateInput = new Date(inputData);
    var actualDate = new Date();

    if (dateInput < actualDate) {
        verifyAge();
        return true;
    } else {
        alert('A data de nascimento inserida não é válida.')
        return false;
    }
}

// para checar a maioridade
function verifyAge() {
    var inputData = document.getElementById('date').value;
    var dateInput = new Date(inputData);

    var actualDate = new Date();

    var minDate = new Date(actualDate.getFullYear() - 18, actualDate.getMonth(), actualDate.getDate());

    if (dateInput <= minDate) {
        return true;
    } else {
        alert('É necessário ter 18 anos ou mais para realizar um cadastro.');
        return false;
    }
}

let cartItems = [];

function openDialog(selector) {
    var section = document.querySelector(selector);

    if (section) {

        var modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = section.innerHTML;

        var lorem = document.createElement('p');
        lorem.textContent = '"Adquira essa raridade que vai elevar seu estilo a um novo patamar de exclusividade." SIZE: 42';

        modal.appendChild(lorem);

        var comprarButton = document.createElement('button');
        comprarButton.textContent = 'Adicionar ao carrinho';
        comprarButton.addEventListener('click', function () {});

        modal.appendChild(comprarButton);


        document.body.appendChild(modal);

        modal.classList.add('show');

        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.parentNode.removeChild(modal);
            } else {
                cart(section)
            }

        });
    }
}


function cart(section) {

    var productList = JSON.parse(localStorage.getItem('productList')) || [];
    var productName = section.getAttribute('data-nome');
    var productValue = parseFloat(section.getAttribute('data-valor'));

    var newProduct = {
        name: productName,
        price: productValue,
        quantidade: 1
    };
    productList.push(newProduct);

    // Atualiza a lista de produtos no Local Storage
    localStorage.setItem('productList', JSON.stringify(productList));

    console.log(productList)


}