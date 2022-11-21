// Task 1
// Retrieve data from a single link at https://swapi.dev/

let swapi1 = (num) => {
    const url = 'https://swapi.dev/api/people/';

    fetch(`${url}${num}/`) //returns a promise 
    .then(data => data.json()) // convert a promise into object using json()
    .then(obj => fetch(obj.homeworld)) // obj.homeworld = white link (and fetch returns a promise)
    .then(res => res.json())
    .then(res => console.log(res)) // getting an object as a value
}

swapi1(1)

// Task 2
// Retrieve data from the array of links at https://swapi.dev/

let swapi2 = (num) => {
    const url = 'https://swapi.dev/api/films/';

    fetch(`${url}${num}/`) //returns a promise 
    .then(data => data.json()) // convert a promise to an object using json() method 
    .then(obj => obj.characters)
    .then(arrayOfLinks => {
        arrayOfLinks.forEach(elem => fetch(elem) // returns a promise
        .then(promise => promise.json())
        .then(res => console.log(res.name)))
    })
    .catch(reject => console.log(`Couldn't retrieve films: ${reject}`))
}

swapi2(1)


// Task 3
// POST a new 'todo' in the todo object
// at https://jsonplaceholder.typicode.com/todos

// Step 1. Create an object 
// using the same fields as on the website
let newTodo = {
    userId: 1,
    title: 'Learn Async JS',
    completed: false
}

// Step 2. Fetch, using 2 params: url and object
fetch('https://jsonplaceholder.typicode.com/todos/', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify(newTodo), // took our object and converted it from JS to JSON
})
.then(data => data.json())
.then(obj => console.log(obj)) // receive the new object with the id 201 (that means, the todo was added to the list of 200 todos)
.catch(rejected => console.log(`Unable to add a new todo: ${rejected}`))





