# App Transporte - Cliente

Sistema de Gestión de Transporte - Aplicación Frontend

## 🚀 Estado Actual del Proyecto

### Versión: 0.1.0 (Desarrollo)
### Branch actual: `styleguide`

## 📋 Descripción

Aplicación web para gestión de transporte con un sistema de diseño completo y componentes reutilizables. Construida con React 19 y un sistema CSS modular personalizado.

## 🛠️ Stack Tecnológico

- **React** 19.1.1
- **React Router DOM** 7.8.2
- **React DatePicker** 8.7.0
- **CSS Modular** con Custom Properties
- **Font Awesome** 6.6.0 (iconos)

## 📁 Estructura del Proyecto

```
client/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── styleguide/       # Componentes del sistema de diseño
│   │       ├── Buttons.js
│   │       ├── Cards.js
│   │       ├── ColorPalette.js
│   │       ├── DateTimePickers.js
│   │       ├── DesignGuide.js
│   │       ├── Forms.js
│   │       ├── Logo.js       # Componente Logo reutilizable
│   │       ├── Navigation.js
│   │       ├── Notifications.js
│   │       ├── Tables.js
│   │       └── Typography.js
│   ├── pages/
│   │   └── Styleguide.js    # Página principal del sistema de diseño
│   ├── styles/
│   │   ├── base/            # Estilos fundamentales
│   │   │   ├── reset.css
│   │   │   ├── typography.css
│   │   │   ├── utilities.css
│   │   │   └── variables.css
│   │   ├── components/      # Estilos de componentes
│   │   │   ├── buttons.css
│   │   │   ├── cards.css
│   │   │   ├── datepickers.css
│   │   │   ├── forms.css
│   │   │   ├── logo.css
│   │   │   ├── navigation.css
│   │   │   ├── notifications.css
│   │   │   └── tables.css
│   │   ├── layout/          # Estilos de layout
│   │   │   ├── containers.css
│   │   │   └── responsive.css
│   │   └── styleguide.css   # Estilos principales
│   └── App.js               # Componente principal
├── public/
│   └── img/
│       └── logo.svg         # Logo en formato SVG
└── utilities/               # Scripts de utilidad
    ├── check-inline-styles.sh
    └── analyze-inline-styles.sh
```

## 🎨 Sistema de Diseño

### Componentes Implementados

✅ **Completados:**
- Sistema de botones (primarios, secundarios, outline, tamaños)
- Formularios con validación visual
- Tablas con ordenamiento y estados
- Cards y contenedores
- Sistema de navegación (navbar, sidebar, tabs)
- Notificaciones (alerts, toasts, badges)
- DatePickers y TimePickers
- Paleta de colores
- Sistema tipográfico
- Componente Logo reutilizable (múltiples tamaños y variantes)

### Características Destacadas

- **Sistema de Grid Responsivo**: 12 columnas con breakpoints
- **Variables CSS**: Colores, espaciados, sombras, radios
- **Animaciones**: Transiciones suaves en componentes
- **Modo Responsivo**: Adaptación completa para móviles
- **DatePickers Inteligentes**: 
  - No permite fechas/horas pasadas
  - Intervalos de 15 minutos
  - Sin teclado móvil

## 🚧 Estado de Desarrollo

### ✅ Completado
- Sistema base de componentes UI
- Estructura CSS modular
- Configuración de React Router
- Migración de estilos inline (65% reducido)
- Sistema de grid responsivo
- Utilidades CSS completas
- Componente Logo con SVG integrado
- Logo implementado en navbar y sidebar

### 🔄 En Progreso
- Resolución de bordes en botones de tabla (móvil)
- Optimización de padding en móviles

### 📝 Pendiente
- Implementación de tema oscuro
- Componentes adicionales (modales, tooltips, breadcrumbs)
- Documentación de componentes
- Tests unitarios
- Integración con backend

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn

### Instalación
```bash
# Instalar dependencias
npm install
```

### Scripts Disponibles
```bash
# Desarrollo
npm start         # Inicia servidor en http://localhost:3000

# Producción
npm run build     # Construye para producción

# Testing
npm test          # Ejecuta tests

# Utilidades
./utilities/check-inline-styles.sh    # Verifica estilos inline
./utilities/analyze-inline-styles.sh  # Analiza estilos CSS
```

## 📊 Métricas del Proyecto

- **Componentes**: 11+ componentes reutilizables
- **Archivos CSS**: 16+ archivos modulares
- **Estilos inline**: 23 (reducido de 68)
- **Clases CSS utilidades**: 100+
- **Breakpoints responsivos**: 6 niveles

## 🔍 Rutas Disponibles

- `/` - Página principal
- `/styleguide` - Sistema de diseño completo

## 📝 Convenciones de Código

### CSS
- **BEM** para componentes específicos
- **Utility-first** para estilos comunes
- Variables CSS para valores reutilizables
- Mobile-first para media queries

### JavaScript
- Componentes funcionales con Hooks
- PropTypes para validación (pendiente)
- Nombres descriptivos en español/inglés

## 🤝 Contribución

1. Crear branch desde `styleguide`
2. Seguir convenciones de código existentes
3. No agregar estilos inline sin justificación
4. Probar en móvil y desktop
5. Actualizar documentación si es necesario

## 📄 Licencia

Privado - Todos los derechos reservados

## 👥 Equipo

- Desarrollo principal con asistencia de Claude AI

---

*Última actualización: Diciembre 2024*
*Branch: styleguide*