# 📚 GUÍA DIDÁCTICA - Alke Wallet
## Entendiendo cómo funciona tu proyecto paso a paso

---

## 🎓 Lección 1: ¿Qué acabamos de crear?

Hemos creado una **aplicación web completa** que funciona como una billetera digital. Piensa en ella como una versión simplificada de apps como Mercado Pago o PayPal.

### Componentes principales:

1. **Frontend** (lo que el usuario ve):
   - Páginas HTML
   - Estilos CSS
   - Interactividad con JavaScript

2. **Almacenamiento** (donde se guardan los datos):
   - LocalStorage del navegador

---

## 🔍 Lección 2: Entendiendo el flujo de la aplicación

### Paso 1: El usuario abre la app
```
index.html → Página de bienvenida
    ↓
    [Botón "Comenzar"]
    ↓
login.html → Pantalla de login
```

### Paso 2: Iniciar sesión
```
Usuario ingresa credenciales
    ↓
JavaScript valida (login.js)
    ↓
Si es correcto → Guarda en localStorage
    ↓
Redirige a menu.html
```

### Paso 3: Usuario logueado
```
menu.html → Muestra 3 opciones:
    1. Depositar → deposit.html
    2. Enviar → sendmoney.html
    3. Ver movimientos → transactions.html
```

---

## 💻 Lección 3: ¿Cómo funciona cada archivo?

### HTML Files (Estructura)

#### index.html
**Qué hace**: Página de bienvenida
**Elementos clave**:
- `<link>` para Bootstrap CSS
- Un botón que lleva a login.html
- Diseño centrado con flexbox

#### login.html
**Qué hace**: Pantalla de inicio de sesión
**Elementos clave**:
- `<form id="loginForm">` - Formulario de login
- Campos de input para usuario y contraseña
- Mensaje de error (oculto por defecto)
- Link al script `login.js`

**¿Por qué funciona?**
```html
<!-- El formulario tiene un ID -->
<form id="loginForm">
    <!-- JavaScript puede encontrarlo y escuchar el evento submit -->
</form>
```

#### menu.html
**Qué hace**: Menú principal después del login
**Elementos clave**:
- Navbar con el nombre de la app
- Tarjeta mostrando el saldo
- 3 cards con enlaces a las funciones principales

#### deposit.html
**Qué hace**: Permite hacer depósitos
**Elementos clave**:
- Formulario para ingresar monto
- Botones de monto rápido
- Validaciones de JavaScript
- Muestra saldo actualizado

#### sendmoney.html
**Qué hace**: Enviar dinero a contactos
**Elementos clave**:
- Input con autocompletado
- Lista de contactos
- Modal para agregar contactos
- Validación de saldo

#### transactions.html
**Qué hace**: Muestra historial
**Elementos clave**:
- Tabla de transacciones
- Filtros por tipo y fecha
- Resumen financiero

---

## 🎨 Lección 4: Los estilos CSS

### styles.css

**Variables CSS (muy útil)**:
```css
:root {
    --primary-color: #0d6efd;
    --success-color: #198754;
}
```
¿Para qué? Defines colores una vez y los usas en todo el proyecto.

**Clases importantes**:

1. `.hover-card` - Efecto al pasar el mouse
2. `.avatar-circle` - Círculos con iniciales
3. `.fade-in` - Animación de entrada

**Responsive Design**:
```css
@media (max-width: 768px) {
    /* Estilos para móviles */
}
```

---

## ⚙️ Lección 5: JavaScript - El cerebro de la aplicación

### login.js - Explicación línea por línea

```javascript
// 1. Esperar a que la página cargue
$(document).ready(function() {
    
    // 2. Definir usuarios válidos
    const validUsers = {
        'admin': '1234'
    };
    
    // 3. Escuchar cuando se envía el formulario
    $('#loginForm').on('submit', function(e) {
        
        // 4. Evitar que la página se recargue
        e.preventDefault();
        
        // 5. Obtener valores del formulario
        const username = $('#username').val();
        const password = $('#password').val();
        
        // 6. Validar credenciales
        if (validUsers[username] === password) {
            // Login correcto
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'menu.html';
        } else {
            // Login incorrecto
            $('#errorMessage').removeClass('d-none');
        }
    });
});
```

**¿Qué está pasando aquí?**

1. **$(document).ready()**: Espera a que TODO el HTML esté listo
2. **e.preventDefault()**: Evita que el formulario se envíe normalmente
3. **$('#username').val()**: Obtiene el valor del input
4. **localStorage.setItem()**: Guarda datos en el navegador
5. **window.location.href**: Cambia de página

### deposit.js - Lógica de depósitos

**Flujo principal**:
```javascript
1. Verificar que el usuario esté logueado
    ↓
2. Obtener saldo actual del localStorage
    ↓
3. Mostrar el saldo
    ↓
4. Cuando se envía el formulario:
    - Validar monto
    - Sumar al saldo
    - Guardar en localStorage
    - Guardar transacción
    - Mostrar mensaje de éxito
```

**Código clave**:
```javascript
// Obtener saldo
let balance = parseFloat(localStorage.getItem('balance')) || 10000;

// Realizar depósito
balance += amount;

// Guardar nuevo saldo
localStorage.setItem('balance', balance);
```

### sendmoney.js - Transferencias

**Características importantes**:

1. **Autocompletado**:
```javascript
$('#searchContact').on('input', function() {
    const searchTerm = $(this).val();
    // Buscar contactos que coincidan
    // Mostrar sugerencias
});
```

2. **Validación de saldo**:
```javascript
if (amount > currentBalance) {
    // Mostrar error: saldo insuficiente
}
```

3. **Guardar transacción**:
```javascript
saveTransaction({
    type: 'transfer',
    amount: -amount,  // Negativo porque sale
    recipient: contactName,
    date: new Date()
});
```

### transactions.js - Historial

**Funciones principales**:

1. **Cargar transacciones**:
```javascript
let transactions = JSON.parse(
    localStorage.getItem('transactions')
) || [];
```

2. **Calcular totales**:
```javascript
transactions.forEach(t => {
    if (t.amount > 0) {
        totalIncome += t.amount;
    } else {
        totalExpenses += Math.abs(t.amount);
    }
});
```

3. **Filtrar**:
```javascript
filtered = transactions.filter(t => 
    t.type === filterType
);
```

---

## 📊 Lección 6: LocalStorage - La "base de datos"

### ¿Qué es LocalStorage?

Es un espacio de almacenamiento en el navegador que persiste incluso si cierras la pestaña.

### Operaciones básicas:

```javascript
// GUARDAR
localStorage.setItem('key', 'value');

// LEER
const value = localStorage.getItem('key');

// ELIMINAR
localStorage.removeItem('key');

// LIMPIAR TODO
localStorage.clear();
```

### Datos que guardamos:

1. **isLoggedIn**: `true` o `false`
2. **currentUser**: nombre del usuario
3. **balance**: saldo actual (número)
4. **transactions**: array de transacciones (JSON)

### Ejemplo real:

```javascript
// Guardar un número
localStorage.setItem('balance', 10000);

// Leer un número
let balance = parseFloat(
    localStorage.getItem('balance')
);

// Guardar un array (convertir a texto)
const transactions = [{...}, {...}];
localStorage.setItem('transactions', 
    JSON.stringify(transactions)
);

// Leer un array (convertir de texto)
const saved = JSON.parse(
    localStorage.getItem('transactions')
);
```

---

## 🔄 Lección 7: Flujo completo de una transacción

### Ejemplo: Hacer un depósito de $500

```
1. Usuario en deposit.html
    ↓
2. Ingresa 500 en el formulario
    ↓
3. Click en "Realizar Depósito"
    ↓
4. JavaScript (deposit.js) captura el evento
    ↓
5. Valida que 500 > 0 ✓
    ↓
6. Obtiene saldo actual: $10,000
    ↓
7. Suma: $10,000 + $500 = $10,500
    ↓
8. Guarda en localStorage:
   - balance: 10500
    ↓
9. Crea objeto de transacción:
   {
     type: 'deposit',
     amount: 500,
     description: 'Depósito',
     date: '2025-12-21T...'
   }
    ↓
10. Guarda la transacción en localStorage
    ↓
11. Muestra mensaje de éxito
    ↓
12. Espera 3 segundos
    ↓
13. Redirige a menu.html
```

---

## 🎯 Lección 8: Conceptos clave que aprendiste

### 1. Event Listeners
```javascript
$('#button').on('click', function() {
    // Código que se ejecuta al hacer click
});
```

### 2. Manipulación del DOM
```javascript
// Cambiar texto
$('#elemento').text('Nuevo texto');

// Cambiar HTML
$('#elemento').html('<strong>Bold</strong>');

// Agregar clase
$('#elemento').addClass('active');

// Ocultar/mostrar
$('#elemento').addClass('d-none');
$('#elemento').removeClass('d-none');
```

### 3. Validaciones
```javascript
if (!value || value <= 0) {
    // Mostrar error
    return;
}
```

### 4. Redirecciones
```javascript
window.location.href = 'otra-pagina.html';
```

### 5. Trabajo con fechas
```javascript
const now = new Date();
const formatted = now.toLocaleDateString('es-ES');
```

---

## 🔐 Lección 9: Seguridad (conceptos)

### ¿Por qué esta app NO es segura para producción?

1. **Contraseñas en el código**:
```javascript
// ❌ MAL - Contraseñas visibles
const validUsers = {
    'admin': '1234'
};

// ✅ BIEN - En producción:
// - Verificar contra servidor
// - Contraseñas encriptadas (bcrypt)
// - JWT tokens
```

2. **Datos en localStorage**:
```javascript
// ❌ MAL - Cualquiera puede ver/modificar
localStorage.setItem('balance', 10000);

// ✅ BIEN - En producción:
// - Datos en servidor
// - API con autenticación
// - Encriptación
```

3. **Sin validación del servidor**:
```javascript
// ❌ MAL - Solo validación frontend
if (amount > 0) { /* procesar */ }

// ✅ BIEN - En producción:
// - Validar en servidor también
// - Prevenir ataques
// - Logs de auditoría
```

---

## 📱 Lección 10: Bootstrap - Framework CSS

### ¿Por qué usamos Bootstrap?

- Ahorra tiempo
- Componentes pre-diseñados
- Responsive automático
- Consistencia visual

### Componentes que usamos:

1. **Grid System**:
```html
<div class="row">
    <div class="col-md-6">Mitad</div>
    <div class="col-md-6">Mitad</div>
</div>
```

2. **Cards**:
```html
<div class="card">
    <div class="card-header">Título</div>
    <div class="card-body">Contenido</div>
</div>
```

3. **Forms**:
```html
<div class="mb-3">
    <label class="form-label">Nombre</label>
    <input class="form-control" type="text">
</div>
```

4. **Buttons**:
```html
<button class="btn btn-primary">Click</button>
```

5. **Badges**:
```html
<span class="badge bg-success">Éxito</span>
```

---

## ✅ Checklist de entendimiento

Marca lo que ya entiendes:

- [✅] Sé cómo funciona el login
- [✅] Entiendo localStorage
- [✅] Puedo modificar los estilos
- [✅] Sé agregar una nueva página
- [✅] Entiendo jQuery básico
- [✅] Puedo explicar el flujo de datos
- [✅] Entiendo las validaciones
- [✅] Sé usar Bootstrap
- [✅] Puedo agregar funcionalidades
- [✅] Entiendo el código JavaScript

---

## 🚀 Próximos pasos sugeridos

1. **Practica modificando**:
   - Cambia colores
   - Agrega más campos
   - Crea nuevas validaciones

2. **Agrega funcionalidades**:
   - Modo oscuro
   - Más contactos
   - Categorías de gastos
   - Gráficos (Chart.js)

3. **Aprende más**:
   - APIs REST
   - Node.js para backend
   - Bases de datos
   - React o Vue.js

---

¡Felicidades! Has creado una aplicación web completa. 🎉
