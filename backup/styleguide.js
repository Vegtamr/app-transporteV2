// ========================================
// STYLEGUIDE - SISTEMA DE DISEÑO COMPLETO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los componentes
    initColorPalette();
    initButtons();
    initForms();
    initNotifications();
    initTabs();
    initCards();
    initTables();
    // ========================================
    // CREAR ELEMENTOS DINÁMICOS
    // ========================================
    
    // Crear estructura del menú móvil
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'navbar-mobile';
    mobileMenu.innerHTML = `
        <ul class="navbar-mobile-menu">
            <li class="navbar-mobile-item">
                <a href="#" class="navbar-mobile-link">Inicio</a>
            </li>
            <li class="navbar-mobile-item">
                <a href="#" class="navbar-mobile-link">Vehículos</a>
            </li>
            <li class="navbar-mobile-item">
                <a href="#" class="navbar-mobile-link">Conductores</a>
            </li>
            <li class="navbar-mobile-item">
                <a href="#" class="navbar-mobile-link">Rutas</a>
            </li>
            <li class="navbar-mobile-item">
                <a href="#" class="navbar-mobile-link">Mantenimiento</a>
            </li>
            <li class="navbar-mobile-item">
                <a href="#" class="navbar-mobile-link">Reportes</a>
            </li>
        </ul>
    `;
    
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'navbar-overlay';
    
    // Agregar al body
    document.body.appendChild(mobileMenu);
    document.body.appendChild(overlay);
    
    // ========================================
    // FUNCIONALIDAD DEL MENÚ MÓVIL
    // ========================================
    
    // Obtener elementos
    const hamburger = document.querySelector('.hamburger');
    const navbarMobile = document.querySelector('.navbar-mobile');
    const navbarOverlay = document.querySelector('.navbar-overlay');
    const mobileLinks = document.querySelectorAll('.navbar-mobile-link');
    
    // Función para abrir/cerrar menú
    function toggleMenu() {
        if (hamburger) {
            hamburger.classList.toggle('active');
        }
        if (navbarMobile) {
            navbarMobile.classList.toggle('active');
        }
        if (navbarOverlay) {
            navbarOverlay.classList.toggle('active');
        }
        
        // Prevenir scroll del body cuando el menú está abierto
        if (navbarMobile && navbarMobile.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Click en hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });
    }
    
    // Click en overlay para cerrar
    if (navbarOverlay) {
        navbarOverlay.addEventListener('click', function() {
            toggleMenu();
        });
    }
    
    // Click en links del menú móvil (opcional: cerrar menú al navegar)
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Si quieres que el menú se cierre al hacer click en un link
            // descomenta la siguiente línea:
            // toggleMenu();
        });
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarMobile && navbarMobile.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // ========================================
    // FUNCIONALIDAD DE DROPDOWNS DESKTOP
    // ========================================
    
    const dropdowns = document.querySelectorAll('.navbar-dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.navbar-dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Cerrar otros dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
            });
        }
    });
    
    // Cerrar dropdowns al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar-dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// ========================================
// FUNCIONES DE COMPONENTES
// ========================================

// Paleta de colores con copiado al portapapeles
function initColorPalette() {
    const colorItems = document.querySelectorAll('.color-item');
    
    colorItems.forEach(item => {
        item.addEventListener('click', function() {
            const colorCode = this.querySelector('.color-code')?.textContent;
            if (colorCode) {
                copyToClipboard(colorCode);
                showToast(`Color ${colorCode} copiado`);
            }
        });
    });
}

// Botones interactivos con efectos
function initButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Efecto ripple en click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Botones con estado de carga
    document.querySelectorAll('[data-loading]').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('loading');
            this.disabled = true;
            
            setTimeout(() => {
                this.classList.remove('loading');
                this.disabled = false;
                showToast('Operación completada', 'success');
            }, 2000);
        });
    });
}

// Formularios interactivos
function initForms() {
    const inputs = document.querySelectorAll('.form-control');
    
    inputs.forEach(input => {
        // Validación en tiempo real
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
            validateInput(this);
        });
        
        // Efectos de focus
        input.addEventListener('focus', function() {
            this.parentElement?.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement?.classList.remove('focused');
        });
    });
    
    // Toggle password visibility
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input?.type === 'password') {
                input.type = 'text';
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else if (input) {
                input.type = 'password';
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });
}

// Sistema de notificaciones
function initNotifications() {
    const notifications = document.querySelectorAll('.notification');
    
    notifications.forEach(notification => {
        // Agregar botón de cerrar
        if (!notification.querySelector('.close-btn')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-btn';
            closeBtn.innerHTML = '×';
            closeBtn.addEventListener('click', () => {
                notification.classList.add('fade-out');
                setTimeout(() => notification.remove(), 300);
            });
            notification.appendChild(closeBtn);
        }
        
        // Auto-cerrar después de 5 segundos
        if (notification.dataset.autoClose !== 'false') {
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => notification.remove(), 300);
            }, 5000);
        }
    });
}

// Sistema de tabs
function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs');
    
    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab');
        const panels = container.nextElementSibling?.querySelectorAll('.tab-panel');
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                panels?.forEach(p => p.classList.remove('active'));
                
                this.classList.add('active');
                if (panels?.[index]) {
                    panels[index].classList.add('active');
                }
            });
        });
    });
}

// Cards interactivas
function initCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Efecto hover 3D
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Tablas interactivas
function initTables() {
    const tables = document.querySelectorAll('.table');
    
    tables.forEach(table => {
        // Hacer filas clickeables
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('click', function() {
                rows.forEach(r => r.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        // Ordenamiento de columnas
        const headers = table.querySelectorAll('th[data-sortable]');
        headers.forEach(header => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', function() {
                const column = this.cellIndex;
                const tbody = table.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));
                
                const isAscending = this.classList.contains('asc');
                headers.forEach(h => h.classList.remove('asc', 'desc'));
                this.classList.add(isAscending ? 'desc' : 'asc');
                
                rows.sort((a, b) => {
                    const aValue = a.cells[column].textContent;
                    const bValue = b.cells[column].textContent;
                    
                    if (!isNaN(aValue) && !isNaN(bValue)) {
                        return isAscending ? bValue - aValue : aValue - bValue;
                    }
                    
                    return isAscending 
                        ? bValue.localeCompare(aValue) 
                        : aValue.localeCompare(bValue);
                });
                
                rows.forEach(row => tbody.appendChild(row));
            });
        });
    });
}

// ========================================
// FUNCIONES UTILITARIAS
// ========================================

// Copiar al portapapeles
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Mostrar toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Validación de inputs
function validateInput(input) {
    const value = input.value;
    const type = input.type;
    let isValid = true;
    let errorMessage = '';
    
    switch(type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            errorMessage = 'Email inválido';
            break;
            
        case 'tel':
            const phoneRegex = /^[0-9+\-\s()]+$/;
            isValid = !value || phoneRegex.test(value);
            errorMessage = 'Teléfono inválido';
            break;
            
        case 'number':
            isValid = !isNaN(value) && value !== '';
            errorMessage = 'Número inválido';
            break;
            
        default:
            if (input.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'Campo requerido';
            }
    }
    
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup?.querySelector('.error-message');
    
    if (!isValid && value) {
        input.classList.add('error');
        input.classList.remove('success');
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        }
    } else if (value) {
        input.classList.remove('error');
        input.classList.add('success');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    } else {
        input.classList.remove('error', 'success');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
    
    return isValid;
}

// Smooth scroll para anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ========================================
// ESTILOS DINÁMICOS
// ========================================

const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    /* Efecto Ripple */
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Toast Notifications */
    .toast {
        position: fixed;
        bottom: 20px;
        right: -400px;
        background: var(--primary);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        transition: right 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 250px;
    }
    
    .toast.show {
        right: 20px;
    }
    
    .toast-success {
        background: var(--success);
    }
    
    .toast-error {
        background: var(--danger);
    }
    
    .toast-warning {
        background: var(--warning);
        color: var(--dark);
    }
    
    /* Loading Button */
    .btn.loading {
        position: relative;
        color: transparent !important;
        pointer-events: none;
    }
    
    .btn.loading::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        margin: -10px 0 0 -10px;
        border: 2px solid #fff;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 0.6s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    /* Fade animations */
    .fade-out {
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    }
    
    /* Form validations */
    .form-group.focused .form-label {
        color: var(--primary);
    }
    
    .form-control.success {
        border-color: var(--success);
    }
    
    .form-control.error {
        border-color: var(--danger);
    }
    
    .error-message {
        color: var(--danger);
        font-size: 0.875rem;
        margin-top: 4px;
        display: none;
    }
    
    /* Table selected row */
    .table tbody tr.selected {
        background-color: rgba(45, 84, 166, 0.1);
    }
    
    /* Sortable headers */
    th[data-sortable]::after {
        content: ' ↕';
        opacity: 0.3;
    }
    
    th[data-sortable].asc::after {
        content: ' ↑';
        opacity: 1;
    }
    
    th[data-sortable].desc::after {
        content: ' ↓';
        opacity: 1;
    }
`;

document.head.appendChild(dynamicStyles);

// Exportar funciones globales
window.showToast = showToast;
window.copyToClipboard = copyToClipboard;
window.validateInput = validateInput;