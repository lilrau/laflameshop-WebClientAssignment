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
        comprarButton.addEventListener('click',function(){});

        modal.appendChild(comprarButton);
        

        document.body.appendChild(modal);

        modal.classList.add('show');

        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.parentNode.removeChild(modal); 
            }else{
                cart(section)
            }

        });
    }
}


function cart(section){

    var productList = JSON.parse(localStorage.getItem('productList')) || [];
    var productName = section.getAttribute('data-nome');
    var productValue = parseFloat(section.getAttribute('data-valor'));
   
    var newProduct = {name: productName, price: productValue, quantidade: 1}; 
    productList.push(newProduct);
  
    // Atualiza a lista de produtos no Local Storage
    localStorage.setItem('productList', JSON.stringify(productList));
  
    console.log(productList)

    
}



function rearrangeByPrice() {
    const productList = document.querySelector('.list');
    const products = Array.from(productList.getElementsByTagName('li'));
  
    products.sort((a, b) => {
      const priceA = parseFloat(a.innerText.match(/R\$\s(\d+[\.,]?\d+)/)[1].replace(',', '.'));
      const priceB = parseFloat(b.innerText.match(/R\$\s(\d+[\.,]?\d+)/)[1].replace(',', '.'));
  
      return priceA - priceB;
    });
  
    products.forEach((product) => productList.appendChild(product));

    const filterDiv = document.querySelector('.filter');
    filterDiv.innerText = 'Preço';
}


function rearrangeAlphabetically() {
    const productList = document.querySelector('.list');
    const products = Array.from(productList.getElementsByTagName('li'));
  
    products.sort((a, b) => {
      const nameA = a.innerText.match(/([^\-\n]+)/)[1].trim();
      const nameB = b.innerText.match(/([^\-\n]+)/)[1].trim();
  
      return nameA.localeCompare(nameB);
    });
  
    products.forEach((product) => productList.appendChild(product));

    const filterDiv = document.querySelector('.filter');
    filterDiv.innerText = 'Nome';
  }
 
  
  
  