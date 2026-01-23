# 💰 Alke Wallet - Billetera Digital

Proyecto de billetera digital desarrollado como parte del Módulo 2: Fundamentos del desarrollo Front-end.

## 📋 Descripción del Proyecto

Alke Wallet es una aplicación web de billetera digital que permite a los usuarios gestionar sus activos financieros de manera segura y conveniente. Los usuarios pueden:

- Iniciar sesión (simulación de login)
- Ver su saldo disponible
- Realizar depósitos de fondos
- Enviar dinero a otros contactos
- Ver el historial completo de transacciones

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica de las páginas
- **CSS3**: Estilos personalizados y diseño responsive
- **JavaScript**: Lógica de la aplicación
- **Bootstrap 5.3**: Framework CSS para diseño responsive
- **jQuery 3.6**: Librería JavaScript para manipulación del DOM
- **LocalStorage**: Almacenamiento local de datos

## 📁 Estructura del Proyecto

```
alke-wallet/
│
├── index.html              # Página de bienvenida
├── login.html              # Inicio de sesión
├── menu.html               # Menú principal
├── deposit.html            # Realizar depósitos
├── sendmoney.html          # Enviar dinero
├── transactions.html       # Historial de movimientos
│
├── css/
│   └── styles.css          # Estilos personalizados
│
├── Assets/
│   └── dataparticles.mp4   # Animacion de inicio
│
├── js/
│   ├── login.js            # Lógica del login
│   ├── deposit.js          # Lógica de depósitos
│   ├── sendmoney.js        # Lógica de transferencias
│   ├── menu.js             # Lógica del menú
│   └── transactions.js     # Lógica del historial
│
└── README.md               # Este archivo
```

## 🚀 Cómo Usar la Aplicación

### 1. Acceder a la aplicación

Abre el archivo `index.html` en tu navegador web.

### 2. Iniciar Sesión

Usa las siguientes credenciales de prueba:

- **Usuario**: `admin`
- **Contraseña**: `1234`

También puedes usar:
- Usuario: `usuario` / Contraseña: `pass123`
- Usuario: `test` / Contraseña: `test`

### 3. Navegar por la aplicación

Desde el menú principal puedes:

- **Depositar**: Agregar fondos a tu cuenta
- **Enviar Dinero**: Transferir a contactos guardados
- **Ver Movimientos**: Revisar el historial completo

## 💡 Funcionalidades Principales

### Login
- Validación de credenciales
- Almacenamiento seguro de sesión
- Redirección automática

### Depósitos
- Formulario de depósito con validaciones
- Botones de monto rápido
- Actualización automática del saldo
- Registro de transacciones

### Enviar Dinero
- Búsqueda de contactos con autocompletado
- Validación de saldo disponible
- Confirmación de transferencia
- Gestión de contactos

### Historial de Transacciones
- Visualización de todas las transacciones
- Filtros por tipo y fecha
- Resumen de ingresos y egresos
- Opción de exportación (simulada)

## 🎨 Características de Diseño

- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Interfaz moderna y amigable
- ✅ Animaciones suaves
- ✅ Paleta de colores profesional
- ✅ Componentes de Bootstrap
- ✅ Iconos y badges informativos

## 💾 Almacenamiento de Datos

La aplicación utiliza **localStorage** para simular una base de datos:

- `isLoggedIn`: Estado de sesión del usuario
- `currentUser`: Usuario actualmente logueado
- `balance`: Saldo actual de la cuenta
- `transactions`: Array de todas las transacciones

## 🔒 Seguridad

⚠️ **IMPORTANTE**: Esta es una aplicación de DEMOSTRACIÓN educativa.

- Las credenciales están hardcodeadas (no hacer en producción)
- Los datos se almacenan en localStorage (no seguro para producción)
- No hay encriptación de contraseñas
- No hay backend real

En una aplicación real se necesitaría:
- Backend con API REST
- Base de datos segura
- Autenticación con JWT o similar
- Encriptación de contraseñas
- HTTPS
- Validaciones del lado del servidor

## 📱 Responsive Design

La aplicación está optimizada para:

- 📱 Móviles (< 768px)
- 📱 Tablets (768px - 992px)
- 💻 Laptops (992px - 1200px)
- 🖥️ Desktops (> 1200px)

## 🔧 Instalación y Ejecución

### Opción 1: Abrir directamente
1. Descarga todos los archivos
2. Abre `index.html` en tu navegador
3. ¡Listo!

### Opción 2: Servidor local (recomendado)
```bash
# Si tienes Python instalado:
python -m http.server 8000

# O con Node.js:
npx http-server

# Luego abre: http://localhost:8000
```

## 📚 Aprendizajes del Módulo

Este proyecto demuestra conocimientos en:

1. **HTML Semántico**: Uso correcto de etiquetas
2. **CSS y Bootstrap**: Diseño responsive y estilizado
3. **JavaScript**: Manipulación del DOM y eventos
4. **jQuery**: Simplificación de código JS
5. **LocalStorage**: Persistencia de datos
6. **Git y GitHub**: Control de versiones

## 🎯 Criterios de Evaluación Cumplidos

✅ Registro e inicio de sesión
✅ Administración de fondos
✅ Envío y recepción de fondos
✅ Historial de transacciones
✅ Uso de HTML, CSS, JavaScript
✅ Implementación de Bootstrap
✅ Integración de jQuery
✅ Código legible y bien organizado
✅ Experiencia de usuario fluida

## 🔮 Mejoras Futuras

- [ ] Integración con backend real
- [ ] Base de datos MySQL/PostgreSQL
- [ ] Autenticación con JWT
- [ ] Verificación en dos pasos
- [ ] Notificaciones push
- [ ] Gráficos de gastos
- [ ] Exportación real a PDF
- [ ] Categorización de gastos
- [ ] Presupuestos mensuales
- [ ] Modo oscuro

## 👨‍💻 Autor

Proyecto desarrollado para el curso de Desarrollo Full Stack JAVA.
Docente: Sabina Romero Rodríguez
Estudiante: Maximiliano Vilugrón Cofré
Proyecto usado actualmente en curso de desarrollo Full Stack JavaScript.

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

---

**Fecha de desarrollo**: Diciembre 2025  
**Versión**: 1.1.0
# Alke-Wallet
