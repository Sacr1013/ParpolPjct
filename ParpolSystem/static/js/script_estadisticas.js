// Obtén los elementos de los gráficos
const monthlySalesChartCtx = document.getElementById('monthlySalesChart').getContext('2d');
const categorySalesChartCtx = document.getElementById('categorySalesChart').getContext('2d');
const providerPaymentsChartCtx = document.getElementById('providerPaymentsChart').getContext('2d');
const citySalesChartCtx = document.getElementById('citySalesChart').getContext('2d');

// Gráfico de Ventas por Mes
new Chart(monthlySalesChartCtx, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
            label: 'Ventas ($)',
            data: [12000, 15000, 13000, 17000, 14000, 18000],
            borderColor: '#6f42c1',
            backgroundColor: 'rgba(111, 66, 193, 0.2)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Gráfico de Ventas por Categoría de Producto
new Chart(categorySalesChartCtx, {
    type: 'bar',
    data: {
        labels: ['Electrónica', 'Ropa', 'Alimentos', 'Muebles', 'Juguetes'],
        datasets: [{
            label: 'Ventas ($)',
            data: [20000, 15000, 10000, 8000, 5000],
            backgroundColor: ['#6f42c1', '#007bff', '#28a745', '#ffc107', '#dc3545']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Gráfico de Pagos a Proveedores
new Chart(providerPaymentsChartCtx, {
    type: 'pie',
    data: {
        labels: ['Proveedor A', 'Proveedor B', 'Proveedor C', 'Proveedor D'],
        datasets: [{
            data: [5000, 3000, 2000, 4000],
            backgroundColor: ['#6f42c1', '#007bff', '#28a745', '#ffc107']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Gráfico de Ventas por Ciudad
new Chart(citySalesChartCtx, {
    type: 'doughnut',
    data: {
        labels: ['Ciudad A', 'Ciudad B', 'Ciudad C', 'Ciudad D'],
        datasets: [{
            data: [15000, 12000, 10000, 8000],
            backgroundColor: ['#6f42c1', '#007bff', '#28a745', '#ffc107']
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});
