document.addEventListener('DOMContentLoaded', function() {
    let currentInput = '0';
    let operator = '';
    let firstOperand = '';
    let expression = '';
    let shouldClear = false;
    const outputScreen = document.getElementById('output-screen');

    function updateScreen() {
        outputScreen.textContent = expression ? expression : currentInput;
    }

    function handleButtonClick(event) {
        const buttonText = event.target.textContent;
    
        if (operator === '÷' && currentInput === '0' && buttonText === '=') {
            displayError("Dalyba iš 0 negalima");
            updateScreen();
            return;
        }
    
        if (buttonText === ',') {
            return;
        }
    
        if (buttonText === '+/-') {
            return;
        }
    
        if (buttonText === 'Error') {
            expression = '';
            currentInput = 'Error';
        } else if (buttonText === '1⁄x') {
            try {
                currentInput = (1 / parseFloat(currentInput)).toString();
                expression = currentInput;
            } catch (error) {
                currentInput = 'Error';
                expression = '';
            }
        } 
         else if (buttonText === '√x') {
            if (operator === '-' && isNumber(currentInput)) {
                displayError("Įvesties klaida");
                updateScreen();
            } else {
                try {
                    const number = parseFloat(currentInput);
                    if (isNaN(number)) {
                        displayError("Įvesties klaida");
                    } else if (number < 0) {
                        displayError("Įvesties klaida");
                    } else {
                        currentInput = Math.sqrt(number).toString();
                        expression = currentInput;
                    }
                } catch (error) {
                    displayError("Įvesties klaida");
                }
            }
        }
     else if (buttonText === 'x²') {
            try {
                currentInput = (parseFloat(currentInput) ** 2).toString();
                expression = currentInput;
            } catch (error) {
                displayError("Įvesties klaida");
            }
        } else if (buttonText === '√x') {
            try {
                const number = parseFloat(currentInput);
                if (isNaN(number)) {
                    displayError("Įvesties klaida");
                } else if (number < 0) {
                    displayError("Įvesties klaida");
                } else {
                    currentInput = Math.sqrt(number).toString();
                    expression = currentInput;
                }
            } catch (error) {
                displayError("Įvesties klaida");
            }
        } else if (buttonText === 'xⁿ') {
            if (operator === '') {
                expression += '^';
            } else {
                expression = '(' + expression + ')' + '^';
            }
            operator = '^';
            firstOperand = currentInput;
            currentInput = '';
            shouldClear = false;
        } else if (isNumber(buttonText) || buttonText === '.') {
            if (shouldClear || currentInput === '0' || operator === '=') {
                currentInput = buttonText;
                shouldClear = false;
            } else {
                currentInput += buttonText;
            }
            expression += buttonText;
        } else if (buttonText === 'CE') {
            const lastEntryIndex = expression.lastIndexOf(operator);
            if (lastEntryIndex === -1) {
                expression = '';
                currentInput = '0';
            } else {
                expression = expression.substring(0, lastEntryIndex + 1);
                currentInput = expression.substring(lastEntryIndex + 1);
            }
            shouldClear = false;
        } else if (buttonText === 'C') {
            currentInput = '0';
            operator = '';
            firstOperand = '';
            expression = '';
            shouldClear = false;
        } else if (buttonText === '⌫') {
            currentInput = currentInput.slice(0, -1);
            expression = expression.slice(0, -1);
            if (currentInput === '' && expression !== '') {
                const lastOperatorIndex = expression.search(/[\+\-\x\/]$/);
                if (lastOperatorIndex !== -1) {
                    operator = expression[lastOperatorIndex];
                    currentInput = expression.substring(lastOperatorIndex + 1);
                    expression = expression.substring(0, lastOperatorIndex + 1);
                } else {
                    currentInput = expression;
                    expression = '';
                }
            } else if (currentInput === '') {
                currentInput = '0';
            }
        } else if (buttonText === '%') {
            try {
                currentInput = (parseFloat(currentInput) / 100).toString();
                expression = currentInput;
            } catch (error) {
                displayError("Įvesties klaida");
            }
        } else if (buttonText === '=') {
            try {
                expression = expression.replace(/x/g, '*').replace(/÷/g, '/');
                currentInput = evaluateExpression(expression).toString();
                expression = currentInput;
                shouldClear = true;
            } catch (error) {
                displayError("Įvesties klaida");
            }
        } else {
            if (operator === '') {
                expression += buttonText;
            } else {
                expression = '(' + expression + ')' + buttonText;
            }
            operator = buttonText;
            firstOperand = currentInput;
            currentInput = '';
            shouldClear = false;
        }
        updateScreen();
    }

    function isNumber(value) {
        return /^-?\d+(\.\d+)?$/.test(value);
    }

    function evaluateExpression(expression) {
        const parts = expression.split('^');
        if (parts.length === 2) {
            const base = parseFloat(parts[0]);
            const exponent = parseFloat(parts[1]);
            return Math.pow(base, exponent);
        } else {
            return eval(expression);
        }
    }

    function displayError(message) {
        currentInput = message;
        expression = '';
    }

    document.querySelectorAll('.btn').forEach(button => {
        if (button.textContent === 'DEL') {
            button.addEventListener('click', function(event) {
                const lastEntryIndex = expression.lastIndexOf(operator);
                if (lastEntryIndex === -1) {
                    expression = '';
                    currentInput = '0';
                } else {
                    expression = expression.substring(0, lastEntryIndex + 1);
                    currentInput = expression.substring(lastEntryIndex + 1);
                }
                shouldClear = false;
                updateScreen();
            });
        } else {
            button.addEventListener('click', handleButtonClick);
        }
    });
});

