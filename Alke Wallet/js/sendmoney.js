// ========================================
// ALKE WALLET - ENVIAR DINERO
// ========================================

$(document).ready(function() {
    // Verificar login
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }
    
    // Obtener saldo actual
    let currentBalance = parseFloat(localStorage.getItem('balance')) || 10000.00;
    $('#currentBalance').text('$' + currentBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    
    // Lista de contactos (simulada)
    const contacts = [
        { id: 1, name: 'María García', email: 'maria.garcia@mail.com' },
        { id: 2, name: 'Juan Pérez', email: 'juan.perez@mail.com' },
        { id: 3, name: 'Ana Martínez', email: 'ana.martinez@mail.com' },
        { id: 4, name: 'Carlos López', email: 'carlos.lopez@mail.com' }
    ];
    
    // Autocompletar en búsqueda de contactos
    $('#searchContact').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        $('#contactSuggestions').empty();
        
        if (searchTerm.length >= 2) {
            const filtered = contacts.filter(contact => 
                contact.name.toLowerCase().includes(searchTerm)
            );
            
            if (filtered.length > 0) {
                filtered.forEach(contact => {
                    const suggestion = $(`
                        <a href="#" class="list-group-item list-group-item-action suggestion-item" 
                           data-id="${contact.id}" data-name="${contact.name}">
                            <strong>${contact.name}</strong><br>
                            <small class="text-muted">${contact.email}</small>
                        </a>
                    `);
                    $('#contactSuggestions').append(suggestion);
                });
            } else {
                $('#contactSuggestions').html(`
                    <div class="list-group-item text-muted">
                        No se encontraron contactos
                    </div>
                `);
            }
        }
    });
    
    // Seleccionar contacto desde sugerencias
    $(document).on('click', '.suggestion-item', function(e) {
        e.preventDefault();
        const name = $(this).data('name');
        const id = $(this).data('id');
        
        $('#selectedContact').val(name);
        $('#selectedContactId').val(id);
        $('#searchContact').val('');
        $('#contactSuggestions').empty();
    });
    
    // Seleccionar contacto desde la lista
    $('.contact-item').on('click', function(e) {
        e.preventDefault();
        const name = $(this).data('name');
        const id = $(this).data('id');
        
        $('#selectedContact').val(name);
        $('#selectedContactId').val(id);
        
        // Highlight del contacto seleccionado
        $('.contact-item').removeClass('active');
        $(this).addClass('active');
    });
    
    // Manejo del formulario de envío
    $('#sendMoneyForm').on('submit', function(e) {
        e.preventDefault();
        
        // Ocultar mensajes previos
        $('#successMessage, #errorMessage').addClass('d-none');
        
        // Obtener valores
        const contactName = $('#selectedContact').val();
        const contactId = $('#selectedContactId').val();
        const amount = parseFloat($('#sendAmount').val());
        const description = $('#sendDescription').val();
        
        // Validaciones
        if (!contactName || !contactId) {
            $('#errorText').text('Por favor selecciona un contacto');
            $('#errorMessage').removeClass('d-none');
            return;
        }
        
        if (!amount || amount <= 0) {
            $('#errorText').text('Por favor ingresa un monto válido');
            $('#errorMessage').removeClass('d-none');
            return;
        }
        
        if (amount > currentBalance) {
            $('#errorText').text('Saldo insuficiente para realizar la transferencia');
            $('#errorMessage').removeClass('d-none');
            return;
        }
        
        if (!description) {
            $('#errorText').text('Por favor ingresa un concepto');
            $('#errorMessage').removeClass('d-none');
            return;
        }
        
        // Realizar transferencia
        currentBalance -= amount;
        localStorage.setItem('balance', currentBalance);
        
        // Guardar transacción
        saveTransaction({
            type: 'transfer',
            amount: -amount, // Negativo porque es egreso
            description: description,
            recipient: contactName,
            date: new Date().toISOString()
        });
        
        // Mostrar mensaje de éxito
        $('#sentAmount').text('$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
        $('#sentTo').text(contactName);
        $('#successMessage').removeClass('d-none').hide().fadeIn(500);
        
        // Limpiar formulario
        $('#sendMoneyForm')[0].reset();
        $('#selectedContact').val('');
        $('#selectedContactId').val('');
        $('.contact-item').removeClass('active');
        
        // Actualizar saldo mostrado
        $('#currentBalance').text('$' + currentBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
        
        // Redirigir después de 3 segundos
        setTimeout(function() {
            window.location.href = 'menu.html';
        }, 3000);
    });
    
    // Modal de agregar contacto
    $('#saveContactBtn').on('click', function() {
        const name = $('#newContactName').val().trim();
        const email = $('#newContactEmail').val().trim();
        
        if (name && email) {
            // Crear nuevo contacto (en una app real, esto se guardaría en el servidor)
            const newId = contacts.length + 1;
            contacts.push({ id: newId, name: name, email: email });
            
            // Obtener iniciales para el avatar
            const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            
            // Agregar a la lista visual
            const newContactHtml = `
                <a href="#" class="list-group-item list-group-item-action contact-item" 
                   data-id="${newId}" data-name="${name}">
                    <div class="d-flex align-items-center">
                        <div class="avatar-circle me-3">${initials}</div>
                        <div>
                            <h6 class="mb-0">${name}</h6>
                            <small class="text-muted">${email}</small>
                        </div>
                    </div>
                </a>
            `;
            $('#contactList').append(newContactHtml);
            
            // Cerrar modal y limpiar
            $('#addContactModal').modal('hide');
            $('#addContactForm')[0].reset();
            
            // Mensaje de éxito
            alert('Contacto agregado exitosamente');
        }
    });
    
    // Función para guardar transacciones
    function saveTransaction(transaction) {
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.unshift(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }
});
