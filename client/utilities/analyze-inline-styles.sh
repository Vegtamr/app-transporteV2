#!/bin/bash

echo "========================================="
echo "  ANÁLISIS DE ESTILOS INLINE VS CLASES CSS"
echo "========================================="
echo ""

# Función para buscar clases CSS equivalentes
find_css_class() {
    local style="$1"
    local property="$2"
    
    echo "Buscando clases para: $property"
    
    # Buscar en archivos CSS
    grep -h "$property" ./src/styles/**/*.css 2>/dev/null | grep "^\." | head -5
}

echo "1. ESTILOS DE ESPACIADO (margin, padding)"
echo "----------------------------------------"
echo "Estilos inline encontrados:"
grep -h "margin\|padding" ./src/**/*.js 2>/dev/null | grep "style=" | head -3
echo ""
echo "Clases CSS disponibles:"
grep -E "^\.(m|p|mt|mb|ml|mr|pt|pb|pl|pr)-" ./src/styles/**/*.css 2>/dev/null | sort | uniq | head -10
echo ""

echo "2. ESTILOS DE DISPLAY Y LAYOUT"
echo "----------------------------------------"
echo "Estilos inline encontrados:"
grep -h "display\|grid\|flex" ./src/**/*.js 2>/dev/null | grep "style=" | head -3
echo ""
echo "Clases CSS disponibles:"
grep -E "^\.(flex|grid|display|d-)" ./src/styles/**/*.css 2>/dev/null | sort | uniq | head -10
echo ""

echo "3. ESTILOS DE ANCHO (width, maxWidth)"
echo "----------------------------------------"
echo "Estilos inline encontrados:"
grep -h "width\|Width" ./src/**/*.js 2>/dev/null | grep "style=" | head -3
echo ""
echo "Clases CSS disponibles:"
grep -E "^\.(w-|width|max-width)" ./src/styles/**/*.css 2>/dev/null | sort | uniq | head -10
echo ""

echo "4. ESTILOS DE COLOR Y BACKGROUND"
echo "----------------------------------------"
echo "Estilos inline encontrados:"
grep -h "color\|background" ./src/**/*.js 2>/dev/null | grep "style=" | head -3
echo ""
echo "Clases CSS disponibles:"
grep -E "^\.(bg-|text-|color)" ./src/styles/**/*.css 2>/dev/null | sort | uniq | head -10
echo ""

echo "5. ESTILOS DE TEXTO"
echo "----------------------------------------"
echo "Estilos inline encontrados:"
grep -h "fontSize\|textAlign\|whiteSpace" ./src/**/*.js 2>/dev/null | grep "style=" | head -3
echo ""
echo "Clases CSS disponibles:"
grep -E "^\.(text-|font-|fs-)" ./src/styles/**/*.css 2>/dev/null | sort | uniq | head -10
echo ""

echo "========================================="
echo "  MAPEO SUGERIDO"
echo "========================================="
echo ""
echo "Estilos inline comunes y sus posibles reemplazos:"
echo ""
echo "style={{ marginTop: '1rem' }}        → className='mt-3' o crear .margin-top-md"
echo "style={{ marginBottom: '1rem' }}     → className='mb-3' o crear .margin-bottom-md"
echo "style={{ padding: '2rem' }}          → className='p-4' o crear .padding-lg"
echo "style={{ display: 'flex' }}          → className='d-flex' o .flex"
echo "style={{ display: 'grid' }}          → className='d-grid' o .grid"
echo "style={{ width: '100%' }}            → className='w-100' o .full-width"
echo "style={{ textAlign: 'center' }}      → className='text-center'"
echo "style={{ color: 'var(--text-secondary)' }} → className='text-secondary'"
echo "style={{ whiteSpace: 'nowrap' }}     → className='text-nowrap'"
echo ""