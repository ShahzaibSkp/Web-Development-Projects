function calculation(num1, operation, num2, output) {
    const inputNum1 = Number(num1);
    const inputNum2 = Number(num2);
    let result;

    if (isNaN(num1) || isNaN(num2)) {
        output.innerText = "Result: Please enter vaild numbers.";
        return;
    }

    else {
        if (operation === '+') {
            result = inputNum1 + inputNum2;
        }
        else if (operation === '-') {
            result = inputNum1 - inputNum2;
        }
        else if (operation === '*') {
            result = inputNum1 * inputNum2;
        }
        else if (operation === '/') {
            if (inputNum2 === 0) {
                output.innerText = "Result: Error: Division by zero.";
                return;
            }
            result = inputNum1 / inputNum2;
        }

        else {
            output.innerText = "Result: Please enter a vaild operation.";
            return;
        }
    }

    output.innerText = `Result: ${result}`;
}

const Num1 = document.querySelector("#Number1");
const operation = document.querySelector("#operation");
const Num2 = document.querySelector("#Number2");
const calculationBtn = document.querySelector("#calculate");
const outputResult = document.querySelector("#output");

calculationBtn.addEventListener('click', () => {
    calculation(Num1.value, operation.value, Num2.value, outputResult);
});