let editingProductIndex = null;
let currentProductItem = null;
let imageWasRemoved = false;

document.getElementById('add-manually').addEventListener('click', function() {
    showForm('Agregar producto', 'Crear producto', addProduct);
});

document.getElementById('add-manually-empty').addEventListener('click', function() {
    showForm('Agregar producto', 'Crear producto', addProduct);
});

document.getElementById('overlay').addEventListener('click', function() {
    hideForm();
});

function showForm(title, buttonText, submitFunction) {
    document.getElementById('form-title').innerText = title;
    document.getElementById('form-submit').innerText = buttonText;
    document.getElementById('form-submit').onclick = submitFunction;
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('product-form').style.display = 'block';
    document.getElementById('delete-btn').classList.add('hidden');
}

function showEditForm(title, buttonText, submitFunction) {
    document.getElementById('form-title').innerText = title;
    document.getElementById('form-submit').innerText = buttonText;
    document.getElementById('form-submit').onclick = submitFunction;
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('product-form').style.display = 'block';
    document.getElementById('delete-btn').classList.remove('hidden');
}

function hideForm() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('product-form').style.display = 'none';
}

function incrementQuantity() {
    let quantityInput = document.getElementById('product-quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decrementQuantity() {
    let quantityInput = document.getElementById('product-quantity');
    if (parseInt(quantityInput.value) > 0) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

function addProduct() {
    let name = document.getElementById('product-name').value;
    let price = document.getElementById('product-price').value;
    let quantity = document.getElementById('product-quantity').value;
    let image = document.getElementById('product-image').files[0];
    let imageUrl = image ? URL.createObjectURL(image) : 'https://placehold.co/100x100';

    let productList = document.getElementById('product-list');
    let productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
        <img alt="Product image" src="${imageUrl}"/>
        <p class="text-xl font-semibold">$ ${price}</p>
        <p class="text-sm text-gray-500">${name}</p>
        <p class="text-sm text-gray-500">${quantity} disponibles</p>
    `;
    productItem.addEventListener('click', function() {
        editProduct(productItem, name, price, quantity, imageUrl);
    });
    productList.appendChild(productItem);

    document.getElementById('empty-state').style.display = 'none';
    productList.style.display = 'flex';
    hideForm();
}

function editProduct(productItem, name, price, quantity, imageUrl) {
    // Resetear el estado de la imagen removida al empezar a editar
    imageWasRemoved = false;
    
    currentProductItem = productItem;
    document.getElementById('product-name').value = name;
    document.getElementById('product-price').value = price;
    document.getElementById('product-quantity').value = quantity;
    document.getElementById('product-image').value = ''; // Clear the file input

    // Set the product image
    let imageElement = document.getElementById('product-image-preview');
    if (imageElement) {
        imageElement.src = imageUrl;
    } else {
        imageElement = document.createElement('img');
        imageElement.id = 'product-image-preview';
        imageElement.src = imageUrl;
        imageElement.style.width = '100px';
        imageElement.style.height = '100px';
        document.querySelector('.border-dashed').appendChild(imageElement);
    }

    // Show the remove image button if there is an image
    document.getElementById('remove-image-btn').classList.remove('hidden');

    showEditForm('Editar producto', 'Guardar cambios', function() {
        saveProductChanges(productItem, imageUrl);
    });
}

function removeImage() {
    // Clear the file input
    document.getElementById('product-image').value = '';

    // Remove the image preview
    let imageElement = document.getElementById('product-image-preview');
    if (imageElement) {
        imageElement.remove();
    }

    // Hide the remove image button
    document.getElementById('remove-image-btn').classList.add('hidden');
    
    // Marcar que la imagen fue eliminada
    imageWasRemoved = true;
}

function saveProductChanges(productItem, oldImageUrl) {
    let name = document.getElementById('product-name').value;
    let price = document.getElementById('product-price').value;
    let quantity = document.getElementById('product-quantity').value;
    let image = document.getElementById('product-image').files[0];
    
    // Determinar qué URL de imagen usar
    let imageUrl;
    if (image) {
        // Si hay una nueva imagen seleccionada, usar esa
        imageUrl = URL.createObjectURL(image);
    } else if (imageWasRemoved) {
        // Si la imagen fue removida, usar una imagen placeholder
        imageUrl = 'https://placehold.co/100x100';
    } else {
        // Si no hay cambios en la imagen, mantener la anterior
        imageUrl = oldImageUrl;
    }

    productItem.innerHTML = `
        <img alt="Product image" src="${imageUrl}"/>
        <p class="text-xl font-semibold">$ ${price}</p>
        <p class="text-sm text-gray-500">${name}</p>
        <p class="text-sm text-gray-500">${quantity} disponibles</p>
    `;
    
    productItem.addEventListener('click', function() {
        editProduct(productItem, name, price, quantity, imageUrl);
    });

    // Resetear el estado de la imagen removida
    imageWasRemoved = false;
    hideForm();
}

function deleteProduct() {
    currentProductItem.remove();

    let productList = document.getElementById('product-list');
    if (productList.children.length === 0) {
        document.getElementById('empty-state').style.display = 'block';
        productList.style.display = 'none';
    }

    hideForm();
    adjustEmptyState();
}

function adjustEmptyState() {
    let emptyState = document.getElementById('empty-state');
    let productList = document.getElementById('product-list');

    if (productList.children.length === 0) {
        emptyState.style.display = 'flex';
        productList.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        productList.style.display = 'flex';
    }
}