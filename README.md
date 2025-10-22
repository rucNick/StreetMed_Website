## Project Setup and Development 

This guide outlines the commands needed to run the project's development server and automatically rebuild assets during development.

---

### 1. Running the Development Server

Start a simple Python HTTP server to host the project files from the `public` directory.

```bash
python3 -m http.server 3000 --directory public
```

Your project will be accessible in a web browser at:  
[http://localhost:3000](http://localhost:3000)

---

### 2. Automated Asset Rebuilding (Watch Mode)

Use **nodemon** to monitor your source files for changes and automatically trigger a build whenever a save occurs.

```bash
npx nodemon --watch DRAFT --ext html,css,js --delay 200ms --exec "npm run build"
```

---

### 3. Installation Note

If **nodemon** isn’t installed globally, `npx nodemon` may prompt you to install it locally.  
Type `y` and press **Enter** to confirm installation when prompted.
