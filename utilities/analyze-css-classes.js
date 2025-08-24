#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class CSSClassAnalyzer {
  constructor(rootDir = 'client/src') {
    this.rootDir = rootDir;
    this.cssClasses = new Map(); // Map<className, Set<filePath>>
    this.jsClasses = new Map(); // Map<className, Set<filePath>>
    this.moduleImports = new Map(); // Map<filePath, moduleName>
    this.stats = {
      totalCSSFiles: 0,
      totalJSFiles: 0,
      totalCSSClasses: 0,
      totalJSClasses: 0,
      orphanedClasses: [],
      undefinedClasses: [],
      duplicateDefinitions: []
    };
  }

  // Recursively get all files with specific extensions
  getAllFiles(dir, extensions) {
    const files = [];
    
    const walk = (currentDir) => {
      try {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
          const fullPath = path.join(currentDir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
            walk(fullPath);
          } else if (stat.isFile()) {
            const ext = path.extname(item);
            if (extensions.includes(ext)) {
              files.push(fullPath);
            }
          }
        }
      } catch (err) {
        console.warn(`Warning: Could not read directory ${currentDir}:`, err.message);
      }
    };
    
    walk(dir);
    return files;
  }

  // Extract CSS classes from CSS files
  extractCSSClasses() {
    console.log('\n📋 Extracting CSS classes from stylesheets...');
    const cssFiles = this.getAllFiles(this.rootDir, ['.css']);
    this.stats.totalCSSFiles = cssFiles.length;
    
    for (const file of cssFiles) {
      if (file.includes('node_modules')) continue;
      
      const content = fs.readFileSync(file, 'utf-8');
      const relPath = path.relative(this.rootDir, file);
      
      // Match class selectors (., ::, :not, etc.)
      const classRegex = /\.([a-zA-Z_][\w-]*)/g;
      let match;
      
      while ((match = classRegex.exec(content)) !== null) {
        const className = match[1];
        
        if (!this.cssClasses.has(className)) {
          this.cssClasses.set(className, new Set());
        }
        this.cssClasses.get(className).add(relPath);
      }
      
      // Also extract CSS module exports
      if (file.includes('.module.css')) {
        const moduleClasses = this.extractModuleClasses(content);
        for (const className of moduleClasses) {
          if (!this.cssClasses.has(className)) {
            this.cssClasses.set(className, new Set());
          }
          this.cssClasses.get(className).add(relPath + ' (module)');
        }
      }
    }
    
    this.stats.totalCSSClasses = this.cssClasses.size;
    console.log(`  ✅ Found ${this.cssClasses.size} unique CSS classes in ${cssFiles.length} files`);
  }

  // Extract classes from CSS modules
  extractModuleClasses(content) {
    const classes = new Set();
    const classRegex = /\.([a-zA-Z_][\w-]*)\s*{/g;
    let match;
    
    while ((match = classRegex.exec(content)) !== null) {
      classes.add(match[1]);
    }
    
    return Array.from(classes);
  }

  // Extract CSS classes used in JavaScript files
  extractJSClasses() {
    console.log('\n🔍 Extracting CSS classes from JavaScript files...');
    const jsFiles = this.getAllFiles(this.rootDir, ['.js', '.jsx', '.ts', '.tsx']);
    this.stats.totalJSFiles = jsFiles.length;
    
    for (const file of jsFiles) {
      if (file.includes('node_modules')) continue;
      
      const content = fs.readFileSync(file, 'utf-8');
      const relPath = path.relative(this.rootDir, file);
      
      // Extract module imports
      const moduleImportRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+\.module\.css)['"]/g;
      let moduleMatch;
      
      while ((moduleMatch = moduleImportRegex.exec(content)) !== null) {
        const moduleName = moduleMatch[1];
        this.moduleImports.set(relPath, moduleName);
      }
      
      // Pattern 1: className="class1 class2"
      const classNameRegex = /className\s*=\s*["']([^"']+)["']/g;
      let match;
      
      while ((match = classNameRegex.exec(content)) !== null) {
        const classes = match[1].split(/\s+/).filter(c => c.length > 0);
        for (const className of classes) {
          if (!className.includes('{') && !className.includes('$')) {
            if (!this.jsClasses.has(className)) {
              this.jsClasses.set(className, new Set());
            }
            this.jsClasses.get(className).add(relPath);
          }
        }
      }
      
      // Pattern 2: className={styles.someClass} or className={`${styles.someClass}`}
      const moduleClassRegex = /styles\.([a-zA-Z_][\w]*)/g;
      while ((match = moduleClassRegex.exec(content)) !== null) {
        const className = match[1];
        if (!this.jsClasses.has(className)) {
          this.jsClasses.set(className, new Set());
        }
        this.jsClasses.get(className).add(relPath + ' (module)');
      }
      
      // Pattern 3: classList.add/remove/toggle
      const classListRegex = /classList\.(add|remove|toggle)\(['"]([^'"]+)['"]/g;
      while ((match = classListRegex.exec(content)) !== null) {
        const className = match[2];
        if (!this.jsClasses.has(className)) {
          this.jsClasses.set(className, new Set());
        }
        this.jsClasses.get(className).add(relPath);
      }
      
      // Pattern 4: className={`class1 ${condition ? 'class2' : 'class3'}`}
      const templateLiteralRegex = /className\s*=\s*{[`]([^`]+)[`]}/g;
      while ((match = templateLiteralRegex.exec(content)) !== null) {
        const template = match[1];
        const staticClasses = template.match(/[a-zA-Z_][\w-]+/g);
        if (staticClasses) {
          for (const className of staticClasses) {
            if (!className.includes('$') && !className.match(/^(true|false|null|undefined|if|else|return)$/)) {
              if (!this.jsClasses.has(className)) {
                this.jsClasses.set(className, new Set());
              }
              this.jsClasses.get(className).add(relPath);
            }
          }
        }
      }
      
      // Pattern 5: Dynamic classes in conditionals
      const conditionalClassRegex = /['"]([a-zA-Z_][\w-]+)['"]\s*:/g;
      while ((match = conditionalClassRegex.exec(content)) !== null) {
        const className = match[1];
        // Filter out common object keys that aren't CSS classes
        if (!className.match(/^(key|id|type|name|value|label|onClick|onChange|onSubmit|placeholder|disabled|checked|style|data|className|href|src|alt|title)$/)) {
          const lineContext = content.substring(Math.max(0, match.index - 50), match.index + 50);
          if (lineContext.includes('className')) {
            if (!this.jsClasses.has(className)) {
              this.jsClasses.set(className, new Set());
            }
            this.jsClasses.get(className).add(relPath);
          }
        }
      }
    }
    
    this.stats.totalJSClasses = this.jsClasses.size;
    console.log(`  ✅ Found ${this.jsClasses.size} unique CSS classes used in ${jsFiles.length} JS files`);
  }

  // Compare CSS and JS classes
  analyzeDiscrepancies() {
    console.log('\n🔎 Analyzing discrepancies...');
    
    // Find orphaned classes (defined in CSS but not used in JS)
    for (const [className, files] of this.cssClasses.entries()) {
      if (!this.jsClasses.has(className)) {
        this.stats.orphanedClasses.push({
          className,
          definedIn: Array.from(files)
        });
      }
    }
    
    // Find undefined classes (used in JS but not defined in CSS)
    for (const [className, files] of this.jsClasses.entries()) {
      if (!this.cssClasses.has(className)) {
        // Skip common utility classes that might be from external libraries
        const commonUtilityPatterns = [
          /^(container|row|col|btn|form|input|nav|card|modal|alert|badge|table)/,
          /^(active|disabled|selected|hidden|visible|loading|error|success|warning|info)/,
          /^(sm|md|lg|xl|xs)-/,
          /^(mt|mb|ml|mr|mx|my|pt|pb|pl|pr|px|py)-/,
          /^(text|bg|border|rounded|shadow|d|flex|justify|align|w|h)-/
        ];
        
        const isUtilityClass = commonUtilityPatterns.some(pattern => pattern.test(className));
        
        if (!isUtilityClass) {
          this.stats.undefinedClasses.push({
            className,
            usedIn: Array.from(files)
          });
        }
      }
    }
    
    // Find duplicate definitions
    for (const [className, files] of this.cssClasses.entries()) {
      if (files.size > 1) {
        this.stats.duplicateDefinitions.push({
          className,
          definedIn: Array.from(files)
        });
      }
    }
    
    console.log(`  ✅ Analysis complete`);
  }

  // Generate detailed report
  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('                     CSS CLASS ANALYSIS REPORT');
    console.log('='.repeat(80));
    
    console.log('\n📊 SUMMARY STATISTICS:');
    console.log('─'.repeat(40));
    console.log(`  Total CSS Files Scanned:        ${this.stats.totalCSSFiles}`);
    console.log(`  Total JS Files Scanned:         ${this.stats.totalJSFiles}`);
    console.log(`  Total CSS Classes Defined:      ${this.stats.totalCSSClasses}`);
    console.log(`  Total CSS Classes Used in JS:   ${this.stats.totalJSClasses}`);
    console.log(`  Orphaned Classes (unused):      ${this.stats.orphanedClasses.length}`);
    console.log(`  Undefined Classes (missing):    ${this.stats.undefinedClasses.length}`);
    console.log(`  Duplicate Definitions:          ${this.stats.duplicateDefinitions.length}`);
    
    // Orphaned classes report
    if (this.stats.orphanedClasses.length > 0) {
      console.log('\n⚠️  ORPHANED CLASSES (Defined but never used):');
      console.log('─'.repeat(40));
      
      const sortedOrphans = this.stats.orphanedClasses.sort((a, b) => 
        a.className.localeCompare(b.className)
      );
      
      for (const orphan of sortedOrphans.slice(0, 20)) {
        console.log(`\n  .${orphan.className}`);
        for (const file of orphan.definedIn) {
          console.log(`    📁 ${file}`);
        }
      }
      
      if (sortedOrphans.length > 20) {
        console.log(`\n  ... and ${sortedOrphans.length - 20} more orphaned classes`);
      }
    }
    
    // Undefined classes report
    if (this.stats.undefinedClasses.length > 0) {
      console.log('\n❌ UNDEFINED CLASSES (Used but not defined):');
      console.log('─'.repeat(40));
      
      const sortedUndefined = this.stats.undefinedClasses.sort((a, b) => 
        a.className.localeCompare(b.className)
      );
      
      for (const undefined of sortedUndefined.slice(0, 20)) {
        console.log(`\n  .${undefined.className}`);
        for (const file of undefined.usedIn) {
          console.log(`    📁 ${file}`);
        }
      }
      
      if (sortedUndefined.length > 20) {
        console.log(`\n  ... and ${sortedUndefined.length - 20} more undefined classes`);
      }
    }
    
    // Duplicate definitions report
    if (this.stats.duplicateDefinitions.length > 0) {
      console.log('\n🔄 DUPLICATE DEFINITIONS (Defined in multiple files):');
      console.log('─'.repeat(40));
      
      for (const duplicate of this.stats.duplicateDefinitions.slice(0, 10)) {
        console.log(`\n  .${duplicate.className}`);
        for (const file of duplicate.definedIn) {
          console.log(`    📁 ${file}`);
        }
      }
      
      if (this.stats.duplicateDefinitions.length > 10) {
        console.log(`\n  ... and ${this.stats.duplicateDefinitions.length - 10} more duplicate definitions`);
      }
    }
    
    // Recommendations
    console.log('\n💡 RECOMMENDATIONS:');
    console.log('─'.repeat(40));
    
    if (this.stats.orphanedClasses.length > 0) {
      console.log(`  • Consider removing ${this.stats.orphanedClasses.length} unused CSS classes to reduce bundle size`);
    }
    
    if (this.stats.undefinedClasses.length > 0) {
      console.log(`  • Fix ${this.stats.undefinedClasses.length} undefined class references to prevent styling issues`);
    }
    
    if (this.stats.duplicateDefinitions.length > 0) {
      console.log(`  • Consolidate ${this.stats.duplicateDefinitions.length} duplicate class definitions`);
    }
    
    if (this.stats.orphanedClasses.length === 0 && 
        this.stats.undefinedClasses.length === 0 && 
        this.stats.duplicateDefinitions.length === 0) {
      console.log('  ✨ Your CSS classes are well organized! No issues found.');
    }
    
    console.log('\n' + '='.repeat(80));
    
    // Export detailed report to JSON
    this.exportDetailedReport();
  }

  // Export detailed report to JSON file
  exportDetailedReport() {
    const report = {
      timestamp: new Date().toISOString(),
      statistics: {
        totalCSSFiles: this.stats.totalCSSFiles,
        totalJSFiles: this.stats.totalJSFiles,
        totalCSSClasses: this.stats.totalCSSClasses,
        totalJSClasses: this.stats.totalJSClasses,
        orphanedClassesCount: this.stats.orphanedClasses.length,
        undefinedClassesCount: this.stats.undefinedClasses.length,
        duplicateDefinitionsCount: this.stats.duplicateDefinitions.length
      },
      orphanedClasses: this.stats.orphanedClasses,
      undefinedClasses: this.stats.undefinedClasses,
      duplicateDefinitions: this.stats.duplicateDefinitions,
      allCSSClasses: Array.from(this.cssClasses.entries()).map(([className, files]) => ({
        className,
        definedIn: Array.from(files)
      })),
      allJSClasses: Array.from(this.jsClasses.entries()).map(([className, files]) => ({
        className,
        usedIn: Array.from(files)
      }))
    };
    
    const reportPath = path.join(process.cwd(), 'css-analysis-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed report exported to: ${reportPath}`);
  }

  // Main execution
  run() {
    console.log('🚀 Starting CSS Class Analysis...');
    console.log(`📁 Analyzing directory: ${path.resolve(this.rootDir)}`);
    
    try {
      this.extractCSSClasses();
      this.extractJSClasses();
      this.analyzeDiscrepancies();
      this.generateReport();
      
      // Return exit code based on issues found
      const hasIssues = this.stats.orphanedClasses.length > 0 || 
                       this.stats.undefinedClasses.length > 0;
      
      process.exit(hasIssues ? 1 : 0);
    } catch (error) {
      console.error('\n❌ Error during analysis:', error.message);
      console.error(error.stack);
      process.exit(1);
    }
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const rootDir = args[0] || 'client/src';
  
  const analyzer = new CSSClassAnalyzer(rootDir);
  analyzer.run();
}

module.exports = CSSClassAnalyzer;