// defines a function for each of the four calculator operations
const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b === 0? "DO NOT DIVIDE BY ZERO" : a / b,

  // "none" is the default operation for when no operation was previously selected. Passed two values, it returns the second value. Used the first time an operator button is pressed to store the first operand, or when one number is entered followed by "equals"
  none: (a, b) => b
};
// set calculator's display to 0 as default
let displayVal = 0;

// create a variable to store a value that is not displayed, used to store the first number in calculations
let storedVal = 0;

// create an accumulated total for use with repeated calculations
let accumulator = 0;

// sets the default current operation to "none" (defined above)
let currentOperation = operations.none

// this is set to true when the app first loads, or after any button press that isn't a number. In other words, when the user is entering the first digit of a new number, whether it is the start of a new calcuation or following the press of an operator button.
let newEntry = true;

//?????????????????????????????????????????????????????????????????????????????????????
let equalsPressed = false

//prints the states of a number of variables to the browser console for debugging purposes
const infoLog = () => `display: ${displayVal},
 stored: ${storedVal}, 
 accumulator: ${accumulator}, 
 currentOperation: ${Object.keys(operations).find(key => operations[key] === currentOperation)}, 
 currentOperation: ${currentOperation}, 
 equalsPressed? ${equalsPressed? "yes" : "no"}, 
 newEntry? ${newEntry? "yes" : "no"}`

console.log(infoLog())


//assigns a function to each button ID. When any button of the calculator is clicked, the "handleclick" function (defined below) is called. "handleclick" then looks up the button ID in this table to determine which function to call next.
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
// --------------------clickNumber Function--------------------------------------------
//this function is called when a number button is clicked
function clickNumber(buttonID) {

    //checks whether a user is entering the first digit of a new number. If so, begins entry of a new number by replacing the current value in the display with the value of the button pressed
    if (newEntry) {
    displayVal = Number(buttonID);
    newEntry = false;

    //if this is not the first figit, checks whether the user has already entered the maximum number of digits (16) and prevents more digits from being entered
  } else if (displayVal.length > 16) {
    displayVal = displayVal;

    //if the above conditions are not met, concatenates the number value of the button pressed to the existing displayed value
  } else {
    displayVal = "" + displayVal + buttonID;
  }

  // returns the displayVal variable, which will then be returned from the "handleclick" function, which is used by the React state hook "setMainDisplay" in calculator.jsx
  console.log(displayVal);
  console.log(infoLog())
  return displayVal;
}
// -------------------------------clickOperator function----------------------------------
//this function is called when an operator button is clicked. It sets the "currentOperation" variable to whatever function the user has selected, but does not perform the operation (the operation is performed after the user enters another number then presses either equals or another operator button)
function clickOperator(buttonID) {
  // checks whether the button pressed *before* the operator button was "equals". This woud indicate that the user wants to perform a calculation on the result of the previous calculation. In this case, the display value, which is the result of the previous operation, is saved into the accumulator to become the first operand of the next operation
  if (equalsPressed) {
    accumulator = displayVal
  }

  //checks if newEntry flag is on. This would mean that a number has not been entered, so the stored value and accumulator should not be altered. If the newEntry flag is not on, then a number has been entered by the user and should be processed.
  else if (!newEntry) {

    //performs the *previously selected* operation on the number in the accumulator and the newly entered number (displayVal), and stores the result in the accumulator. 
    // If there is no previously selected operation, i.e. this is the first number entered since the app was loaded or cleared, the currentOperation variable will be set to "none", and the newly entered number to be stored in the accumulator as it is
    // If the user has entered a sequence of number-operator-number-operator (e.g. 1 + 2 + ...), on pressing the second operator button, the *previously chosen* operation is performed and the result stored in the accumulator
    accumulator = currentOperation(Number(accumulator), Number(displayVal))
    
    // stores the latest value entered by the user in the "storedVal" variable
    storedVal = displayVal;
  }
 // displays the accumulator value. If this is the first operation of the current calculation, the last value entered will remain in the display. If the user has entered a sequence of number-operator-number-operator (e.g. 1 + 2 + ...), on pressing the second operator button, the result of the first calculation is displayed
  displayVal = accumulator;
 
  // sets the current operation to whatever button the user has pressed, ready to be performed when the user presses equals or another operator
  currentOperation = operations[buttonID];

  // turns on the newEntry flag ready for the next number to be entered
  newEntry = true;

  // turns off the equals flag ?????????????????????????????????????????????????????????????????????????????????????
  equalsPressed = false


  console.log(infoLog());

  // returns the displayVal variable, which will then be returned from the "handleclick" function, which is used by the React state hook "setMainDisplay" in calculator.jsx
  return displayVal;
}

// -------------------------------clickEquals Function-----------------------------------------

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
