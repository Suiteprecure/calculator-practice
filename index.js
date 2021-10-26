let screenText = [0];
let firstNumber = Number.NEGATIVE_INFINITY;
let secondNumber = Number.NEGATIVE_INFINITY;
let solution = Number.NEGATIVE_INFINITY;
let operator = null;
let operatorList = ['+','-', 'x','÷','←', 'c', '='];

const panel = document.querySelector('.panel');
const screen = document.querySelector('.num');

function rerender() {
    screen.innerText = screenText.join('');
}

function renderSolution() {
    firstNumber = solution;
    screen.innerText = String(firstNumber);
}

function reset() {
    screenText = [0];
    firstNumber = Number.NEGATIVE_INFINITY;
    secondNumber = Number.NEGATIVE_INFINITY;
    operator = null;
}

function handleNumber(number) {
    let num = Number(number);
    if (screenText[0] == 0) {
        screenText[0] = num;
    } else {
        screenText.push(num);
    } 
    rerender();
}

function flushOperator() {
    solution = Number.NEGATIVE_INFINITY;
    switch (operator) {
        case '+':
            // console.log('flush + ');
            solution = Number(firstNumber) + Number(secondNumber);
            reset();
            renderSolution();
            break;
        case '-':
            // console.log('flush - ');
            solution = Number(firstNumber) - Number(secondNumber);
            reset();
            renderSolution();
            break;
        case 'x':
            // console.log('flush x ');
            solution = Number(firstNumber) * Number(secondNumber);
            reset();
            renderSolution();
          break;
        case '÷':
            // console.log('flush / ');
            solution = Number(firstNumber) / Number(secondNumber);
            reset();
            renderSolution();
            break;
        default:
          console.log(`wrong default.`, operator);
      }
}

function handleMath() {   
    if (firstNumber === Number.NEGATIVE_INFINITY) {
        firstNumber = screenText.join('');
        rerender();
        screenText = [0];
    } else if (secondNumber === Number.NEGATIVE_INFINITY && screenText.join('') === screen.innerText) {
        secondNumber = screenText.join('');
        flushOperator();
    }
}

function handleOperator(op) {
    if (op === 'c') {
        reset();
        rerender();
    } else if (op === '←') {
        if (screenText[0] !== 0) {
            screenText.pop();
            rerender();
        } 
        if (screenText.length === 0) {
            screenText = [0];
            rerender();
        }
    } else if (op === '='){
        secondNumber = screenText.join('');
        flushOperator();
    } else {
        handleMath();
        operator = op;
    }
}

function inputHandler(text) {
    if (~operatorList.indexOf(text)){
        handleOperator(text);
    } else {
        handleNumber(text);
    }
}

function printStatus() {
    console.log(`current status: first: ${firstNumber}, second: ${secondNumber}, operator ${operator}, screenbuffer: ${screenText}`);
}
panel.addEventListener('click', function(event){inputHandler(event.target.innerText)});

