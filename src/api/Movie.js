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
};

export async function getPersonDetails(personID) {
    try {
        const response = await fetch('https://api.themoviedb.org/3/person/'+personID+'?api_key=ba1ce78c89e4c0ee21ab28b69ad32be6');
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(`Error with function getPersonDetails ${error.message}`);
      throw error;
    }
  };
