const request = require('request');
const query = process.argv.slice(2).join(' ');

//fetch only a specific breed
const fetchBreed = function(breed) {
  console.log(`Attempting to fetch ${breed} description...`);
  request(`https://api.thecatapi.com/v1/breeds/search?q=${breed}`, (err, response, body) => {
    //console.log(JSON.parse(body));
    if (!err) {
      if (body.length) {
        console.log('Breed not found.');
      } else {
        let breedInfo = JSON.parse(body);
        console.log(breedInfo[0].description);
      }
    } else if (err.code === 'ENOTFOUND') {
      console.log(err.hostname, 'was not found.');
    } else {
      console.log(err);
    }
  });
};

//get all the breeds
const listBreeds = function() {
  console.log('Attempting to fetch breed list...');

  request('https://api.thecatapi.com/v1/breeds', (err, response, body) => {
    const data = JSON.parse(body);
    for (let i of data) {
      console.log(i.name);
    }
  });
  console.log('listbreed');
};

if (query === 'list cats') {
  listBreeds();
} else {
  fetchBreed(query);
}