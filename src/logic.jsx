const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b === 0? "DO NOT DIVIDE BY ZERO" : a / b,
  none: (a, b) => b
};

let displayVal = 0;
let storedVal = 0;
let accumulator = 0;
let currentOperation = operations.none
let newEntry = true;
let equalsPressed = false

const infoLog = () => `display: ${displayVal}, stored: ${storedVal}, accumulator: ${accumulator} currentOperation: ${Object.keys(operations).find(key => operations[key] === currentOperation)}, equalsPressed? ${equalsPressed? "yes" : "no"}`

const buttonFunctions = {
  1: "number",
  2: "number",
  3: "number",
  4: "number",
  5: "number",
  6: "number",
  7: "number",
  8: "number",
  9: "number",
  0: "number",
  ".": "number",
  add: "operator",
  subtract: "operator",
  multiply: "operator",
  divide: "operator",
  clear: "clear",
  equals: "equals",
};

function clickNumber(buttonID) {
  if (newEntry) {
    displayVal = Number(buttonID);
    newEntry = false;
  } else if (displayVal.length > 16) {
    displayVal = displayVal;
  } else {
    displayVal = "" + displayVal + buttonID;
  }

  console.log(displayVal);
  return displayVal;
}

function clickOperator(buttonID) {
  if (equalsPressed) {
    accumulator = displayVal
  }
  else if (newEntry) {
    accumulator = currentOperation(Number(accumulator), Number(storedVal))
    currentOperation = operations.none
  }
  else {
    accumulator = currentOperation(Number(accumulator), Number(displayVal))
    storedVal = displayVal;
  }
  displayVal = accumulator;
  currentOperation = operations[buttonID];
  newEntry = true;
  equalsPressed = false
  console.log(infoLog());
  return displayVal;
}

function clickEquals() {
  if (newEntry) {
    accumulator = currentOperation(Number(accumulator), Number(storedVal))
  }
  else {
    accumulator = currentOperation(Number(accumulator), Number(displayVal))
    storedVal = displayVal;
  }
  
  displayVal = accumulator;
  newEntry = true;
  equalsPressed = true
  console.log(infoLog());
  return displayVal;
}

function clickClear() {
  displayVal = 0;
  storedVal = 0;
  accumulator = 0;
  currentOperation = operations.none;
  newEntry = true;
  console.log(infoLog());
  return displayVal;
}

function handleClick(buttonID) {
  console.log(buttonID + " button was clicked");

  if (buttonFunctions[buttonID] === "number") {
    return clickNumber(buttonID);
  }
  if (buttonFunctions[buttonID] === "operator") {
    return clickOperator(buttonID);
  }
  if (buttonFunctions[buttonID] === "clear") {
    return clickClear(buttonID);
  }
  if (buttonFunctions[buttonID] === "equals") {
    return clickEquals(buttonID);
  }
}

export default handleClick;
