function searchProduct() {
    let input = document.getElementById('search-input').value.toLowerCase();
    let products = document.querySelectorAll('.featured section');

    products.forEach(product => {
        let productName = product.getAttribute('data-nome').toLowerCase();
        if (productName.includes(input)) {
            product.parentElement.style.display = 'block'; // Mostrar o produto
        } else {
            product.parentElement.style.display = 'none'; // Esconder o produto
        }
    });
}
