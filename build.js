const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
const draftDir = path.join(__dirname, 'DRAFT');

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('✅ Created public directory');
}


console.log('📁 DRAFT directory contents:');
const draftFiles = fs.readdirSync(draftDir);
draftFiles.forEach(file => {
    console.log(`  - ${file}`);
});

// Copy all files from DRAFT to public directory
draftFiles.forEach(file => {
    const sourcePath = path.join(draftDir, file);
    const destPath = path.join(publicDir, file);
    
    try {
        const stats = fs.lstatSync(sourcePath);
        if (stats.isDirectory()) {
            // Copy directory recursively
            fs.cpSync(sourcePath, destPath, { recursive: true });
            console.log(` Copied directory: ${file}`);
        } else {
            // Copy file
            fs.copyFileSync(sourcePath, destPath);
            console.log(` Copied file: ${file}`);
        }
    } catch (error) {
        console.error(`Error copying ${file}:`, error.message);
    }
});

console.log('Files copied to public directory');

// Look for Home.html in DRAFT directory and create index.html
const possibleHomeFiles = [
    'Home.html',
    'home.html',
    'HOME.HTML',
    'index.html',
    'Index.html'
];

let homeHtmlPath = null;
for (const fileName of possibleHomeFiles) {
    const fullPath = path.join(draftDir, fileName);
    if (fs.existsSync(fullPath)) {
        homeHtmlPath = fullPath;
        console.log(` Found HTML file: ${fileName}`);
        break;
    }
}

// If we found a home/index file, ensure it's named index.html in public
if (homeHtmlPath) {
    const homeContent = fs.readFileSync(homeHtmlPath, 'utf8');
    const indexPath = path.join(publicDir, 'index.html');
    fs.writeFileSync(indexPath, homeContent);
    console.log('✅ Created index.html in public directory');
} else {
    // If no Home.html found, check if there's any HTML file we can use as index
    const htmlFiles = draftFiles.filter(f => f.endsWith('.html') || f.endsWith('.HTML'));
    if (htmlFiles.length > 0) {
        console.log(`No Home.html found, but found these HTML files: ${htmlFiles.join(', ')}`);
    } else {
        console.error('ERROR: No HTML files found in DRAFT directory');
        process.exit(1);
    }
}

// Verify the public directory contents
const publicFiles = fs.readdirSync(publicDir);
console.log(`\n📦 Public directory now contains ${publicFiles.length} items:`);
publicFiles.forEach(file => {
    console.log(`  - ${file}`);
});

// Check if index.html exists in public
if (!fs.existsSync(path.join(publicDir, 'index.html'))) {
    console.error('\n WARNING: index.html not found in public directory');
    console.error('Vercel needs an index.html file as the entry point');
    
    // If there are HTML files but no index.html, list them
    const publicHtmlFiles = publicFiles.filter(f => f.endsWith('.html'));
    if (publicHtmlFiles.length > 0) {
        console.log('\nFound these HTML files in public:');
        publicHtmlFiles.forEach(f => console.log(`  - ${f}`));
        
        // Optionally, use the first HTML file as index.html
        const firstHtml = publicHtmlFiles[0];
        const sourcePath = path.join(publicDir, firstHtml);
        const destPath = path.join(publicDir, 'index.html');
        fs.copyFileSync(sourcePath, destPath);
        console.log(`\n✅ Created index.html from ${firstHtml}`);
    }
}

console.log('\n🚀 Build complete! Ready for Vercel deployment');