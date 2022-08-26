let storedOp // Variable to cache operation

function connectButtons() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
                 button.addEventListener('click', pressButton);
                 button.addEventListener('click', displayMaxed);
                 button.addEventListener('transitionend', removeTransition);
        }
    );
}

function connectKeys() {
    window.addEventListener('keydown', function(e) {
        asscButton = document.querySelector(`button[data-key="${e.key}"]`);
        if (asscButton) {
            asscButton.click();
            // asscButton.classList.add("pressed");
        }
    })
}

function pressButton() {
    if (this.classList.contains('number')) {
        inputNumber(this.textContent)
    } else if (this.classList.contains('operator')) {
        operate(this.id)
    } else if (this.classList.contains('action')) {
        doAction(this.id)
    }
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('pressed');
}

function clearDisplay() {
    // Remove text from display and clean any cached operation
    document.querySelector('.input').textContent = "";
    document.querySelector('.result').textContent = "";
    storedOp = undefined;
}

function deleteChar() {
    document.querySelector('.result').textContent = "";
    input = document.querySelector('.input');

    input.textContent = input.textContent.slice(0, input.textContent.length - 1);
}

function inputNumber(number) {
    const input = document.querySelector('.input');
    const result = document.querySelector('.result');

    // If there is already a result, clear display first
    if (result.textContent &&
        input.textContent.includes('\u003D')) {
            clearDisplay()
    };

    if (input.textContent.length > 24) return;

    // Replace calculator dot symbol by decimal point
    if (number.charCodeAt(0) === 8226) {
        number = ".";
        // Allow only one decimal point per number

        numbers = input.textContent.match(/(\d+\.?(\d+)?)/g)

        if (numbers.at(-1).includes(".")) return;
    }

    input.textContent += number;
}   

function operate(op) {
    const input = document.querySelector('.input');
    if (input.textContent === "") return;

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
        const sumResult = parseFloat(parseFloat(storedOp(num[1])).toFixed(4));
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
        const subResult = parseFloat(parseFloat(storedOp(num[1])).toFixed(4));
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
        const timesResult = parseFloat(parseFloat(storedOp(num[1])).toFixed(4));
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
        const divResult = parseFloat(parseFloat(storedOp(num[1])).toFixed(4));
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
        result.textContent = parseFloat(parseFloat(storedOp(num[1])).toFixed(4));
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
            deleteChar();
            break;
    }
}

function displayMaxed() {
    const result = document.querySelector(".result")
    const input = document.querySelector(".input")

    if (result.textContent.length > 12) {
        result.textContent = "MAXOUT"
    }
}

connectButtons()
connectKeys()
