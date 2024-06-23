let cartItems = [];
atualizarPrecoTotal();

function listarItensCarrinho() {
  var carrinho = JSON.parse(localStorage.getItem('productList'));
  console.log(carrinho)
  if (carrinho && carrinho.length > 0) {
    carrinho.forEach(function (item) {
      console.log('Nome: ' + item.name);
      console.log('Valor: ' + item.price);
      console.log('Quantidade: ' + item.quantidade);
      console.log('--------------------------');
    });
  } else {
    console.log('O carrinho está vazio.');
  }
}

function listarPrecosCarrinho() {
  var carrinho = JSON.parse(localStorage.getItem('productList'));
  if (carrinho && carrinho.length > 0) {
    var total = 0;
    carrinho.forEach(function (item) {
      var precoItem = item.price * item.quantidade;
      console.log('Nome: ' + item.name);
      console.log('Preço por item: ' + item.price);
      console.log('Quantidade: ' + item.quantidade);
      console.log('Preço total: ' + precoItem);
      console.log('--------------------------');
      total += precoItem;
    });
    console.log('Preço total da compra: ' + total);
  } else {
    console.log('O carrinho está vazio.');
  }
}


function alterarQuantidadeItem(nomeItem, novaQuantidade) {
  var carrinho = JSON.parse(localStorage.getItem('productList'));
  if (carrinho && carrinho.length > 0) {
    carrinho.forEach(function (item) {
      if (item.name === nomeItem) {
        item.quantidade = novaQuantidade;
      }
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    console.log('Quantidade do item ' + nomeItem + ' alterada para ' + novaQuantidade);
  } else {
    console.log('O carrinho está vazio.');
  }
}


function apagarItemCarrinho(productName) {
  var productList = JSON.parse(localStorage.getItem('productList')) || [];

  // Encontra o índice do produto na lista com base no nome
  var index = productList.findIndex(function (product) {
    return product.name === productName;
  });

  if (index !== -1) {
    // Remove o produto da lista pelo índice encontrado
    productList.splice(index, 1);

    // Atualiza a lista de produtos no Local Storage
    localStorage.setItem('productList', JSON.stringify(productList));

    console.log(productList);
  } else {
    console.log('O produto não foi encontrado no carrinho.');
  }
}


function adicionarCupomDesconto() {
  var carrinho = JSON.parse(localStorage.getItem('carrinho'));
  if (carrinho && carrinho.length > 0) {
    var total = 0;
    carrinho.forEach(function (item) {
      var precoItem = item.valor * item.quantidade;
      total += precoItem;
    });
    var desconto = total * 0.15; // 15% de desconto
    var valorFinal = total - desconto;
    console.log('Valor total do carrinho: ' + total);
    console.log('Desconto aplicado: ' + desconto);
    console.log('Valor final com desconto: ' + valorFinal);
  } else {
    console.log('O carrinho está vazio.');
  }
}

function visualCarrinho() {
  var productList = JSON.parse(localStorage.getItem('productList')) || [];

  var cartContainer = document.getElementById('cart-container');

  productList.forEach(function (item) {
    var section = document.createElement('section');
    section.classList.add('cart-item');

    var nameElement = document.createElement('h3');
    nameElement.textContent = 'Nome: ' + item.name;

    var priceElement = document.createElement('p');
    priceElement.textContent = 'Preço: R$ ' + item.price.toFixed(2);

    var quantityElement = document.createElement('p');
    quantityElement.textContent = 'Quantidade: ' + item.quantidade;

    var deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'DELETAR ITEM'
    deleteBtn.addEventListener('click', deletar);

    section.appendChild(nameElement);
    section.appendChild(priceElement);
    section.appendChild(quantityElement);
    section.appendChild(deleteBtn);

    cartContainer.appendChild(section);
  });
}

var cartSection = document.querySelector('.cart');

function deletar() {
  var section = this.parentElement;
  section.remove();
  console.log('deletou');

  var h3Tag = this.parentNode.querySelector('h3');
  var textoH3 = h3Tag.innerText;
  var textoFinal = textoH3.replace('Nome: ', '');
  apagarItemCarrinho(textoFinal);
}

function atualizarPrecoTotal(desconto) {
  var productList = JSON.parse(localStorage.getItem('productList')) || [];
  var total = 0;

  // Calcula o preço total dos itens
  for (var i = 0; i < productList.length; i++) {
    var produto = productList[i];
    total += produto.price * produto.quantidade;
  }

  // Aplica o desconto percentual, se fornecido
  if (desconto) {
    var descontoDecimal = desconto / 100;
    total -= total * descontoDecimal;
  }

  // Formata o preço total com duas casas decimais
  var precoTotalFormatado = total.toFixed(2);

  // Atualiza o texto do elemento <h4> com o preço total
  var precoTotalElement = document.getElementById('finalPrice');
  precoTotalElement.textContent = 'Preço Total: R$' + precoTotalFormatado;
  console.log(precoTotalFormatado);
}

function verificarDesconto() {
  var caixa = document.getElementById('coupon');
  var cupom = caixa.value;
  if (cupom == 'UTFPR') {
    return 15;
  } else {
    return 0;
  }
}

var cupom = 0;

function aplicarDesconto() {
  var desconto = verificarDesconto();
  cupom = desconto;
  console.log(cupom);

  if (cupom > 0) {
    var checkout = document.getElementById('apply-coupon');
    checkout.textContent = 'CUPOM APLICADO';
  }
}

setInterval(function () {
  atualizarPrecoTotal(cupom);
}, 100);