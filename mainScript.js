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
  // check expression length under max
  let maxExpressionLength = 15;
  if (calculator.dispLine1.length === maxExpressionLength) {
    clearDisplay();
    calculator.dispLine2 = 'Length limit reached!';
    return;
  }

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
  // check for repeating math operators
  if (calculator.currentInput === '+' || calculator.currentInput === '-' || calculator.currentInput === '✕' || calculator.currentInput === '÷') {
    clearDisplay();
    calculator.dispLine2 = 'Syntax error!';
    return;
  }

  calculator.lastInput = calculator.currentInput; // capture previous input value before getting new input value
  switch (e.target.id) {
    case 'add':
      // check for chained operation
      if (calculator.currentOperator !== '' && typeof +calculator.lastInput === 'number') {
        getResult();
      }

      calculator['currentInput'] = '+';
      setDisplay(calculator.currentInput);
      calculator['currentOperator'] = '+';
      break;
    case 'subtract':
      // check for chained operation
      if (calculator.currentOperator !== '' && typeof +calculator.lastInput === 'number') {
        getResult();
      }

      calculator['currentInput'] = '-';
      setDisplay(calculator.currentInput);
      calculator['currentOperator'] = '-';
      break;
    case 'multiply':
      // check if expression empty first
      if (calculator.dispLine1 === '') {
        calculator.dispLine2 = 'Syntax error!';
        return;
      }
      // check for chained operation
      if (calculator.currentOperator !== '' && typeof +calculator.lastInput === 'number') {
        getResult();
      }

      calculator['currentInput'] = '✕';
      setDisplay(calculator.currentInput);
      calculator['currentOperator'] = '✕';
      break;
    case 'divide':
      // check if expression empty first
      if (calculator.dispLine1 === '') {
        calculator.dispLine2 = 'Syntax error!';
        return;
      }
      // check for chained operation
      if (calculator.currentOperator !== '' && typeof +calculator.lastInput === 'number') {
        getResult();
      }

      calculator['currentInput'] = '÷';
      setDisplay(calculator.currentInput);
      calculator['currentOperator'] = '÷';
      break;
    case 'equals':
      // check if expression empty first
      if (calculator.dispLine1 === '') {
        calculator.dispLine2 = 'Syntax error!';
        return;
      }

      calculator['currentInput'] = '=';
      setDisplay(calculator.currentInput);

      getResult();

      break;
  }
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
const checkRepeatDecimal = function(firstOperand, secondOperand, char) {
  let targetChar = char;
  let charCountFirst = firstOperand.split('').filter(c => c === targetChar).length;
  let charCountSecond = secondOperand.split('').filter(c => c === targetChar).length;
  
  if (charCountFirst > 1 || charCountSecond > 1) {
    return true;
  }
  else {
    return false;
  }
};
//---------------------------------------------------------------------------------
const getResult = function() {
  parseExpression(calculator.dispLine1);

  // check for repeating decimals in operands first
  let repeatDecimal = checkRepeatDecimal(calculator.firstOperand, calculator.secondOperand, '.');
  if (repeatDecimal) {
    clearDisplay();
    calculator.dispLine2 = 'Syntax error!';
    return;
  }

  let operandA = +calculator.firstOperand;
  let operandB = +calculator.secondOperand;

  let decimalPlaces = 2;

  switch (calculator.currentOperator) {
    case '+':
      calculator.dispLine1 = parseFloat((operate(add, operandA, operandB)).toFixed(decimalPlaces));
      break;
    case '-':
      calculator.dispLine1 = parseFloat((operate(subtract, operandA, operandB)).toFixed(decimalPlaces));
      break;
    case '✕':
      calculator.dispLine1 = parseFloat((operate(multiply, operandA, operandB)).toFixed(decimalPlaces));
      break;
    case '÷':
      // check for division by zero
      if (operandB === 0) {
        clearDisplay();
        calculator.dispLine2 = 'Division by zero!';
        return;
      }

      calculator.dispLine1 = parseFloat((operate(divide, operandA, operandB)).toFixed(decimalPlaces));
      break;
  }
  calculator.result = calculator.dispLine1; // REQUIRED?
  calculator['currentOperator'] = ''; // flush current operator when using explicit equals operation
};
//---------------------------------------------------------------------------------
const parseExpression = function(displayExpression) {
  let splitChar;

  // check if a math operator is present before parsing
  if (calculator.currentOperator === '') {
    clearDisplay();
    calculator.dispLine2 = 'Syntax error!';
    return;
  }

  switch (calculator.currentOperator) {
    case '+':
      splitChar = '+';
      break;
    case '-':
      splitChar = '-';
      break;
    case '✕':
      splitChar = '✕';
      break;
    case '÷':
      splitChar = '÷';
      break;
  }
  let operandsA = displayExpression.split(splitChar);
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