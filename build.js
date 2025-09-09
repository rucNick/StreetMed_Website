const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('Created public directory');
}

// Copy static files
const staticFiles = ['styles.css', 'script.js', 'images'];
staticFiles.forEach(file => {
    const sourcePath = path.join(__dirname, 'src', file);
    const destPath = path.join(publicDir, file);
    
    if (fs.existsSync(sourcePath)) {
        if (fs.lstatSync(sourcePath).isDirectory()) {
            // Copy directory
            fs.cpSync(sourcePath, destPath, { recursive: true });
        } else {
            // Copy file
            fs.copyFileSync(sourcePath, destPath);
        }
    }
});
console.log(' Files copied to public directory');

// Create index.html from Home.html
const homeHtml = fs.readFileSync(path.join(__dirname, 'Home.html'), 'utf8');
fs.writeFileSync(path.join(publicDir, 'index.html'), homeHtml);
console.log(' Created index.html from Home.html');

const files = fs.readdirSync(publicDir);
console.log(` Public directory contains ${files.length} files:`, files);

console.log(' Build complete! Ready for Vercel deployment');