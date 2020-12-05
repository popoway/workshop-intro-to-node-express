/* Global Variables */
const baseURL = 'http://localhost:3000';
let currentInstitutionId = '';
let currentInstitutionName = '';
let currentYear = '';

// An async function that uses fetch() to make a GET request to the RESTful API for institution list
const getInstitutions = async (baseURL) => {
  const res = await fetch(`${baseURL}/institutions`);
  try {
    const data = await res.json();
    console.log('Getting institutions data from the API:\n' + JSON.stringify(data));
    return data;
  }
  catch (error) {
    console.log('error', error);
  }
};

// Load the institution list into DOM based on JSON from API
const loadInstitutions = (data) => {
  const institutionList = document.getElementById('institutions');
  institutionList.innerHTML = '<option disabled selected>Choose an institution</option>';
  for (const institution of data) {
    let institutionOption = document.createElement('option');
    // console.log(institution);
    institutionOption.value = institution.institutions_id;
    institutionOption.textContent = institution.college;
    institutionList.appendChild(institutionOption);
  }
}

// An async function that uses fetch() to make a GET request to the RESTful API for year list
const getYears = async (baseURL) => {
  const res = await fetch(`${baseURL}/years`);
  try {
    const data = await res.json();
    console.log('Getting year data from the API:\n' + JSON.stringify(data));
    return data;
  }
  catch (error) {
    console.log('error', error);
  }
};

// Load the year list into DOM based on JSON from API
const loadYears = (data) => {
  const yearList = document.getElementById('years');
  yearList.innerHTML = '<option disabled selected>Choose an year</option>';
  for (const year of data) {
    let yearOption = document.createElement('option');
    yearOption.value = year.year_of_measure;
    yearOption.textContent = year.year_of_measure;
    yearList.appendChild(yearOption);
  }
  document.getElementsByClassName('result-container')[0].style.display = 'none';
}

// An async function that uses fetch() to make a GET request to the RESTful API for square footage info
const getSquareFootageByInstitutionIdAndYear = async (baseURL, id, year) => {
  const res = await fetch(`${baseURL}/squarefootage/${id}/${year}`);
  try {
    const data = await res.json();
    console.log('Getting square footage data from the API:\n' + JSON.stringify(data));
    return data;
  }
  catch (error) {
    console.log('error', error);
  }
};

// Load the square footage info into DOM based on JSON from API
const loadSquareFootage = (data) => {
  document.getElementsByClassName('result-container')[0].style.display = 'block';
  const result = document.getElementsByClassName('result-display')[0];
  const link = document.getElementById('download');
  try {
    const square_footage = data[0].square_footage;
    result.textContent = `Square footage: ${square_footage}`;
    document.getElementById('download').style.display = 'block';
    document.getElementById('download').textContent = `Download square footage data of ${currentInstitutionName} in ${currentYear} as JSON.`;
    document.getElementById('download').href = `./squarefootage/${currentInstitutionId}/${currentYear}`;
    document.getElementById('download').download = `square_footage_${currentInstitutionName}_${currentYear}.json`;
  }
  catch (error) {
    result.textContent = `Square footage is not available for year ${currentYear} at ${currentInstitutionName}.`;
    document.getElementById('download').style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', (evt) => {
  console.log('DOM is fully loaded.');
  getInstitutions(baseURL).then((data) => {loadInstitutions(data);});
  document.getElementById('institutions').addEventListener('change', (evt) => {
    document.getElementById('yearsDropdown').style.display = 'block';
    getYears(baseURL).then((data) => {loadYears(data);});
  })
  document.getElementById('years').addEventListener('change', (evt) => {
    currentInstitutionId = document.getElementById('institutions').value;
    currentInstitutionName = document.getElementById('institutions').options[document.getElementById('institutions').selectedIndex].textContent;
    currentYear = document.getElementById('years').value;
    getSquareFootageByInstitutionIdAndYear(baseURL, currentInstitutionId, currentYear).then((data) => {loadSquareFootage(data);});
  })
  document.getElementById('clear').addEventListener('click', (evt) => {
    document.getElementById('yearsDropdown').style.display = 'none';
    document.getElementsByClassName('result-container')[0].style.display = 'none';
    document.getElementById('institutions').selectedIndex = 0;
  })
});
