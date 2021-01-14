const request = require('request');
const breed = process.argv.slice(2).join('');

console.log(breed);

const fetchBreed = function() {
  console.log('Attempting to fetch breed description...');
  request('https://api.thecatapi.com/v1/breeds', (err, response, body) => {
    if (!err) {
      const data = JSON.parse(body);
      for (let i of data) {
        if (i.name === breed) {
          console.log(i.description);
        }
      }
    } else {
      console.log(err, response);
    }
    //console.log(JSON.parse(response));

  });

  //console.log('fetchbreed');
};

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

if (breed === 'listcats') {
  listBreeds();
} else {
  fetchBreed();
}