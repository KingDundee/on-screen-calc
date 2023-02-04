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

// functions to populate the display

const operandButtons = document.querySelectorAll('button.operand');
const operatorButtons = document.querySelectorAll('button.operator');
const decimalButton = document.querySelector('button.float');
const deleteButton = document.querySelector('button.backspace');
const clearButton = document.querySelector('button.clear-entry');

const displayLine1 = document.querySelector('p.disp-line1');
const displayLine2 = document.querySelector('p.disp-line2');

let numberLast = null; // NUMBER last entered

let lastOperator = ""; // last OPERATOR selected

let lastOperand = "";
let bufferOperand = "";

const displayOperand = function(e) {
  switch (e.target.id) {
    case "zero":
      numberLast = '0';
      displayLine2.textContent = numberLast; // indicator

      bufferOperand += numberLast; // operand buffer
      displayLine1.textContent += numberLast;
      break;
    case "one":
      numberLast = '1';
      displayLine2.textContent = numberLast;

      bufferOperand += numberLast;
      displayLine1.textContent += numberLast;
      break;
    case "two":
      numberLast = '2';
      displayLine2.textContent = numberLast;

      bufferOperand += numberLast;
      displayLine1.textContent += numberLast;
      break;
    case "three":
      numberLast = '3';
      displayLine2.textContent = numberLast;

      bufferOperand += numberLast;
      displayLine1.textContent += numberLast;
      break;
    case "four":
      numberLast = '4';
      displayLine2.textContent = numberLast;

      bufferOperand += numberLast;
      displayLine1.textContent += numberLast;
      break;
    case "five":
      numberLast = '5';
      displayLine2.textContent = numberLast;

      bufferOperand += numberLast;
      displayLine1.textContent += numberLast;
      break;
    case "six":
      numberLast = '6';
      displayLine2.textContent = numberLast;

      bufferOperand += numberLast;
      displayLine1.textContent += numberLast;
      break;
    case "seven":
      numberLast = '7';
      displayLine2.textContent = numberLast;

      bufferOperand += numberLast;
      displayLine1.textContent += numberLast;
      break;
    case "eight":
      numberLast = '8';
      displayLine2.textContent = numberLast;

      bufferOperand += numberLast;
      displayLine1.textContent += numberLast;
      break;
    case "nine":
      numberLast = '9';
      displayLine2.textContent = numberLast;

      bufferOperand += numberLast;
      displayLine1.textContent += numberLast;
      break;
  }
};

const setOperator = function(e) {
  switch (e.target.id) {
    case "add":

      if (lastOperand !== "" && bufferOperand !== "" && lastOperator !== "") {
        displayLine1.textContent = operate(add, +lastOperand, +bufferOperand);
        lastOperand = displayLine1.textContent;
        bufferOperand = "";
        // if both operands full, call calc function before adding
      }
      else if (lastOperand === "") {
        lastOperand = bufferOperand; // dump buffer for next entry
        bufferOperand = ""; // reset buffer
      }

      lastOperator = 'add';
      displayLine1.textContent += '+';

      break;
    case "subtract":

      if (lastOperand !== "" && bufferOperand !== "" && lastOperator !== "") {
        displayLine1.textContent = operate(subtract, +lastOperand, +bufferOperand);
        lastOperand = displayLine1.textContent;
        bufferOperand = "";
        // if both operands full, call calc function before subtracting
      }
      else if (lastOperand === "") {
        lastOperand = bufferOperand; // dump buffer for next entry
        bufferOperand = ""; // reset buffer
      }

      lastOperator = 'subtract';
      displayLine1.textContent += '-';

      break;
    case "multiply":
      
      if (lastOperand !== "" && bufferOperand !== "" && lastOperator !== "") {
        displayLine1.textContent = operate(multiply, +lastOperand, +bufferOperand);
        lastOperand = displayLine1.textContent;
        bufferOperand = "";
        // if both operands full, call calc function before multiplying
      }
      else if (lastOperand === "") {
        lastOperand = bufferOperand; // dump buffer for next entry
        bufferOperand = ""; // reset buffer
      }

      lastOperator = 'multiply';
      displayLine1.textContent += '×';

      break;
    case "divide":

      if (lastOperand !== "" && bufferOperand !== "" && lastOperator !== "") {
        displayLine1.textContent = operate(divide, +lastOperand, +bufferOperand);
        lastOperand = displayLine1.textContent;
        bufferOperand = "";
        // if both operands full, call calc function before dividing
      }
      else if (lastOperand === "") {
        lastOperand = bufferOperand; // dump buffer for next entry
        bufferOperand = ""; // reset buffer
      }
      lastOperator = 'divide';
      displayLine1.textContent += '÷';

      break;
    case "equals":

      if (bufferOperand === "") {
        displayLine2.textContent = 'Enter next operand!';
        break;
      }
      if (lastOperator === "") {
        displayLine2.textContent = 'Enter next operator!';
        break;
      }

      if (lastOperator === 'add') {
        displayLine1.textContent = operate(add, +lastOperand, +bufferOperand);
        lastOperand = displayLine1.textContent;
        bufferOperand = "";
      }
      else if (lastOperator === 'subtract') {
        displayLine1.textContent = operate(subtract, +lastOperand, +bufferOperand);
        lastOperand = displayLine1.textContent;
        bufferOperand = "";
      }
      else if (lastOperator === 'multiply') {
        displayLine1.textContent = operate(multiply, +lastOperand, +bufferOperand);
        lastOperand = displayLine1.textContent;
        bufferOperand = "";
      }
      else if (lastOperator === 'divide') {
        if (bufferOperand === "0") {
          displayLine1.textContent = "";
          displayLine2.textContent = 'Division by zero!!!';
          break;
        }
        displayLine1.textContent = operate(divide, +lastOperand, +bufferOperand);
        lastOperand = displayLine1.textContent;
        bufferOperand = "";
      }
      lastOperator = "";
      break;
  }
};

operandButtons.forEach((operandButton) => {
  operandButton.addEventListener('click', displayOperand);
});

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener('click', setOperator);
});