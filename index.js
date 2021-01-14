const { fetchBreedDescription, listAllBreeds } = require('./breedFetcher.js');

const query = process.argv.slice(2).join(' ');


if (query === 'list cats') {
  console.log('Attempting to fetch breed list...');

  listAllBreeds((error, desc) => {
    if (error) {
      console.log('Error fetch details:', error);
    } else {
      console.log(desc);
    }
  });

} else {
  console.log(`Attempting to fetch ${query} description...`);
  fetchBreedDescription(query, (error, desc) => {
    if (error) {
      console.log('Error fetch details:', error);
    } else {
      console.log(desc);
    }
  });
}