const request = require('request');
  
//get all the breeds
const listAllBreeds = function(callback) {
  let list = [];

  request('https://api.thecatapi.com/v1/breeds', (err, response, body) => {
    if (!err) {
      const data = JSON.parse(body);

      for (let i of data) {
        list.push(i.name);
      }
      callback(null, list.join('\n'));
    } else if (err.code === 'ENOTFOUND') {
      callback(`${err.code}: ${err.hostname} was not found.`, null);
    } else {
      callback(err.code);
    }
  });
};

//fetch only a specific breed
const fetchBreedDescription = function(breedName, callback) {
  request(`https://api.thecatapi.com/v1/breeds/search?q=${breedName}`, (err, response, body) => {
    if (!err) {
      //if body length is 0, nothing was found
      if (JSON.parse(body).length === 0) {
        callback(null, 'Breed not found.');
      } else {
        let breedInfo = JSON.parse(body);
        callback(null, breedInfo[0].description);
      }
    } else if (err.code === 'ENOTFOUND') {
      callback(`${err.code}: ${err.hostname} was not found.`, null);
    } else {
      callback(err.code);
    }
  });
};

module.exports = { fetchBreedDescription, listAllBreeds };