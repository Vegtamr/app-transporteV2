const fs = require('fs');
const path = require('path');

// Function to extract CSS classes from CSS files
function extractCSSClasses(cssContent) {
  const classes = new Set();
  // Match CSS class selectors (starting with .)
  const classRegex = /\.([a-zA-Z0-9_-]+)/g;
  let match;
  while ((match = classRegex.exec(cssContent)) !== null) {
    classes.add(match[1]);
  }
  return classes;
}

// Function to extract className references from JS files
function extractJSClassNames(jsContent, filePath) {
  const classes = [];
  
  // Match className="..." and className={...}
  const classNameRegex = /className\s*=\s*(["`'])([^`"']*?)\1/g;
  const classNameTemplateRegex = /className\s*=\s*\{([^}]+)\}/g;
  
  let match;
  let lineNumber = 1;
  
  // Split content into lines to get line numbers
  const lines = jsContent.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    lineNumber = i + 1;
    
    // Simple string className
    while ((match = classNameRegex.exec(line)) !== null) {
      const classString = match[2];
      const classList = classString.split(/\s+/).filter(cls => cls.trim());
      classList.forEach(cls => {
        // Filter out dynamic classes and Font Awesome classes
        if (!cls.includes('${') && 
            !cls.includes('?') && 
            !cls.startsWith('fa-') && 
            !cls.startsWith('fas') &&
            cls.trim() !== '') {
          classes.push({
            class: cls.trim(),
            file: filePath,
            line: lineNumber,
            context: line.trim()
          });
        }
      });
    }
    
    // Template literal className
    while ((match = classNameTemplateRegex.exec(line)) !== null) {
      const template = match[1];
      // Extract static classes from template literals
      const staticClassRegex = /['"`]([^'"`\$\?\:]+)['"`]/g;
      let staticMatch;
      while ((staticMatch = staticClassRegex.exec(template)) !== null) {
        const classString = staticMatch[1];
        const classList = classString.split(/\s+/).filter(cls => cls.trim());
        classList.forEach(cls => {
          if (!cls.includes('${') && 
              !cls.includes('?') && 
              !cls.startsWith('fa-') && 
              !cls.startsWith('fas') &&
              cls.trim() !== '') {
            classes.push({
              class: cls.trim(),
              file: filePath,
              line: lineNumber,
              context: line.trim()
            });
          }
        });
      }
    }
  }
  
  return classes;
}

// Function to read all CSS files and extract classes
function getAllCSSClasses(srcDir) {
  const allClasses = new Set();
  
  function readCSSFiles(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        readCSSFiles(filePath);
      } else if (file.endsWith('.css')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const classes = extractCSSClasses(content);
        classes.forEach(cls => allClasses.add(cls));
      }
    }
  }
  
  readCSSFiles(srcDir);
  return allClasses;
}

// Function to read all JS files and extract className references
function getAllJSClassNames(srcDir) {
  const allClasses = [];
  
  function readJSFiles(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && file !== 'node_modules') {
        readJSFiles(filePath);
      } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(srcDir, filePath);
        const classes = extractJSClassNames(content, relativePath);
        allClasses.push(...classes);
      }
    }
  }
  
  readJSFiles(srcDir);
  return allClasses;
}

// Main analysis
const srcDir = '/home/vegtamr/app-transporteV2/client/src';

console.log('=== CSS CLASS ANALYSIS ===\n');

// Get all CSS classes
const cssClasses = getAllCSSClasses(srcDir);
console.log(`Total CSS classes defined: ${cssClasses.size}\n`);

// Get all JS className references
const jsClasses = getAllJSClassNames(srcDir);
console.log(`Total className references found: ${jsClasses.length}\n`);

// Find missing classes
const missingClasses = [];
const usedClasses = new Set();

jsClasses.forEach(item => {
  usedClasses.add(item.class);
  if (!cssClasses.has(item.class)) {
    missingClasses.push(item);
  }
});

console.log('=== MISSING CSS CLASSES ===\n');

if (missingClasses.length === 0) {
  console.log('✅ All className references have corresponding CSS definitions!\n');
} else {
  console.log(`❌ Found ${missingClasses.length} missing CSS class definitions:\n`);
  
  // Group by class name
  const grouped = {};
  missingClasses.forEach(item => {
    if (!grouped[item.class]) {
      grouped[item.class] = [];
    }
    grouped[item.class].push(item);
  });
  
  Object.keys(grouped).sort().forEach(className => {
    console.log(`🔍 Missing class: "${className}"`);
    grouped[className].forEach(item => {
      console.log(`   📁 ${item.file}:${item.line}`);
      console.log(`   📝 ${item.context}`);
    });
    console.log('');
  });
}

console.log('=== SUMMARY ===');
console.log(`CSS classes defined: ${cssClasses.size}`);
console.log(`Unique classes used in JS: ${usedClasses.size}`);
console.log(`Missing classes: ${missingClasses.length}`);
console.log(`Coverage: ${Math.round((usedClasses.size - missingClasses.length) / usedClasses.size * 100)}%`);