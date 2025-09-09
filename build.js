const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('✅ Created public directory');
}
console.log(' Current directory contents:');
const files = fs.readdirSync(__dirname);
files.forEach(file => {
    console.log(`  - ${file}`);
});

// Copy static files if they exist
const staticFiles = ['styles.css', 'script.js', 'images', 'assets'];
staticFiles.forEach(file => {
    const sourcePath = path.join(__dirname, file);
    const destPath = path.join(publicDir, file);
    
    if (fs.existsSync(sourcePath)) {
        if (fs.lstatSync(sourcePath).isDirectory()) {
            fs.cpSync(sourcePath, destPath, { recursive: true });
            console.log(` Copied directory: ${file}`);
        } else {
            fs.copyFileSync(sourcePath, destPath);
            console.log(` Copied file: ${file}`);
        }
    }
});

console.log(' Files copied to public directory');

// Look for Home.html in different possible locations
const possiblePaths = [
    path.join(__dirname, 'Home.html'),
    path.join(__dirname, 'home.html'),
    path.join(__dirname, 'src', 'Home.html'),
    path.join(__dirname, 'src', 'home.html'),
    path.join(__dirname, 'pages', 'Home.html'),
    path.join(__dirname, 'index.html')
];

let homeHtmlPath = null;
for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
        homeHtmlPath = possiblePath;
        console.log(` Found HTML file at: ${possiblePath}`);
        break;
    }
}

if (!homeHtmlPath) {
    process.exit(1);
}

// Create index.html from found HTML file
const homeHtml = fs.readFileSync(homeHtmlPath, 'utf8');
fs.writeFileSync(path.join(publicDir, 'index.html'), homeHtml);
console.log(' Created index.html from', path.basename(homeHtmlPath));

// Verify output
const outputFiles = fs.readdirSync(publicDir);
console.log(` Public directory contains ${outputFiles.length} items:`, outputFiles);

console.log(' Build complete! Ready for Vercel deployment');