let storedOp // Variable to cache operation

function connectButtons() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => button.addEventListener('click', pressButton))
}

function pressButton(e) {
    // console.log(this)
    if (this.classList.contains('number')) {
        return inputNumber(this.textContent)
    } else if (this.classList.contains('operator')) {
        return operate(this.id)
    } else if (this.classList.contains('action')) {
        return doAction(this.id)
    }
}

function clearDisplay() {
    // Remove text from display and clean any cached operation
    document.querySelector('.input').textContent = "";
    document.querySelector('.result').textContent = "";
    storedOp = undefined;
}

function inputNumber(number) {
    const input = document.querySelector('.input');
    const result = document.querySelector('.result');

    // If there is already a result, clear display first
    if (result.textContent) {clearDisplay()};

    // Replace calculator dot symbol by decimal point
    if (number.charCodeAt(0) === 8226) {
        number = ".";
        if (input.textContent.includes(".")) return; // Allow only one decimal point
    }

    input.textContent += number;
}   

function operate(op) {
    const input = document.querySelector('.input');

    regex = /(\d+(.\d+)?)/g
    numbers = input.textContent.match(regex)
    
    switch (op) {
        case "plus":
            sum(numbers)
            break;
        case "minus":
            subtract(numbers)
            break;
        case "times":
            times(numbers)
            break;
        case "div":
            divide(numbers)
            break;
        case "equals":
            equals(numbers)
            break;
    }
}

function sum(num) {
    const input = document.querySelector('.input');
    const result = document.querySelector('.result');

    if (num.length === 2) {
        // Allow only for two numbers in the input at once
        const sumResult = storedOp(num[1]);
        result.textContent = sumResult;
        input.textContent = sumResult + " \u002B "; // Plus unicode symbol
        storedOp = (num2) => parseFloat(sumResult) + parseFloat(num2);
    } else if (num.length === 1) {
        // Cache operation and wait for second number
        input.textContent = num[0] + " \u002B ";
        storedOp = (num2) => parseFloat(num[0]) + parseFloat(num2);
    }
}

function subtract(num) {
    // Same logic as sum
    const input = document.querySelector('.input');
    const result = document.querySelector('.result');
    
    if (num.length === 2) {
        const subResult = storedOp(num[1]);
        result.textContent = subResult;
        input.textContent = subResult + " \u2212 "; // Minus unicode symbol
        storedOp = (num2) => parseFloat(subResult) - parseFloat(num2);
    } else if (num.length === 1) {
        input.textContent = num[0] + " \u2212 ";
        storedOp = (num2) => parseFloat(num[0]) - parseFloat(num2);
    }
}

function times(num) {
    const input = document.querySelector('.input');
    const result = document.querySelector('.result');
    
    if (num.length === 2) {
        const timesResult = storedOp(num[1]);
        result.textContent = timesResult;
        input.textContent = timesResult + " \u00D7 "; // Times unicode symbol
        storedOp = (num2) => parseFloat(timesResult) * parseFloat(num2);
    } else if (num.length === 1) {
        input.textContent = num[0] + " \u00D7 ";
        storedOp = (num2) => parseFloat(num[0]) * parseFloat(num2);
    }
}

function divide(num) {
    const input = document.querySelector('.input');
    const result = document.querySelector('.result');
    
    if (num.length === 2) {
        const divResult = storedOp(num[1]);
        result.textContent = divResult;
        input.textContent = divResult + " \u2215 "; // Division unicode symbol
        storedOp = (num2) => parseFloat(divResult) / parseFloat(num2);
    } else if (num.length === 1) {
        input.textContent = num[0] + " \u2215 ";
        storedOp = (num2) => parseFloat(num[0]) / parseFloat(num2);
    }
}

function equals(num) {
    const input = document.querySelector('.input');
    const result = document.querySelector('.result');
    
    // If "=" in input do nothing
    if (input.textContent.includes("\u003D")) return;

    if (num.length === 2) {
        // Compute cached operation
        input.textContent = input.textContent + " \u003D"; // Equals unicode symbol
        result.textContent = storedOp(num[1]);
    } else if (num.length === 1) {
        // If only one number, result equals this number
        input.textContent = num[0] + " \u003D";
        result.textContent = num[0];
    }
}

function doAction(action) {
    switch (action) {
        case "clear":
            clearDisplay()
            break;
        case "del":
            break;
    }
}

connectButtons()