/*
Generators is a way to write code that you can pause
and then continue later. It causes the code to yield
until we say it to continue.
Generator does not block the code below the function.

Basically, you can start the fucntion 
and then you can exit it before it runs all the code.
Later you can re-enter this function at the point where you exited.

It is possible not to continue the function at all 
(so, it may not ever finish)

A generator function can be defined with asterisk *.
To pause the function, you need to use 'yield;'
To make the generator function run, you must use 
the next() method.

A generator function returns an object 
with value and true/false statement:
{ value: 3, done: true }

NOTE: you CAN'T declare an arrow function as a generator.
It has to ba a regular function.
*/

// EXAMPLE 1

const test = function* () {
  let x = 10;
  yield x;
  yield x + 10;
  yield x + 20;

  return x + 30;
};

let res = test();
console.log("After generator"); // proof that a generator func does not block the code below
console.log(res.next()); // {value: 10, done: false}
console.log(res.next()); // {value: 20, done: false}
console.log(res.next()); // {value: 30, done: false}
console.log(res.next()); // {value: 40, done: true}

// EXAMPLE 2
const fibonacci = function* (num1, num2, length) {
  let arr = [num1, num2];
  let res;

  for (let i = 0; i < length; i++) {
    res = num1 + num2;
    num1 = num2;
    num2 = res;
    arr.push(res);
    yield arr;
  }

  return arr;
};

let result = fibonacci(0, 1, 10);
console.log(result.next()); // {value: Array(3), done: false}; value: (5) [0, 1, 1, 2, 3]
console.log(result.next()); //{value: Array(4), done: false}; value: (5) [0, 1, 1, 2, 3]
console.log(result.next()); //{value: Array(5), done: false}; value: (5) [0, 1, 1, 2, 3]


// Task 1
//  Create a function that will produce a random number 
// each time when we call the func with the next() method;
const randomNum = function *(end) {
    let result = Math.floor(Math.random() * end) + 1;
    yield result;
    return result;
}

let val = randomNum(45);
console.log(val.next()); // {value: 1, done: false}