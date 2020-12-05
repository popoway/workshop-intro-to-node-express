// Require Express to run server and routes
const express = require('express');
// Require Open to open browser window automatically
const open = require('open');

// Start up an instance of app
const app = express();

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('.'));

// Setup Server
const port = 3000; // port
const server = app.listen(port, () => {
  console.log('\x1b[36m%s\x1b[0m', `The server is running on localhost:${port}`);
  open(`http://localhost:${port}`);
});
