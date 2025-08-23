// Funcionalidad para el menú móvil
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Manejar dropdowns en desktop
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