const display = document.getElementById("display");
const operationDisplay = document.getElementById("operation");
const buttons = document.querySelectorAll(".btn");

let currentValue = "0";
let previousValue = null;
let currentOperator = null;
let shouldReset = false;

function updateDisplay() {
    display.textContent = currentValue;
}

function clearCalculator() {
    currentValue = "0";
    previousValue = null;
    currentOperator = null;
    shouldReset = false;
    operationDisplay.textContent = "";
    updateDisplay();
}

function appendNumber(number) {
    if (shouldReset) {
        currentValue = "0";
        shouldReset = false;
    }

    if (number === "." && currentValue.includes(".")) return;

    if (currentValue === "0" && number !== ".") {
        currentValue = number;
    } else {
        currentValue += number;
    }

    updateDisplay();
}

function chooseOperator(operator) {
    if (currentValue === "") return;

    if (previousValue !== null && !shouldReset) {
        calculate();
    } else {
        previousValue = currentValue;
    }

    currentOperator = operator;
    operationDisplay.textContent = `${previousValue} ${operator}`;
    shouldReset = true;
}

function calculate() {
    if (currentOperator === null || previousValue === null) return;

    const a = parseFloat(previousValue);
    const b = parseFloat(currentValue);

    if (isNaN(a) || isNaN(b)) return;

    let result;

    switch (currentOperator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": result = b === 0 ? "Error" : a / b; break;
    }

    if (typeof result === "number") {
        result = parseFloat(result.toFixed(8));
    }

    operationDisplay.textContent = `${previousValue} ${currentOperator} ${currentValue} =`;

    currentValue = String(result);
    previousValue = null;
    currentOperator = null;
    shouldReset = true;

    updateDisplay();
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const number = btn.dataset.number;
        const operator = btn.dataset.operator;
        const action = btn.dataset.action;

        if (number !== undefined) {
            appendNumber(number);
        } 
        else if (operator !== undefined) {
            chooseOperator(operator);
        } 
        else if (action === "clear") {
            clearCalculator();
        } 
        else if (action === "equal") {
            calculate();
        }
    });
});

clearCalculator();

