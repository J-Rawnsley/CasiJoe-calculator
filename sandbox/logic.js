let displayVal = 0
let storedVal = 0
let currentOperation = (a, b) => b
let newEntry = true

const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
}

const buttonFunctions = {
    "1": "number",
    "2": "number",
    "3": "number",
    "4": "number",
    "5": "number",
    "6": "number",
    "7": "number",
    "8": "number",
    "9": "number",
    "0": "number",
    ".": "number",
    "add": "operator",
    "subtract": "operator",
    "multiply": "operator",
    "divide": "operator",
    "clear": "clear",
    "equals": "equals"

} 

function handleClick(buttonID) {
    if (buttonFunctions[buttonID] === "number") {
        clickNumber(buttonID)
    } 
    if (buttonFunctions[buttonID] === "operator") {
        clickOperator(buttonID)
    } 
    if (buttonFunctions[buttonID] === "clear") {
        clickClear(buttonID)
    } 
    if (buttonFunctions[buttonID] === "equals") {
        clickEquals(buttonID)
    } 

}

function clickNumber(buttonID) {
    if (newEntry) {
        displayVal= Number(buttonID)
        newEntry = false
    }
    else if (displayVal.length > 8) {
        return
    }
    else {
        displayVal = "" + displayVal + buttonID
    }
    console.log(displayVal);
}

function clickOperator(buttonID) {
    storedVal = displayVal
    currentOperation = operations[buttonID]
    displayVal = displayVal
    newEntry = true
    console.log(displayVal);
}

function clickEquals() {
    displayVal = currentOperation(Number(storedVal), Number(displayVal))
    storedVal = 0
    newEntry = true
    console.log(displayVal);
}

function clickClear() {
    displayVal = 0
    storedVal = 0
    newEntry = true
    console.log(displayVal);
}

handleClick("1")
handleClick(".")
handleClick("2")
handleClick("add")
handleClick("1")
handleClick("0")
handleClick("equals")
handleClick("4")
handleClick("2")
handleClick("add")
handleClick("0")
handleClick("5")
handleClick("equals")
handleClick("0")
handleClick("5")
handleClick("equals")



console.log(displayVal, storedVal)