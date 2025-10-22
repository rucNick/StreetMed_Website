On 1st terminal run this python server: python3 -m http.server 3000 --directory public
On 2nd terminal run this nodedemon to avoid having to constantly save + rebuild: npx nodemon --watch DRAFT --ext html,css,js --delay 200ms --exec "npm run build"

^ Might have to install it, just hit 'y' for anything it asks lol
