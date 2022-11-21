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
  .catch((err) => console.log(`ERROR! ${err}`));

// Some syncronous code
console.log(5 * 5);
