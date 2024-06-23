// para checar o formulario de contato
document.getElementById('sendbtn').addEventListener('click', function () {
    var section = document.getElementById('contact');
    var inputs = section.querySelectorAll('input');
    var message = section.querySelector('textarea');
    var isEmpty = false;

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type !== 'button' && inputs[i].value.trim() === '') {
            isEmpty = true;
            break;
        }
    }

    if (message.value.trim() === '') {
        isEmpty = true;
    }

    if (isEmpty) {
        alert('Por favor, preencha todos os campos!');
    } else {
        validateEmail();
    }
});


// para checar o email
function validateEmail() {
    var email = document.getElementById('email2').value;

    // regex para validar o formato do e-mail
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email)) {
        return true;
    } else {
        alert('E-mail inválido! Por favor verifique as informações.');
        return false;
    }
}