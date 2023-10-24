// this file is not currently used

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

let displayVal = 0;
let storedVal = 0;
let currentOperation = operations.add
let newEntry = true;

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
  storedVal = currentOperation(Number(storedVal), Number(displayVal));
  displayVal = storedVal;
  currentOperation = operations[buttonID];
  newEntry = true;
  console.log(displayVal);
  return displayVal;
}

function clickEquals() {
  [displayVal, storedVal] = [currentOperation(Number(storedVal), Number(displayVal)), displayVal];
  // storedVal = 0;
  newEntry = true;
  currentOperation = operations.add
  console.log(displayVal);
  return displayVal;
}

function clickClear() {
  displayVal = 0;
  storedVal = 0;
  newEntry = true;
  console.log(displayVal);
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
