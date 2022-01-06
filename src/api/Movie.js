const API_KEY = 'ba1ce78c89e4c0ee21ab28b69ad32be6';

export async function getPeople(SearchTerm, offset) {
    try {
        const response = await fetch('https://api.themoviedb.org/3/search/person?api_key=ba1ce78c89e4c0ee21ab28b69ad32be6&query='+SearchTerm+'&page='+offset);
        const json = await response.json();
        return json;
    } catch (error) {
      console.log(`Error with function getPeople ${error.message}`);
      throw error;
    }
    /*try {
      let response;
      switch (offset) {
        case 0:
          console.log('0');
          response = require('../helpers/Search-start-0.json');
          break;
        case 20:
          console.log('20');
          response = require('../helpers/Search-start-20.json');
          break;
        case 40:
          console.log('40');
          response = require('../helpers/Search-start-40.json');
          break;
        default:
          console.log("default");
          response = require('../helpers/Search-start-0.json');
      }
      return response;
    } catch (error) {
      console.log(`Error with function getRestaurants ${error.message}`);
      throw error;
    }*/
  };
