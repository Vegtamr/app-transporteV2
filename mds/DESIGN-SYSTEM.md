# Sistema de Diseño - App Transporte
## Guía de Estilos Visuales Transversal

### 🎨 Paleta de Colores

#### Colores Principales
| Variable | Valor | Uso |
|----------|-------|-----|
| `--primary-color` | `rgb(250,179,27)` | Color principal, botones primarios, acentos |
| `--secondary-color` | `rgb(43,43,43)` | Textos sobre primario, fondos oscuros |
| `--background-color` | `#ffffff` | Fondo principal de la aplicación |
| `--surface-color` | `#f8f9fa` | Fondos de tarjetas y superficies elevadas |
| `--text-color` | `rgb(43,43,43)` | Texto principal |
| `--text-secondary` | `#6c757d` | Texto secundario, descripciones |
| `--border-color` | `#dee2e6` | Bordes y divisores |

#### Colores Semánticos
| Variable | Valor | Uso |
|----------|-------|-----|
| `--success-color` | `#28a745` | Estados exitosos, confirmaciones |
| `--danger-color` | `#dc3545` | Errores, acciones destructivas |
| `--warning-color` | `#ffc107` | Advertencias, precauciones |
| `--info-color` | `#17a2b8` | Información, notificaciones |

#### Modo Oscuro
| Variable | Valor Claro | Valor Oscuro |
|----------|-------------|--------------|
| `--background-color` | `#ffffff` | `#1a1a1a` |
| `--surface-color` | `#f8f9fa` | `#2b2b2b` |
| `--text-color` | `rgb(43,43,43)` | `#e0e0e0` |
| `--text-secondary` | `#6c757d` | `#a0a0a0` |
| `--border-color` | `#dee2e6` | `#404040` |

### 📐 Espaciado Fluido

Sistema de espaciado adaptativo usando `clamp()` para escalar con el viewport:

| Variable | Valor | Min | Max |
|----------|-------|-----|-----|
| `--space-xs` | `clamp(0.25rem, 1vw, 0.5rem)` | 4px | 8px |
| `--space-sm` | `clamp(0.5rem, 2vw, 1rem)` | 8px | 16px |
| `--space-md` | `clamp(1rem, 3vw, 1.5rem)` | 16px | 24px |
| `--space-lg` | `clamp(1.5rem, 4vw, 2rem)` | 24px | 32px |
| `--space-xl` | `clamp(2rem, 5vw, 3rem)` | 32px | 48px |
| `--space-xxl` | `clamp(3rem, 6vw, 4rem)` | 48px | 64px |

### 🔤 Tipografía Fluida

Sistema tipográfico que escala suavemente entre dispositivos:

| Variable | Valor | Min | Max |
|----------|-------|-----|-----|
| `--font-size-xs` | `clamp(0.75rem, 0.5vw + 0.625rem, 0.875rem)` | 12px | 14px |
| `--font-size-sm` | `clamp(0.875rem, 0.75vw + 0.75rem, 1rem)` | 14px | 16px |
| `--font-size-base` | `clamp(1rem, 1vw + 0.875rem, 1.125rem)` | 16px | 18px |
| `--font-size-lg` | `clamp(1.125rem, 1.5vw + 0.875rem, 1.25rem)` | 18px | 20px |
| `--font-size-xl` | `clamp(1.25rem, 2vw + 1rem, 1.5rem)` | 20px | 24px |
| `--font-size-2xl` | `clamp(1.5rem, 2.5vw + 1.125rem, 2rem)` | 24px | 32px |
| `--font-size-3xl` | `clamp(1.875rem, 3vw + 1.25rem, 2.5rem)` | 30px | 40px |
| `--font-size-4xl` | `clamp(2.25rem, 4vw + 1.5rem, 3rem)` | 36px | 48px |

#### Familia Tipográfica
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### 📱 Breakpoints Responsivos

| Nombre | Variable | Valor | Dispositivos |
|--------|----------|-------|--------------|
| XS | `--breakpoint-xs` | 0 | Móviles pequeños |
| SM | `--breakpoint-sm` | 576px | Móviles grandes |
| MD | `--breakpoint-md` | 768px | Tablets portrait |
| LG | `--breakpoint-lg` | 992px | Tablets landscape, laptops |
| XL | `--breakpoint-xl` | 1200px | Desktop estándar |
| XXL | `--breakpoint-xxl` | 1400px | Monitores 4K, ultra wide |

#### Anchos de Container
| Breakpoint | Max-width |
|------------|-----------|
| SM | 540px |
| MD | 720px |
| LG | 960px |
| XL | 1140px |
| XXL | 1320px |

### 🎭 Sombras

| Variable | Valor | Uso |
|----------|-------|-----|
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.05)` | Elementos sutiles |
| `--shadow-sm` | `0 2px 4px rgba(0,0,0,0.075)` | Tarjetas, botones |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Hover states |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.125)` | Modales, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Elementos elevados |

### 🔲 Bordes y Radios

| Variable | Valor | Uso |
|----------|-------|-----|
| `--radius-sm` | `0.25rem` (4px) | Inputs, badges |
| `--radius-md` | `0.375rem` (6px) | Botones, tarjetas |
| `--radius-lg` | `0.5rem` (8px) | Contenedores |
| `--radius-xl` | `1rem` (16px) | Modales, elementos destacados |

### 🎯 Componentes Visuales

#### Botones
- **Padding:** `var(--space-sm) var(--space-lg)`
- **Border Radius:** `var(--radius-md)`
- **Min Height:** `44px` (accesibilidad táctil)
- **Transición:** `all 0.3s ease`
- **Hover:** `transform: translateY(-2px)` + sombra

#### Formularios
- **Padding Input:** `var(--space-sm)`
- **Border:** `2px solid var(--border-color)`
- **Border Radius:** `var(--radius-md)`
- **Min Height:** `44px`
- **Focus:** Border primario + sombra suave

#### Cards
- **Padding:** `var(--space-md)`
- **Border Radius:** `var(--radius-lg)`
- **Background:** `var(--surface-color)`
- **Sombra:** `var(--shadow-sm)` → `var(--shadow-lg)` en hover

#### Navegación
- **Height Desktop:** Auto
- **Height Mobile:** 100vh (menú hamburguesa)
- **Transición Menú:** `transform 0.3s ease`
- **Hamburger Lines:** 25px × 3px, gap 4px

### 🎬 Animaciones

#### Transiciones Estándar
```css
transition: all 0.3s ease;
```

#### Animaciones Disponibles
| Nombre | Duración | Uso |
|--------|----------|-----|
| `fadeInUp` | 0.6s | Entrada de secciones |
| `slideIn` | 0.3s | Menús laterales |
| `slideOut` | 0.3s | Cierre de menús |
| `skeleton-loading` | 1.2s | Estados de carga |

### 📊 Estados de Componentes

#### Alertas/Notificaciones
| Tipo | Border | Background | Color |
|------|--------|------------|-------|
| Info | `#0dcaf0` | `#cff4fc` | `#055160` |
| Success | `#198754` | `#d1e7dd` | `#0f5132` |
| Warning | `#ffc107` | `#fff3cd` | `#664d03` |
| Error | `#dc3545` | `#f8d7da` | `#842029` |

#### Modo Oscuro - Alertas
| Tipo | Background | Color |
|------|------------|-------|
| Info | `#032830` | `#6edff6` |
| Success | `#051b11` | `#75b798` |
| Warning | `#332701` | `#ffda6a` |
| Error | `#2c0b0e` | `#ea868f` |

### 🎨 Gradientes

#### Gradiente Principal
```css
linear-gradient(135deg, var(--primary-color), rgb(230, 160, 20))
```

#### Gradiente Métrica
```css
linear-gradient(90deg, var(--primary-color), var(--success-color))
```

### ♿ Accesibilidad

- **Contraste mínimo:** WCAG AA (4.5:1 texto normal, 3:1 texto grande)
- **Áreas táctiles mínimas:** 44px × 44px
- **Focus visible:** `outline: 3px solid var(--primary-color)`
- **Skip links:** Disponibles para navegación por teclado
- **ARIA labels:** En todos los elementos interactivos

### 🚀 Performance

- **Tipografía fluida:** Sin media queries, usa `clamp()`
- **Grid responsivo:** `auto-fit` y `minmax()` nativos
- **Lazy loading:** Imágenes con Intersection Observer
- **Smooth scroll:** Nativo con `scroll-behavior: smooth`
- **Contain:** `layout style` en componentes aislados

### 📝 Notas de Implementación

1. **Variables CSS:** Usar siempre variables para mantener consistencia
2. **Mobile First:** Diseñar primero para móvil, luego escalar
3. **Modo Oscuro:** Soportar tanto automático como manual
4. **Reducción de Movimiento:** Respetar `prefers-reduced-motion`
5. **Print Styles:** Incluir estilos básicos para impresión

### 🔧 Uso en Otras Aplicaciones

Para implementar este sistema en otra aplicación:

1. **Copiar variables CSS** del archivo `responsive-system.css`
2. **Adaptar breakpoints** según necesidades específicas
3. **Mantener espaciado fluido** para consistencia
4. **Respetar paleta de colores** para identidad de marca
5. **Usar mismas animaciones** para coherencia de UX

---

*Este documento define el sistema de diseño visual completo de App Transporte, diseñado para ser reutilizable y escalable en múltiples aplicaciones.*