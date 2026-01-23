// ========================================
// ALKE WALLET - LOGIN
// ========================================

$(document).ready(function() {
    
    //animacion fondo login
    const video = $('.bg-video').get(0);

    if (video) {
        video.playbackRate = 0.70;
    };

    // Credenciales de prueba
    const validUsers = {
        'admin': '1234',
        'usuario': 'pass123',
        'test': 'test'
    };

    // Manejo del formulario de login
    $('#loginForm').on('submit', function(e) {
        e.preventDefault(); // Prevenir envío normal del formulario
        
        // Obtener valores del formulario
        const username = $('#username').val().trim();
        const password = $('#password').val();
        
        // Ocultar mensaje de error
        $('#errorMessage').addClass('d-none');
        
        // Validar credenciales
        if (validUsers[username] && validUsers[username] === password) {
            // Login exitoso
            console.log('Login exitoso');
            
            // Guardar usuario en localStorage
            localStorage.setItem('currentUser', username);
            localStorage.setItem('isLoggedIn', 'true');
            
            // Efecto de carga (opcional)
            const $btn = $(this).find('button[type="submit"]');
            const originalText = $btn.html();
            $btn.html('<span class="spinner-border spinner-border-sm me-2"></span>Ingresando...').prop('disabled', true);
            
            // Redirigir al menú principal después de 1 segundo
            setTimeout(function() {
                window.location.href = 'menu.html';
            }, 1000);
            
        } else {
            // Login fallido
            console.log('Credenciales incorrectas');
            $('#errorMessage').removeClass('d-none');
            
            // Limpiar campo de contraseña
            $('#password').val('').focus();
            
            // Shake animation (efecto de error)
            $('#loginForm').addClass('shake');
            setTimeout(function() {
                $('#loginForm').removeClass('shake');
            }, 500);
        }
    });
    
    // Animación shake para error (agregar al CSS si quieres)
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake {
            animation: shake 0.5s;
        }
    `;
    document.head.appendChild(style);
    
    // Auto-focus en el campo de usuario al cargar la página
    $('#username').focus();
    
    // Limpiar sesión anterior (si existe)
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
});
