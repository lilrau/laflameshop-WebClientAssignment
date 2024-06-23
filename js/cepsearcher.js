document.getElementById('cep').addEventListener('blur', function () {
    var cep = this.value.replace(/\D/g, '');
    if (cep !== '') {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://viacep.com.br/ws/' + cep + '/json/', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (!data.erro) {
                    document.getElementById('adress').value = data.logradouro;
                    document.getElementById('neighborhood').value = data.bairro;
                    document.getElementById('city').value = data.localidade;
                    document.getElementById('state').value = data.uf;
                } else {
                    alert('CEP não encontrado.');
                }
            }
        };
        xhr.send();
    }
});
