const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'mlei',
  host: 'localhost',
  database: 'postgres',
  password: '2lw8CGASWx6+LFQcaESe_g',
  port: 54321,
});

const returnError = (error) => {
  response.send(`An error (${error}) has occurred. Review terminal for details.`);
  console.log(error);
}

const getInstitutions = (request, response) => {
  pool.query('SELECT * FROM institutions ORDER BY institutions_id ASC', (error, results) => {
    if (error) {
      returnError(error);
    }
    else {
      response.status(200).json(results.rows);
    }
  });
}

const getInstitutionById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM institutions WHERE institutions_id = $1', [id], (error, results) => {
    if (error) {
      returnError(error);
    }
    else {
      response.status(200).json(results.rows);
    }
  });
}

const getSquareFootage = (request, response) => {
  pool.query('SELECT * FROM square_footage ORDER BY square_footage_id ASC', (error, results) => {
    if (error) {
      returnError(error);
    }
    else {
      response.status(200).json(results.rows);
    }
  });
}

const getSquareFootageById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM square_footage WHERE square_footage_id = $1', [id], (error, results) => {
    if (error) {
      response.send(`An error (${error}) has occurred. Review terminal for details.`);
      console.log(error);
    }
    else {
      response.status(200).json(results.rows);
    }
  });
}

const getSquareFootageByInstitutionIdAndYear = (request, response) => {
  const id = parseInt(request.params.id)
  const year = parseInt(request.params.year)
  pool.query('SELECT * FROM square_footage WHERE institutions_id = $1 AND year_of_measure = $2', [id, year], (error, results) => {
    if (error) {
      response.send(`An error (${error}) has occurred. Review terminal for details.`);
      console.log(error);
    }
    else {
      response.status(200).json(results.rows);
    }
  });
}

const getYears = (request, response) => {
  pool.query('SELECT DISTINCT year_of_measure FROM square_footage ORDER BY year_of_measure ASC', (error, results) => {
    if (error) {
      returnError(error);
    }
    else {
      response.status(200).json(results.rows);
    }
  });
}

// Export these functions to access from index.js
module.exports = {
  getInstitutions,
  getInstitutionById,
  getSquareFootage,
  getSquareFootageById,
  getSquareFootageByInstitutionIdAndYear,
  getYears
}
