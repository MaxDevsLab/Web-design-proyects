// ========================================
// ALKE WALLET - TRANSACCIONES
// ========================================

$(document).ready(function() {
    // Verificar login
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }
    
    // Obtener datos del localStorage
    let currentBalance = parseFloat(localStorage.getItem('balance')) || 10000.00;
    let allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    // Si no hay transacciones, crear una inicial
    if (allTransactions.length === 0) {
        allTransactions = [{
            type: 'deposit',
            amount: 10000,
            description: 'Depósito inicial',
            method: 'Transferencia bancaria',
            date: new Date().toISOString()
        }];
        localStorage.setItem('transactions', JSON.stringify(allTransactions));
    }
    
    // Calcular totales
    let totalIncome = 0;
    let totalExpenses = 0;
    
    allTransactions.forEach(transaction => {
        if (transaction.amount > 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += Math.abs(transaction.amount);
        }
    });
    
    // Mostrar resumen
    $('#currentBalance').text('$' + currentBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    $('#totalIncome').text('$' + totalIncome.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    $('#totalExpenses').text('$' + totalExpenses.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    
    // Función para mostrar transacciones
    function displayTransactions(transactions) {
        const tbody = $('#transactionsTableBody');
        tbody.empty();
        
        if (transactions.length === 0) {
            $('#noTransactions').removeClass('d-none');
            tbody.closest('table').addClass('d-none');
            return;
        }
        
        $('#noTransactions').addClass('d-none');
        tbody.closest('table').removeClass('d-none');
        
        transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            const formattedDate = date.toLocaleDateString('es-ES') + ' ' + 
                                 date.toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit'});
            
            let typeLabel = '';
            let typeBadge = '';
            let recipient = '-';
            
            if (transaction.type === 'deposit') {
                typeLabel = 'Depósito';
                typeBadge = 'bg-success';
            } else if (transaction.type === 'transfer') {
                typeLabel = 'Transferencia';
                typeBadge = 'bg-primary';
                recipient = transaction.recipient || '-';
            }
            
            const amountClass = transaction.amount > 0 ? 'text-success' : 'text-danger';
            const amountSign = transaction.amount > 0 ? '+' : '';
            const formattedAmount = amountSign + '$' + Math.abs(transaction.amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            
            const row = `
                <tr class="fade-in">
                    <td>${formattedDate}</td>
                    <td><span class="badge ${typeBadge}">${typeLabel}</span></td>
                    <td>${transaction.description}</td>
                    <td>${recipient}</td>
                    <td class="text-end ${amountClass} fw-bold">${formattedAmount}</td>
                    <td><span class="badge bg-success">Completado</span></td>
                </tr>
            `;
            
            tbody.append(row);
        });
    }
    
    // Mostrar todas las transacciones inicialmente
    displayTransactions(allTransactions);
    
    // Aplicar filtros
    $('#applyFilters').on('click', function() {
        const filterType = $('#filterType').val();
        const dateFrom = $('#filterDateFrom').val();
        const dateTo = $('#filterDateTo').val();
        
        let filtered = [...allTransactions];
        
        // Filtrar por tipo
        if (filterType !== 'all') {
            filtered = filtered.filter(t => t.type === filterType);
        }
        
        // Filtrar por fecha desde
        if (dateFrom) {
            const fromDate = new Date(dateFrom);
            filtered = filtered.filter(t => new Date(t.date) >= fromDate);
        }
        
        // Filtrar por fecha hasta
        if (dateTo) {
            const toDate = new Date(dateTo);
            toDate.setHours(23, 59, 59);
            filtered = filtered.filter(t => new Date(t.date) <= toDate);
        }
        
        displayTransactions(filtered);
    });
    
    // Limpiar filtros
    $('#clearFilters').on('click', function() {
        $('#filterType').val('all');
        $('#filterDateFrom').val('');
        $('#filterDateTo').val('');
        displayTransactions(allTransactions);
    });
    
    // Exportar a PDF (simulado)
    $('#exportBtn').on('click', function() {
        alert('Función de exportación a PDF\n\nEn una aplicación real, aquí se generaría un PDF con todas las transacciones.\n\nPor ahora, esta es una demostración.');
        
        // En una app real, aquí usarías una librería como jsPDF
        // Ejemplo básico de lo que haría:
        // const doc = new jsPDF();
        // doc.text('Historial de Transacciones', 10, 10);
        // ... agregar las transacciones
        // doc.save('transacciones.pdf');
    });
    
    // Configurar fechas por defecto (último mes)
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    
    // No establecer fechas por defecto, dejar vacío para mostrar todas
});
