// Task 1
// Modify the code by creating a promise so that the code
// can run asyncronously

const massiveProcess = function (num) {
  return new Promise((resolve, reject) => {
    if (isNaN(num)) {
      reject(`The argument '${num}' is not a number!`);
    } else {
      let result = 0;

      //  NOTE: if we would not use setTimeout() here (handling the func with a regular promise)
      // it would have worked, too because promise makes the code asyncronous.
      //  But it would work slower: JS is a single-thread language
      //  and it would put all the commands is the closure on schedule, doing them one by one.
      // And when we use setTimeout(), we delegate this method to the browser
      // unloading JS, so it can work mucj faster.

      //   ALL ASYNC METHODS:
      // setTimeout()
      // setInterval()
      // Node.js: setImmediate()
      // Node.js: process.nextTick();
      // Node.js: readFile()

      setTimeout(() => {
        for (let i = num ** 7; i >= 0; i--) {
          result += Math.atan(i) * Math.tan(i);
        }

        resolve(result);
      }, 1000);
    }
  });
};

massiveProcess(10)
  .then((res) => console.log(`The result is: ${res}`))
  .catch((err) => console.log(`ERROR! ${err}`))
  .finally(() =>
    console.log(
      "I am the finally() method. I will be executed regardless of what happened to the promise (whether it is resloved or rejected)!\n For example, you can use me to close/clean up tasks in Node.js"
    )
  );

// Some syncronous code
console.log(5 * 5);

// PROMISE.ALL()
// A method that returns a promise and can be impelmented for an array of promises.
// It can be fulfilled ONLY if all the promises in the array are resolved.
// If one of them is rejected, the entire Promise.all will fail.
// Also, the result will not be available until the last promise in the array is fulfilled
// (so, if one of the promises takes 10 seconds to be resolved, and all the oters - only 1-2 seconds,
// we'll have to wait for 10 seconds until the slowest one is resolved)

let firstName = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Lana");
      //   reject("Lana is rejected");
    }, 0);
  });
};

let middleName = () => {
  return new Promise((resolve, reject) => {
    resolve("G.");
    // reject('G. is rejected!')
  }, 0);
};

let lastName = () => {
  return new Promise((resolve, reject) => {
    resolve("Sharin");
  }, 1000);
};

let fullName = Promise.all([firstName(), middleName(), lastName()])
  .then((res) => console.log(`${res[0]} ${res[1]} ${res[2]}`)) // Lana G. Sharin
  .catch((err) => console.log("REJECTION: " + err));

// PROMISE.RACE()
// Will return a promise for the fastest promise in the array

let theWinner = Promise.race([firstName(), middleName(), lastName()])
  .then((res) => console.log(res)) // G.
  .catch((err) => console.log(`REJECTION: ${err}`));

// Task 3
// Fill out the empty objects with an array of posts, comments and todos
// retrieved from https://jsonplaceholder.typicode.com/
// Use Promise.all, Promise.allSettled, Promise.any

let newObject = function (obj1, obj2, obj3) {
  const url = "https://jsonplaceholder.typicode.com/";

  let promise1 = fetch(url + "posts/").then((data) => data.json());
  let promise2 = fetch(url + "commen/").then((data) => data.json());
  let promise3 = fetch(url + "todos/").then((data) => data.json());

  Promise.all([promise1, promise2, promise3])
    .then((arrayofData) => {
      obj1.posts = arrayofData[0];
      obj1.comments = arrayofData[1];
      obj1.todos = arrayofData[2];
    })
    .catch((err) => console.log("Problem retrieving data: ", err));

  //   PROMISE.ALLSETTLED will return a value of each promises of the array
  // even if one of them was rejected
  Promise.allSettled([promise1, promise2, promise3])
    .then((arrayofData) => {
      obj2.posts = arrayofData[0];
      obj2.comments = arrayofData[1];
      obj2.todos = arrayofData[2];
    })
    .catch((err) => console.log("Problem retrieving data: ", err));

  // PROMISE.ANY will return a value if just ONE of the promises in the array
  // is fulfilled
  Promise.any([promise1, promise2, promise3])
    .then((arrayofData) => {
      obj3.posts = arrayofData[0];
      obj3.comments = arrayofData[1];
      obj3.todos = arrayofData[2];
    })
    .catch((err) => console.log("Problem retrieving data: ", err));

  console.log(obj1);
  console.log(obj2);
  console.log(obj3);
};
newObject({}, {}, {});


// ABORTING A PROMISE

let controller;

const fetchData = function(url) {
    controller = new AbortController();
    const signal = controller.signal;

    // We can abort the promise by Using "signal" as a second param 
    fetch(url, { signal })
    .then(data => data.json())
    .then (res => console.log(res)) // ERROR:  The user aborted a request.
    .catch(err => console.log('ERROR: ', err.message))
};

fetchData('https://jsonplaceholder.typicode.com/todos');
controller.abort();
