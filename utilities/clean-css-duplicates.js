#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Leer el reporte de análisis
const report = JSON.parse(fs.readFileSync('css-analysis-report.json', 'utf-8'));

// Clases que deben eliminarse de styleguide.css porque están mejor definidas en otros archivos
const classesToRemoveFromStyleguide = [
  // Botones - están en styles/components/buttons.css
  'btn', 'btn-primary', 'btn-secondary', 'btn-success', 'btn-danger', 
  'btn-warning', 'btn-info', 'btn-outline-primary', 'btn-outline-secondary',
  'btn-outline-success', 'btn-outline-danger', 'btn-group', 'btn-block',
  'btn-sm', 'btn-lg',
  
  // Links - están en styles/components/typography.css
  'link-primary', 'link-secondary', 'link-danger',
  
  // Formularios - están en styles/components/forms.css
  'form-card', 'form-group', 'form-label', 'form-control', 'form-select',
  'form-check', 'form-check-input', 'form-check-label', 'form-text',
  'input-group', 'input-group-text',
  
  // Contenedores - están en styles/layout/containers.css
  'container', 'container-fluid', 'row', 'col',
  
  // Cards - están en styles/components/cards.css
  'card', 'card-body', 'card-header', 'card-footer', 'card-title',
  'card-text', 'card-subtitle',
  
  // Tablas - están en styles/components/tables.css
  'table', 'table-striped', 'table-hover', 'table-bordered',
  'table-responsive', 'thead-dark', 'thead-light',
  
  // Alertas - están en styles/components/notifications.css
  'alert', 'alert-primary', 'alert-secondary', 'alert-success',
  'alert-danger', 'alert-warning', 'alert-info',
  
  // Navegación - están en styles/components/navigation.css
  'navbar', 'navbar-brand', 'navbar-nav', 'nav-link', 'nav-item',
  'navbar-toggler', 'navbar-collapse',
  
  // Utilidades básicas - están en styles/base/utilities.css
  'text-center', 'text-left', 'text-right', 'text-justify',
  'text-primary', 'text-secondary', 'text-success', 'text-danger',
  'text-warning', 'text-info', 'text-muted',
  'bg-primary', 'bg-secondary', 'bg-success', 'bg-danger',
  'bg-warning', 'bg-info', 'bg-light', 'bg-dark', 'bg-white',
  'border', 'border-0', 'border-primary', 'border-secondary',
  'rounded', 'rounded-0', 'rounded-circle',
  'd-none', 'd-block', 'd-inline', 'd-inline-block', 'd-flex',
  'justify-content-start', 'justify-content-center', 'justify-content-end',
  'justify-content-between', 'justify-content-around',
  'align-items-start', 'align-items-center', 'align-items-end',
  'flex-row', 'flex-column', 'flex-wrap',
  'm-0', 'm-1', 'm-2', 'm-3', 'm-4', 'm-5',
  'mt-0', 'mt-1', 'mt-2', 'mt-3', 'mt-4', 'mt-5',
  'mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5',
  'ml-0', 'ml-1', 'ml-2', 'ml-3', 'ml-4', 'ml-5',
  'mr-0', 'mr-1', 'mr-2', 'mr-3', 'mr-4', 'mr-5',
  'p-0', 'p-1', 'p-2', 'p-3', 'p-4', 'p-5',
  'pt-0', 'pt-1', 'pt-2', 'pt-3', 'pt-4', 'pt-5',
  'pb-0', 'pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-5',
  'pl-0', 'pl-1', 'pl-2', 'pl-3', 'pl-4', 'pl-5',
  'pr-0', 'pr-1', 'pr-2', 'pr-3', 'pr-4', 'pr-5',
  'w-25', 'w-50', 'w-75', 'w-100',
  'h-25', 'h-50', 'h-75', 'h-100'
];

// Clases huérfanas específicas del proyecto que se pueden eliminar de forma segura
const orphanedClassesToRemove = [
  // Clases muy específicas de styleguide que no se usan
  'autocomplete-wrapper',
  'dropdown-wrapper',
  'datetime-picker-wrapper',
  
  // Clases de gradientes no utilizadas
  'bg-gradient-primary',
  'bg-gradient-secondary', 
  'bg-gradient-subtle',
  
  // Clases de alineación duplicadas y no usadas
  'align-baseline',
  'align-center',
  'align-end',
  'align-start',
  'align-stretch',
  
  // Bordes específicos no utilizados
  'border-top-0',
  'border-bottom-0',
  'border-left-0',
  'border-right-0',
  'border-width-1',
  'border-width-2',
  'border-width-3',
  
  // Sombras no utilizadas
  'shadow-sm',
  'shadow-md',
  'shadow-lg',
  'shadow-xl',
  
  // Estados no utilizados
  'is-loading',
  'is-disabled',
  'is-active',
  'is-hidden'
];

console.log('🧹 Starting CSS cleanup process...\n');

// Función para eliminar clases de un archivo CSS
function removeClassesFromFile(filePath, classesToRemove) {
  const fullPath = path.join('client/src', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${fullPath}`);
    return 0;
  }
  
  let content = fs.readFileSync(fullPath, 'utf-8');
  const originalLength = content.length;
  let removedCount = 0;
  
  classesToRemove.forEach(className => {
    // Regex para encontrar la definición completa de la clase
    const regex = new RegExp(`\\.${className}\\s*\\{[^}]*\\}\\s*`, 'g');
    const matches = content.match(regex);
    
    if (matches) {
      content = content.replace(regex, '');
      removedCount += matches.length;
    }
    
    // También buscar en media queries
    const mediaRegex = new RegExp(`@media[^{]*\\{[^}]*\\.${className}\\s*\\{[^}]*\\}[^}]*\\}`, 'g');
    const mediaMatches = content.match(mediaRegex);
    
    if (mediaMatches) {
      mediaMatches.forEach(match => {
        // Eliminar solo la clase dentro del media query, no todo el media query
        const classInMedia = new RegExp(`\\.${className}\\s*\\{[^}]*\\}`, 'g');
        const newMatch = match.replace(classInMedia, '');
        // Si el media query queda vacío, eliminarlo completamente
        if (newMatch.replace(/@media[^{]*\{/, '').replace(/\}$/, '').trim() === '') {
          content = content.replace(match, '');
        } else {
          content = content.replace(match, newMatch);
        }
      });
      removedCount += mediaMatches.length;
    }
  });
  
  // Limpiar líneas vacías múltiples
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  if (removedCount > 0) {
    fs.writeFileSync(fullPath, content);
    const reduction = originalLength - content.length;
    console.log(`✅ ${filePath}: Removed ${removedCount} class definitions (${reduction} bytes saved)`);
  } else {
    console.log(`ℹ️  ${filePath}: No changes needed`);
  }
  
  return removedCount;
}

// 1. Eliminar duplicados de styleguide.css
console.log('📋 Removing duplicate classes from styleguide.css...\n');
const duplicatesRemoved = removeClassesFromFile('styleguide.css', classesToRemoveFromStyleguide);

// 2. Eliminar clases huérfanas de todos los archivos donde están definidas
console.log('\n🗑️  Removing orphaned classes...\n');

const orphanedByFile = {};

// Agrupar clases huérfanas por archivo
report.orphanedClasses.forEach(orphan => {
  if (orphanedClassesToRemove.includes(orphan.className)) {
    orphan.definedIn.forEach(file => {
      if (!orphanedByFile[file]) {
        orphanedByFile[file] = [];
      }
      orphanedByFile[file].push(orphan.className);
    });
  }
});

let totalOrphansRemoved = 0;
Object.entries(orphanedByFile).forEach(([file, classes]) => {
  totalOrphansRemoved += removeClassesFromFile(file, classes);
});

// 3. Resumen final
console.log('\n' + '='.repeat(60));
console.log('                    CLEANUP SUMMARY');
console.log('='.repeat(60));
console.log(`\n✨ Cleanup completed successfully!`);
console.log(`   - Duplicate classes removed: ${duplicatesRemoved}`);
console.log(`   - Orphaned classes removed: ${totalOrphansRemoved}`);
console.log(`   - Total classes removed: ${duplicatesRemoved + totalOrphansRemoved}`);

console.log('\n💡 Next steps:');
console.log('   1. Run the CSS analyzer again to verify changes');
console.log('   2. Test the application to ensure styles work correctly');
console.log('   3. Consider minifying CSS files for production');

console.log('\n✅ CSS cleanup completed!');