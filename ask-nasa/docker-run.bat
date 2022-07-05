docker build -t ask-nasa2 .
docker run --name ask-nasa-app2 -p 4000:3000 -v D:\Codecool\Projects\asp.net\ask-nasa-javascript-jjanos139\ask-nasa:/app -v /app/node_modules ask-nasa2