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
.then(res => console.log(res)) // G.
.catch(err => console.log(`REJECTION: ${err}`))