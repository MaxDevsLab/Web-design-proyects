// ========================================
// ALKE WALLET - MENÚ PRINCIPAL
// ========================================

$(document).ready(function() {

    // Verificar si el usuario está logueado

    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // Obtener saldo del localStorage o 10k por defecto
    let currentBalance = parseFloat(localStorage.getItem('balance')) || 10000.00;
    
    // mi primer regex 💀
    function formatCurrency(amount) {
        return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    
    // Mostrar saldo en card principal menu
    $('#currentBalance').text(formatCurrency(currentBalance));
    
    // Obtener fecha y hora actual
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    // Formatear fecha en español
    const lastUpdateText = now.toLocaleDateString('es-ES', options);
    $('#lastUpdate').text(lastUpdateText);
    
    // Obtener transacciones del localStorage
    let allTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    if (allTransactions.length === 0) {
        const initialTransaction = {
            type: 'deposit',
            amount: 10000,
            description: 'Depósito inicial',
            method: 'Transferencia bancaria',
            date: new Date().toISOString()
        };
        
        allTransactions.push(initialTransaction);
        localStorage.setItem('transactions', JSON.stringify(allTransactions));
        
        
        if (!localStorage.getItem('balance')) {
            localStorage.setItem('balance', '10000');
        }
    }
    
   //funcionalidad seccion ultimas transacciones
    function displayRecentTransactions() {
        const container = $('#recentTransactions');
        container.empty();
        
        const recentTransactions = allTransactions.slice(0, 5);
        
        if (recentTransactions.length === 0) {
            container.html(`
                <div class="list-group-item text-center text-muted py-4">
                    <p class="mb-0">No hay transacciones registradas</p>
                </div>
            `);
            return;
        }
        
        // Iterar cada transacción y crear su elemento HTML
        recentTransactions.forEach(function(transaction) {
            // Formatear la fecha
            const transactionDate = new Date(transaction.date);
            const formattedDate = transactionDate.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            
            const formattedTime = transactionDate.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // Determinar el tipo de transacción y su formato
            let transactionTitle = '';
            let badgeClass = '';
            let amountClass = '';
            let amountSign = '';
            
            if (transaction.type === 'deposit') {
                transactionTitle = transaction.description || 'Depósito';
                badgeClass = 'bg-success';
                amountClass = 'text-white';
                amountSign = '+';
            } else if (transaction.type === 'transfer') {
                transactionTitle = transaction.description || 'Transferencia';
                badgeClass = 'bg-primary';
                amountClass = 'text-white';
                amountSign = '';
                
                // Agregar información del destinatario si existe
                if (transaction.recipient) {
                    transactionTitle += ` a ${transaction.recipient}`;
                }
            }
            
            // Formatear el monto
            const formattedAmount = amountSign + formatCurrency(Math.abs(transaction.amount));
            
            // Crear el HTML de la transacción
            const transactionHtml = `
                <div class="list-group-item d-flex justify-content-between align-items-center fade-in">
                    <div>
                        <h6 class="mb-1">${transactionTitle}</h6>
                        <small class="text-muted">${formattedDate} ${formattedTime}</small>
                    </div>
                    <span class="badge ${badgeClass} rounded-pill ${amountClass}">${formattedAmount}</span>
                </div>
            `;
            
            // Agregar al contenedor
            container.append(transactionHtml);
        });
    }
    
    // Llamar a la función para mostrar las transacciones
    displayRecentTransactions();
    
    // listen changes on localStorage 
    window.addEventListener('storage', function(e) {
        if (e.key === 'balance') {
            currentBalance = parseFloat(e.newValue) || 0;
            $('#currentBalance').text(formatCurrency(currentBalance));
        }
        
        if (e.key === 'transactions') {
            allTransactions = JSON.parse(e.newValue) || [];
            displayRecentTransactions();
        }
    });

    // Agregar efecto de contador animado al saldo
    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16); // 60 FPS
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.text(formatCurrency(current));
        }, 16);
    }
    animateValue($('#currentBalance'), 0, currentBalance, 1000);


    // logs de consola para check de login
    console.log('✅ Menú cargado correctamente');
    console.log('👤 Usuario:', userName);
    console.log('💰 Saldo:', formatCurrency(currentBalance));
    console.log('📝 Transacciones totales:', allTransactions.length);
    
});