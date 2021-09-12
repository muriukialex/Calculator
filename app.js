/*
data-previous-operand   data-current-operand

data-number     data-operation

data-all-clear  data-delete    data-equals
*/
class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.allClear();
    }
    allClear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        if(this.currentOperand === '')return;
        this.currentOperand = this.currentOperand.slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '')return;
        if(this.previousOperand !== ''){
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand.toString() + this.operation.toString();
        this.currentOperand = '';
    }

    compute(){
        let computationResult;
        let previousNumber = parseFloat(this.previousOperand);
        let currentNumber = parseFloat(this.currentOperand); 

        //remember the current operand has the most recent input from the keyboard

        if(isNaN(previousNumber) || isNaN(currentNumber)) return

        switch(this.operation){
            case '+':
                computationResult = previousNumber + currentNumber;
                break;
            case '-':
                computationResult = previousNumber - currentNumber;
                break;
            case 'x':
                computationResult = previousNumber * currentNumber;
                break;
            case '÷':
                computationResult = previousNumber / currentNumber;
                break;
            default:
                return;
        }

        //set currentOperand to computation result
        this.currentOperand = computationResult;
        //set operation to undefined

        this.operation = undefined;
        //set previousOperand to ''
        this.previousOperand = '';

    }
    // formatNumber(string){
    //     let floatNumber = parseFloat(string);
    //     if(isNaN(floatNumber)) return '';
    //     return floatNumber.toLocaleString('en');
    // }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }
}


const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

allClearButton.addEventListener('click',()=>{
    calculator.allClear();
    calculator.updateDisplay();
});

equalsButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
});


document.addEventListener('DOMContentLoaded',()=>{
    const ligthingElement = document.getElementById('lighting');
    const element = document.body;
    ligthingElement.addEventListener('click',()=>{
        element.classList.toggle('dark');
    });
});