// Seleccionar todos los elementos del sidebar con el atributo data-page
// Seleccionar todos los elementos del sidebar con el atributo data-page
// Seleccionar todos los elementos del sidebar con el atributo data-page
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

// Añadir evento de clic a cada elemento del menú lateral para cambiar contenido dinámicamente
/*allSideMenu.forEach(item => {
    const li = item.parentElement;
    const page = item.getAttribute('data-page');  // Obtener el valor del atributo data-page

    item.addEventListener('click', function (e) {
        e.preventDefault();

        // Actualizar la clase active
        allSideMenu.forEach(i => i.parentElement.classList.remove('active'));
        li.classList.add('active');

        // Redirigir a la URL absoluta correspondiente
        window.location.href = `/${page}/`;  // Redirige al URL correcto (por ejemplo, "/misproductos/")
    });
});*/



// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})

// Notificaciones
const notificationIcon = document.querySelector('.notification i');
const notificationCount = document.querySelector('.notification .num');

let hasNotifications = true;

function updateNotificationIcon() {
    if (hasNotifications) {
        notificationIcon.classList.replace('bx-bell', 'bxs-bell');
        notificationCount.style.display = 'flex';
    } else {
        notificationIcon.classList.replace('bxs-bell', 'bx-bell');
        notificationCount.style.display = 'none';
    }
}

document.querySelector('.notification').addEventListener('click', function(e) {
    e.preventDefault();
    hasNotifications = !hasNotifications;
    updateNotificationIcon();
});

// Responsive Sidebar
if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
}

window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		sidebar.classList.remove('hide');
	}
})

// Dark Mode
const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

// Cambiar entre pestañas en Movimientos
function changeTab(element, tabId) {
    document.querySelectorAll('.nav-tabs div').forEach(tab => {
        tab.classList.remove('active');
    });
    element.classList.add('active');

    document.querySelectorAll('.content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

// Cambiar entre subtabs en Movimientos
function changeSubTab(element) {
    document.querySelectorAll('.tabs div').forEach(tab => {
        tab.classList.remove('active');
    });
    element.classList.add('active');
}
// misproductos.js
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

//clientes.js
let clients = [
    {
        codigo: '001',
        nombre: 'Juan Pérez',
        cedula: '123456789',
        telefono: '555-1234',
        pais: 'País 1',
        ciudad: 'Ciudad 1',
        fechaCompra: '2024-10-25'
    }
];

document.getElementById('newClientBtn').addEventListener('click', function() {
    document.getElementById('newClientForm').classList.remove('hidden');
});

function closeForm(formId) {
    document.getElementById(formId).classList.add('hidden');
}

function editClient(clientId) {
    const client = clients.find(c => c.codigo === clientId);
    if (client) {
        document.getElementById('editClientId').value = client.codigo;
        document.getElementById('editClientName').value = client.nombre;
        document.getElementById('editClientCedula').value = client.cedula;
        document.getElementById('editClientPhone').value = client.telefono;
        document.getElementById('editClientCountry').value = client.pais;
        document.getElementById('editClientCity').value = client.ciudad;
        document.getElementById('editClientForm').classList.remove('hidden');
    }
}

function showHistory(clientId) {
    document.getElementById('clientHistory').classList.remove('hidden');
    // Load client history based on clientId
}

function closeHistory() {
    document.getElementById('clientHistory').classList.add('hidden');
}

document.getElementById('addClientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newClient = {
        codigo: generateCode(), // Example code generation
        nombre: document.getElementById('newClientName').value,
        cedula: document.getElementById('newClientCedula').value,
        telefono: document.getElementById('newClientPhone').value,
        pais: document.getElementById('newClientCountry').value,
        ciudad: document.getElementById('newClientCity').value,
        fechaCompra: new Date().toISOString().split('T')[0] // Example date
    };
    clients.push(newClient);
    addClientToTable(newClient);
    closeForm('newClientForm');
});

document.getElementById('updateClientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const clientId = document.getElementById('editClientId').value;
    const updatedClient = {
        codigo: clientId,
        nombre: document.getElementById('editClientName').value,
        cedula: document.getElementById('editClientCedula').value,
        telefono: document.getElementById('editClientPhone').value,
        pais: document.getElementById('editClientCountry').value,
        ciudad: document.getElementById('editClientCity').value,
        fechaCompra: new Date().toISOString().split('T')[0] // Example date
    };
    const clientIndex = clients.findIndex(c => c.codigo === clientId);
    if (clientIndex !== -1) {
        clients[clientIndex] = updatedClient;
        updateClientInTable(updatedClient);
        closeForm('editClientForm');
    }
});

function addClientToTable(client) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="py-2 px-4 border-b">${client.codigo}</td>
        <td class="py-2 px-4 border-b">${client.nombre}</td>
        <td class="py-2 px-4 border-b">${client.cedula}</td>
        <td class="py-2 px-4 border-b">${client.telefono}</td>
        <td class="py-2 px-4 border-b">${client.pais}</td>
        <td class="py-2 px-4 border-b">${client.ciudad}</td>
        <td class="py-2 px-4 border-b">${client.fechaCompra}</td>
        <td class="py-2 px-4 border-b text-purple-500 cursor-pointer" onclick="editClient('${client.codigo}')">Editar</td>
    `;
    document.getElementById('clientTableBody').appendChild(row);
}

function updateClientInTable(client) {
    const rows = document.querySelectorAll('#clientTableBody tr');
    rows.forEach(row => {
        if (row.children[0].innerText === client.codigo) {
            row.children[1].innerText = client.nombre;
            row.children[2].innerText = client.cedula;
            row.children[3].innerText = client.telefono;
            row.children[4].innerText = client.pais;
            row.children[5].innerText = client.ciudad;
            row.children[6].innerText = client.fechaCompra;
        }
    });
}

function searchClient() {
    const searchType = document.getElementById('searchType').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filterCountry = document.getElementById('filterCountry').value;
    const filterCity = document.getElementById('filterCity').value;

    const filteredClients = clients.filter(client => {
        const matchesSearch = client[searchType].toLowerCase().includes(searchInput);
        const matchesCountry = filterCountry ? client.pais === filterCountry : true;
        const matchesCity = filterCity ? client.ciudad === filterCity : true;
        return matchesSearch && matchesCountry && matchesCity;
    });

    document.getElementById('clientTableBody').innerHTML = '';
    filteredClients.forEach(client => addClientToTable(client));
}

function generateCode() {
    return Math.random().toString(36).substr(2, 5).toUpperCase();
}

