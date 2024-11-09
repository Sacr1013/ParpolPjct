let clients = [
    {
        codigo: '001',
        nombre: 'Juan Pérez',
        cedula: '123456789',
        telefono: '555-1234',
        pais: 'País 1',
        ciudad: 'Ciudad 1',
        fechaCompra: '2024-10-25',
        compras: [  // Historial de compras para el cliente
            { fecha: '2024-10-25', producto: 'Producto A', cantidad: 2, precio: '$50' },
            { fecha: '2024-11-01', producto: 'Producto B', cantidad: 1, precio: '$30' }
        ]
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
    const client = clients.find(c => c.codigo === clientId);
    if (client) {
        // Mostrar la ventana del historial
        document.getElementById('clientHistory').classList.remove('hidden');
        
        // Llenar la tabla con el historial de compras
        const historyTableBody = document.getElementById('historyTableBody');
        historyTableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

        client.compras.forEach(compra => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="py-2 px-4 border-b">${compra.fecha}</td>
                <td class="py-2 px-4 border-b">${compra.producto}</td>
                <td class="py-2 px-4 border-b">${compra.cantidad}</td>
                <td class="py-2 px-4 border-b">${compra.precio}</td>
            `;
            historyTableBody.appendChild(row);
        });
    }
}

function closeHistory() {
    document.getElementById('clientHistory').classList.add('hidden');
}

// Agregar un historial de compras de ejemplo al crear un nuevo cliente
document.getElementById('addClientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newClient = {
        codigo: generateCode(),
        nombre: document.getElementById('newClientName').value,
        cedula: document.getElementById('newClientCedula').value,
        telefono: document.getElementById('newClientPhone').value,
        pais: document.getElementById('newClientCountry').value,
        ciudad: document.getElementById('newClientCity').value,
        fechaCompra: new Date().toISOString().split('T')[0], // Fecha de creación
        compras: [] // Inicialmente, no hay historial de compras
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