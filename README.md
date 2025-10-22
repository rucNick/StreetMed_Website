Project Setup and Development 🚀
This guide outlines the commands needed to run the project's development server and automatically rebuild assets during development.

1. Running the Development Server
Start a simple Python HTTP server to host the project files from the public directory.

In your first terminal, execute the following command:

Bash

python3 -m http.server 3000 --directory public
This will make your project accessible in a web browser, typically at http://localhost:3000.

2. Automated Asset Rebuilding (Watch Mode)
Use nodemon to monitor your source files for changes and automatically trigger a build whenever a save occurs. This avoids the need to manually stop and restart processes.

In your second terminal, run this command:

Bash

npx nodemon --watch DRAFT --ext html,css,js --delay 200ms --exec "npm run build"
Installation Note
If you don't have nodemon installed globally, running npx nodemon might prompt you to install it (it uses a local installation). Just type y (yes) and hit Enter when prompted by the system to install any necessary packages.
