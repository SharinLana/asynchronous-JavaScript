// Taks 1
// Get an array of the film titles using
// 'https://swapi.dev/api/films/'

const swapiFilms = async () => {
  // made this func async because we don't know when we receive the response
  let url = "https://swapi.dev/api/films/";

  // Here we need to wait for the result of fetching
  // before executing the code below.
  // If we skip waiting (by not using the 'await' keyword)
  // then the result of logging "films" to the console
  // will be undefined as fetch() can be late with response
  const filmObj = await fetch(url).then((data) => data.json());
  const films = filmObj.results.map((obj) => obj.title);

  console.log(films);
};

swapiFilms();

// Task 2
// Create a function that will retrieve the posts from
// "https://jsonplaceholder.typicode.com/posts"

const getPosts = async (userId) => {
  try {
    const allPosts = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    ).then((data) => data.json());

    //   using filter() method to find only the objects with a particular userId
    const usersPosts = allPosts.filter((obj) => obj.userId === userId);

    return usersPosts;
  } catch (err) {
    console.error("ERROR!!! ", err);
  }
};

getPosts(1).then((res) => console.log(res));

// Task 3
// Get movie planets by their number
// using "https://swapi.dev/api/films"

const moviePlanets = async (num) => {
  url = "https://swapi.dev/api/films/";

  try {
    if (isNaN(num)) {
      throw "You must pass in a number!";
    }

    const object = await fetch(`${url}${num}/`).then((data) => data.json());
    const promises = object.planets.map((link) =>
      fetch(link).then((data) => data.json())
    );

    for await (let planet of promises) {
      console.log(planet.name);
    }
  } catch (err) {
    console.error("ERROR!!! 💥", err);
  }
};

moviePlanets(1);
