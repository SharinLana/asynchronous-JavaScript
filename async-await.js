// Taks 1
// Get an array of the film titles using 
// 'https://swapi.dev/api/films/'

const swapiFilms = async () => { // made this func async because we don't know when we receive the response
    let url = 'https://swapi.dev/api/films/';

    // Here we need to wait for the result of fetching
    // before executing the code below.
    // If we skip waiting (by not using the 'await' keyword)
    // then the result of logging "films" to the console 
    // will be undefined as fetch() can be late with response
    const filmObj = await fetch(url).then(data => data.json());
    const films = filmObj.results.map(obj => obj.title);

    console.log(films);
};

swapiFilms()