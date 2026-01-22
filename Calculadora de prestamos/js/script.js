$(document).ready(function(){
            console.log('jQuery cargado correctamente');
            console.log('Script iniciado');

            // Evento click en el botón calcular
            $('#btnCalcular').on('click', function(){
                console.log('Botón clickeado');
                
                // Limpiar mensajes de error previos
                $('#errorMessage').hide().text('');

                // Obtener valores de los campos
                const monto = parseFloat($('#monto').val());
                const tasaAnual = parseFloat($('#interes').val());
                const plazo = parseInt($('#plazo').val());

                console.log('Valores:', {monto, tasaAnual, plazo});

                // Validación de campos
                if(isNaN(monto) || monto <= 0){
                    mostrarError('Por favor ingrese un monto válido mayor a cero');
                    return;
                }

                if(isNaN(tasaAnual) || tasaAnual <= 0){
                    mostrarError('Por favor ingrese una tasa de interés válida mayor a cero');
                    return;
                }

                if(isNaN(plazo) || plazo <= 0){
                    mostrarError('Por favor ingrese un plazo válido mayor a cero');
                    return;
                }

                // Si todo es válido, calcular el préstamo
                calcularPrestamo(monto, tasaAnual, plazo);
            });

            // Función para mostrar mensajes de error
            function mostrarError(mensaje){
                $('#errorMessage').text(mensaje).show();
                $('#resultsContainer').hide();
            }

            // Función para calcular el préstamo
            function calcularPrestamo(monto, tasaAnual, plazo){
                console.log('Calculando préstamo...');
                
                // Convertir tasa anual a tasa mensual decimal
                const tasaMensual = (tasaAnual / 100) / 12;

                let cuotaMensual;

                // Fórmula de cuota mensual
                if (tasaMensual === 0){
                    // Si no hay interés, dividir el monto entre el plazo
                    cuotaMensual = monto / plazo;
                } else {
                    // Fórmula del sistema francés (cuota fija)
                    const numerador = tasaMensual * Math.pow(1 + tasaMensual, plazo);
                    const denominador = Math.pow(1 + tasaMensual, plazo) - 1;
                    cuotaMensual = monto * (numerador / denominador);
                }

                // Calcular totales
                const totalPagar = cuotaMensual * plazo;
                const totalIntereses = totalPagar - monto;

                console.log('Resultados:', {cuotaMensual, totalPagar, totalIntereses});

                // Mostrar los resultados
                $('#cuotaMensual').text('$' + formatearNumero(cuotaMensual));
                $('#totalPagar').text('$' + formatearNumero(totalPagar));
                $('#totalIntereses').text('$' + formatearNumero(totalIntereses));

                // Mostrar el contenedor de resultados con animación
                $('#resultsContainer').slideDown('slow');
            }

            // Función para formatear números con separador de miles y decimales
            function formatearNumero(numero){
                if(isNaN(numero) || numero === null || numero === undefined){
                    return '0.00';
                }
                // Formato con 2 decimales y separador de miles
                return numero.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            // Permitir calcular presionando Enter en cualquier campo
            $('.form-control').on('keypress', function(e){
                if(e.which === 13) { // 13 es el código de la tecla Enter
                    $('#btnCalcular').click();
                }
            });

        });