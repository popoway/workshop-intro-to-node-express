const express = require('express');
const bodyParser = require('body-parser');
const open = require('open');
const db = require('./query');

const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Initialize the main project folder
app.use(express.static('website'));

app.get('/institutions', db.getInstitutions);
app.get('/institutions/:id', db.getInstitutionById);
app.get('/squarefootage', db.getSquareFootage);
app.get('/squarefootage/:id', db.getSquareFootageById);
app.get('/squarefootage/:id/:year', db.getSquareFootageByInstitutionIdAndYear);
app.get('/years', db.getYears);

const server = app.listen(port, () => {
  console.log('\x1b[36m%s\x1b[0m', `The server is running on localhost:${port}`);
  open(`http://localhost:${port}`);
});
