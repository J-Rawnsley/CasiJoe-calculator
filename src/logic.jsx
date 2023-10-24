/* this file defines the internal logic of the calculator app */

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b === 0 ? "DO NOT DIVIDE BY ZERO" : a / b),
  none: (a, b) => b, // Used the first time an operator button is pressed to store the first operand, or when one number is entered followed by "equals"
};
let displayVal = 0; // value to be returned from each function for display on the calculator screen
let storedVal = 0;
let accumulator = 0;
let currentOperation = operations.none;

let newEntry = true; // indicates that a number button being pressed is the beginning of a new number rather than an additional digit
let equalsPressed = false; //indicates that the last button pressed was "equals" - used for repeated calculations

/* infoLog used for debugging purposes*/
const infoLog = () => `display: ${displayVal},
 stored: ${storedVal}, 
 accumulator: ${accumulator}, 
 currentOperation: ${Object.keys(operations).find(
   (key) => operations[key] === currentOperation
 )}, 
 currentOperation: ${currentOperation}, 
 equalsPressed? ${equalsPressed ? "yes" : "no"}, 
 newEntry? ${newEntry ? "yes" : "no"}`;

console.log(infoLog());

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

/* -----------------------------enter numbers-------------------------------------------------------------------
called when a number button is pressed by the user*/

function clickNumber(buttonID) {

  /* starts a new number from the first digit */
  if (newEntry && buttonID === ".") {
    displayVal = "0.";
    newEntry = false;
  } else if (newEntry) {
    displayVal = Number(buttonID);
    newEntry = false;

    /* limits the user to entering 16 digits including no more than one decimal point */
  } else if (
    displayVal.length > 16 ||
    (displayVal.toString().match(/\./) && buttonID === ".")
  ) {
    displayVal = displayVal;

    /* adds more digits if the maximum length is not reached */
  } else {
    displayVal = "" + displayVal + buttonID;
  }

  console.log(displayVal);
  console.log(infoLog());
  return displayVal; // passed into "setMainDisplay" in calculator app
}

// -------------------------------select next operation to be performed-------------------------

function clickOperator(buttonID) {
  if (equalsPressed) {
    accumulator = displayVal; // used when a new operation is performed on a result (e.g. 1 + 2 = [display 3] + 3 = [display 6])
  } else if (!newEntry) {
    accumulator = currentOperation(Number(accumulator), Number(displayVal)); // used as "equals" to perform the *previously selected* operation when a sequence of operations is input (e.g. 1 + 2 - 3 ...)
    storedVal = displayVal;
  }

  displayVal = accumulator;
  currentOperation = operations[buttonID]; //sets the operation ready for the user to input the next operand
  newEntry = true;
  equalsPressed = false;
  console.log(infoLog());
  return displayVal; // passed into "setMainDisplay" in calculator app
}

// -------------------------------perform the operation and save / display the result-----------------------------------------
function clickEquals() {
  if (newEntry) {
    accumulator = currentOperation(Number(accumulator), Number(storedVal)); //used for repeated calculations
  } else {
    accumulator = currentOperation(Number(accumulator), Number(displayVal));
    storedVal = displayVal; // stores the last value entered for repeated calculations
  }

  displayVal = accumulator;
  newEntry = true;
  equalsPressed = true;
  console.log(infoLog());
  return displayVal; // passed into "setMainDisplay" in calculator app
}

// -------------------------------clear / reset-----------------------------------------
function clickClear() {
  displayVal = 0;
  storedVal = 0;
  accumulator = 0;
  currentOperation = operations.none;
  newEntry = true;
  console.log(infoLog());
  return displayVal;
}

// ------------------------decide which function to call based on the class of button pressed by the user----------------------
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
