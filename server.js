// creata a route that front end can request data from
const { animals } = require('./data/animals');

const express = require('express');
const app = express();

// handle filter functionality into its own function
// will take in req.query as an argument and filter through the animals, then return the new filtered array
function filterByQuery(query, animalsArray) {
  // allowing the personalityTraits query to search a single personality trait and return that rather than just a string of the personality trait searched
  let personalityTraitsArray = [];
  //note that we save the animalsArray as filteredResults here
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    // Save personalityTraits as a dedicated array
    // If personalityTraits is a string, place it into a new array and save
    if (typeof query.personalityTraits === 'string') {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    // Loop through each trait in the personalityTraits Array
    personalityTraitsArray.forEach(trait => {

      // Remember, it is initially a copy of the animalsArray
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that have every one 
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter( animal => animal.personalityTraits.indexOf(trait) !== -1);
    });
  }
    if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}
// to add the route
app.get('/api/animals', (req,res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});


app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});