#!/bin/bash

# Script para verificar estilos inline en archivos JS/JSX del proyecto
# Solo busca en archivos dentro de src/ (excluyendo node_modules)

echo "========================================="
echo "  VERIFICADOR DE ESTILOS INLINE"
echo "========================================="
echo ""

# Contador total
total_count=0

# Buscar archivos con estilos inline
echo "Buscando estilos inline en archivos JS/JSX..."
echo ""

# Buscar y contar estilos inline por archivo
for file in $(find ./src -type f \( -name "*.js" -o -name "*.jsx" \) 2>/dev/null); do
    # Contar ocurrencias de style= en el archivo
    count=$(grep -c 'style=' "$file" 2>/dev/null || echo 0)
    
    if [ $count -gt 0 ]; then
        echo "📄 $file"
        echo "   Estilos inline encontrados: $count"
        
        # Mostrar las líneas con estilos inline
        grep -n 'style=' "$file" | while IFS=: read -r line_num line_content; do
            # Recortar la línea si es muy larga
            trimmed=$(echo "$line_content" | sed 's/^[[:space:]]*//' | cut -c1-80)
            echo "   L$line_num: $trimmed..."
        done
        echo ""
        
        # Sumar al total
        total_count=$((total_count + count))
    fi
done

# Resumen
echo "========================================="
echo "  RESUMEN"
echo "========================================="
echo ""

if [ $total_count -eq 0 ]; then
    echo "✅ ¡Excelente! No se encontraron estilos inline."
else
    echo "⚠️  Total de estilos inline encontrados: $total_count"
    echo ""
    echo "Archivos afectados:"
    find ./src -type f \( -name "*.js" -o -name "*.jsx" \) -exec grep -l 'style=' {} \; 2>/dev/null | sort | uniq
    echo ""
    echo "Recomendación: Migrar estos estilos a clases CSS"
fi

echo ""
echo "Verificación completada."