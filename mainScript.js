// functions for basic math operators

const add = function(a, b) {
  return a + b;
}

const subtract = function(a, b) {
  return a - b;
}

const multiply = function(a, b) {
  return a * b;
}

const divide = function(a, b) {
  return a / b;
}

// function to call one of the above functions

const operate = function(operator, numOne, numTwo) {
  return operator(numOne, numTwo);
}