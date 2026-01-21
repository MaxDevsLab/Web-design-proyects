// ========================================
// ALKE WALLET - DEPÓSITOS
// ========================================

$(document).ready(function() {
    // Verificar si el usuario está logueado
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }
    
    // Obtener saldo actual del localStorage (o usar valor por defecto)
    let currentBalance = parseFloat(localStorage.getItem('balance')) || 10000.00;
    
    // Mostrar saldo actual
    updateBalanceDisplay();
    
    function updateBalanceDisplay() {
        $('#currentBalance').text('$' + currentBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    }
    
    // Manejo de botones de monto rápido
    $('.quick-amount').on('click', function() {
        const amount = $(this).data('amount');
        $('#depositAmount').val(amount);
        $(this).addClass('active').siblings().removeClass('active');
    });
    
    // Manejo del formulario de depósito
    $('#depositForm').on('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores
        const amount = parseFloat($('#depositAmount').val());
        const method = $('#depositMethod').val();
        const description = $('#depositDescription').val() || 'Depósito';
        
        // Ocultar mensajes previos
        $('#successMessage, #errorMessage').addClass('d-none');
        
        // Validaciones
        if (!amount || amount <= 0) {
            $('#errorMessage').text('Por favor ingresa un monto válido').removeClass('d-none');
            return;
        }
        
        if (!method) {
            $('#errorMessage').text('Por favor selecciona un método de depósito').removeClass('d-none');
            return;
        }
        
        // Realizar el depósito
        currentBalance += amount;
        
        // Guardar nuevo saldo
        localStorage.setItem('balance', currentBalance);
        
        // Guardar transacción
        saveTransaction({
            type: 'deposit',
            amount: amount,
            description: description,
            method: method,
            date: new Date().toISOString()
        });
        
        // Mostrar mensaje de éxito
        $('#newBalance').text('$' + currentBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
        $('#successMessage').removeClass('d-none');
        updateBalanceDisplay();
        
        // Limpiar formulario
        $('#depositForm')[0].reset();
        $('.quick-amount').removeClass('active');
        
        // Animación de éxito
        $('#successMessage').hide().fadeIn(500);
        
        // Redirigir al menú después de 3 segundos
        setTimeout(function() {
            window.location.href = 'menu.html';
        }, 3000);
    });
    
    // Función para guardar transacciones
    function saveTransaction(transaction) {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.unshift(transaction); // Agregar al inicio
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    
    // Validar que solo se ingresen números
    $('#depositAmount').on('input', function() {
        const value = $(this).val();
        if (value < 0) {
            $(this).val(0);
        }
    });
    
    // Formatear el input cuando pierde el foco
    $('#depositAmount').on('blur', function() {
        const value = parseFloat($(this).val());
        if (value) {
            $(this).val(value.toFixed(2));
        }
    });
});
