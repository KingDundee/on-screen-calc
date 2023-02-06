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

// function to call the basic math operator functions

const operate = function(operator, numOne, numTwo) {
  return operator(numOne, numTwo);
}
//---------------------------------------------------------------------------------
const expressionDisplay = document.querySelector('[data-display = "expression"]');
const indicatorDisplay = document.querySelector('[data-display = "indicator"]');
//---------------------------------------------------------------------------------
const operandButtons = document.querySelectorAll('[data-operand]');
const operatorButtons = document.querySelectorAll('[data-operator]');
//---------------------------------------------------------------------------------
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
//---------------------------------------------------------------------------------
const calculator = {
  lastInput: '',
  currentInput: '',
  currentOperator: '',
  get dispLine1() {
    return expressionDisplay.textContent;
  },
  set dispLine1(value) {
    expressionDisplay.textContent = value;
  },
  get dispLine2() {
    return indicatorDisplay.textContent;
  },
  set dispLine2(value) {
    indicatorDisplay.textContent = value;
  },
  firstOperand: '',
  secondOperand: '',
  result: '',
};
//---------------------------------------------------------------------------------
const setDisplay = function(inputValue) {
  calculator.dispLine1 += inputValue;
  calculator.dispLine2 = inputValue;
};
//---------------------------------------------------------------------------------
const getInput = function(e) {
  calculator.lastInput = calculator.currentInput; // capture previous input value before getting new input value
  switch (e.target.id) {
    case 'zero':
      calculator['currentInput'] = '0';
      setDisplay(calculator.currentInput);
      break;
    case 'one':
      calculator['currentInput'] = '1';
      setDisplay(calculator.currentInput);
      break;
    case 'two':
      calculator['currentInput'] = '2';
      setDisplay(calculator.currentInput);
      break;
    case 'three':
      calculator['currentInput'] = '3';
      setDisplay(calculator.currentInput);
      break;
    case 'four':
      calculator['currentInput'] = '4';
      setDisplay(calculator.currentInput);
      break;
    case 'five':
      calculator['currentInput'] = '5';
      setDisplay(calculator.currentInput);
      break;
    case 'six':
      calculator['currentInput'] = '6';
      setDisplay(calculator.currentInput);
      break;
    case 'seven':
      calculator['currentInput'] = '7';
      setDisplay(calculator.currentInput);
      break;
    case 'eight':
      calculator['currentInput'] = '8';
      setDisplay(calculator.currentInput);
      break;
    case 'nine':
      calculator['currentInput'] = '9';
      setDisplay(calculator.currentInput);
      break;
    case 'decimal':
      calculator['currentInput'] = '.';
      setDisplay(calculator.currentInput);
      break;
  }
};
//---------------------------------------------------------------------------------
const setOperator = function(e) {
  calculator.lastInput = calculator.currentInput; // capture previous input value before getting new input value
  switch (e.target.id) {
    case 'add':
      calculator['currentInput'] = '+';
      setDisplay(calculator.currentInput);
      calculator['currentOperator'] = '+';
      break;
    case 'subtract':
      calculator['currentInput'] = '-';
      setDisplay(calculator.currentInput);
      calculator['currentOperator'] = '-';
      break;
    case 'multiply':
      calculator['currentInput'] = '✕';
      setDisplay(calculator.currentInput);
      calculator['currentOperator'] = '✕';
      break;
    case 'divide':
      calculator['currentInput'] = '÷';
      setDisplay(calculator.currentInput);
      calculator['currentOperator'] = '÷';
      break;
    case 'equals':
      calculator['currentInput'] = '=';
      setDisplay(calculator.currentInput);
      // calculator['currentOperator'] = '='; // LEAVE THIS OUT FOR NOW

      getResult();

      break;
  } // need a way to flush out the current operator once an equals operation is carried out
};
//---------------------------------------------------------------------------------
const clearDisplay = function() {
  calculator.dispLine1 = '';
  calculator.dispLine2 = '';
  calculator.lastInput = '';
  calculator.currentInput = '';
  calculator.currentOperator = '';
  calculator.firstOperand = '';
  calculator.secondOperand = '';
  calculator.result = '';
};
//---------------------------------------------------------------------------------
const getResult = function() {
  parseExpression(calculator.dispLine1);
  let operandA = +calculator.firstOperand;
  let operandB = +calculator.secondOperand;
  switch (calculator.currentOperator) {
    case '+':
      calculator.dispLine1 = operate(add, operandA, operandB);
      break;
    case '-':
      calculator.dispLine1 = operate(subtract, operandA, operandB);
      break;
    case '✕':
      calculator.dispLine1 = operate(multiply, operandA, operandB);
      break;
    case '÷':
      calculator.dispLine1 = operate(divide, operandA, operandB);
      break;
  }
  calculator.result = calculator.dispLine1; // store previous result if operations chained
};
//---------------------------------------------------------------------------------
const parseExpression = function(displayExpression) {
  let splitChar1;
  let splitChar2 = '=';
  switch (calculator.currentOperator) {
    case '+':
      splitChar1 = '+';
      break;
    case '-':
      splitChar1 = '-';
      break;
    case '✕':
      splitChar1 = '✕';
      break;
    case '÷':
      splitChar1 = '÷';
      break;
  }
  let operandsA = displayExpression.split(splitChar1);
  calculator.firstOperand = operandsA[0];

  let operandsB = operandsA[1].split('=');
  calculator.secondOperand = operandsB[0];
}
//---------------------------------------------------------------------------------
operandButtons.forEach((operandButton) => {
  operandButton.addEventListener('click', getInput);
});

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener('click', setOperator);
});

clearButton.addEventListener('click', clearDisplay);
//---------------------------------------------------------------------------------