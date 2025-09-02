const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Function to copy directory recursively
function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItem => {
      copyRecursive(
        path.join(src, childItem),
        path.join(dest, childItem)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy DRAFT folder contents to public
const draftPath = path.join(__dirname, 'DRAFT');
if (fs.existsSync(draftPath)) {
  copyRecursive(draftPath, publicDir);
  console.log('✅ Files copied to public directory');
}

// Create or update index.html if Home.html exists
const homeFile = path.join(publicDir, 'Home.html');
const indexFile = path.join(publicDir, 'index.html');

if (fs.existsSync(homeFile) && !fs.existsSync(indexFile)) {
  fs.copyFileSync(homeFile, indexFile);
  console.log('✅ Created index.html from Home.html');
}

// Create a simple navigation index if no index exists
if (!fs.existsSync(indexFile)) {
  const files = fs.readdirSync(publicDir)
    .filter(file => file.endsWith('.html'))
    .sort();
  
  const indexContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site Index</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #eee;
            padding-bottom: 0.5rem;
        }
        ul {
            list-style: none;
            padding: 0;
        }
        li {
            margin: 0.5rem 0;
        }
        a {
            color: #0066cc;
            text-decoration: none;
            padding: 0.5rem;
            display: block;
            border-radius: 4px;
            transition: background 0.2s;
        }
        a:hover {
            background: #f5f5f5;
        }
        .file-info {
            color: #666;
            font-size: 0.9em;
            margin-left: 1rem;
        }
    </style>
</head>
<body>
    <h1>📁 Site Pages</h1>
    <ul>
        ${files.map(file => `
        <li>
            <a href="${file}">
                📄 ${file.replace('.html', '')}
            </a>
        </li>`).join('')}
    </ul>
</body>
</html>`;
  
  fs.writeFileSync(indexFile, indexContent);
  console.log('✅ Created index.html with navigation');
}

console.log('🚀 Build complete! Ready for Vercel deployment');