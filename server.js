const express = require('express');
const routes = require('./routes/index.js')

const PORT = process.env.PORT || 3001; // Set the port, default to 3001 if not specified

const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }))

// Use routes defined in the 'routes' directory
app.use(routes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log('App is listening at http://localhost:' + PORT)
})