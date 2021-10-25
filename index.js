let screenText = [];
let firstNumber;
let secondNumber;
let sol;
let operator;
let operatorList = ['+','-', 'x','÷'];

const pannel = document.querySelector('.pannel');
const screen = document.querySelector('.num');

function inputHandler(text) {
    // maybe prevent multiple events
    if (text.length > 1 || text.length === 0) {
        return;
    }
    // prevent input operator only
    if (!screen.innerText.length && ~operatorList.indexOf(text)) {
        console.log('prevent input operator only');
        return;
    }

    if (text === '←') {
        console.log('backspace');
        screenText.pop();
        screen.innerText = screenText.join('');
    }

    // reset all
    if (text === 'c') {
        console.log('c');
        screenText.length = 0;
        screen.innerText = 0;
        firstNumber = secondNumber = operator = sol = null;
        return;
    } 
    if (text === '=') {
        console.log('=');
        secondNumber = Number(screen.innerText);
        if (firstNumber && secondNumber) {
            calcSol();
            return;
        }   
    }
    if (/^\d+$/.test(text)) {
        // prevent 0 start
        if (screen.innerText == 0 && text == 0) {
            return;
        }
        screenText.push(text);
        console.log(screenText.join(''))
        screen.innerText = screenText.join('');
        // if (operator) {
        //     secondNumber = Number(screenText.join(''));
        //     calcSol();
        //     return;
        // } else {
        //     screenText.push(text);
        //     console.log(screenText.join(''))
        //     screen.innerText = screenText.join('');
        // }
    } else {
        if (operator) {
            secondNumber = Number(screenText.join(''));
            calcSol();
            return;
        } else {
            firstNumber = Number(screen.innerText);
            screenText.length = 0;
            screen.innerText = 0;
            handleOperator(text);
            return;
        }
    }
    return;
}

function handleOperator(op) {
    if (op === '÷') {
        operator = '/';
    } else {
        operator = op;
    }
}

function calcSol() {
    if (operator === '+') {
        sol = firstNumber + secondNumber;
    }
    if (operator === '-') {
        sol = firstNumber - secondNumber;
    }
    if (operator === 'x') {
        sol = firstNumber * secondNumber;
    }
    if (operator === '/') {
        sol = firstNumber / secondNumber;
    }

    secondNumber = operator = null;
    firstNumber = sol;
    screen.innerText = sol;
    sol = null;
}

pannel.addEventListener('click', function(event){inputHandler(event.target.innerText)});

