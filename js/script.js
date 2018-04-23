/*
TODO:
1) Decimals,
2) Numbers bigger than one digit,
3) AC (removing last number from chaining)
4) Rendering
5) Shortening too long decimals
6) Chaining after clicking equals ???
 */

let state = {
    numbers: {},
};

const initialState = {
    numbers: {
        firstNumber: 0,
        secondNumber: 0
    },
    operator: null,
    result: 0,
    displayedChain: ""
};

const $displayChain = $("#displayChain");
const $displayResult = $("#displayResult");

const $btnAC = $("#btnAC");
const $btnCE = $("#btnCE");
const $btnEquals = $("#btnEquals");

const $btnAdd = $("#btnAdd");
const $btnSubtract = $("#btnSubtract");
const $btnMultiply = $("#btnMultiply");
const $btnDivide = $("#btnDivide");

const $btn0 = $("#btn0");
const $btn1 = $("#btn1");
const $btn2 = $("#btn2");
const $btn3 = $("#btn3");
const $btn4 = $("#btn4");
const $btn5 = $("#btn5");
const $btn6 = $("#btn6");
const $btn7 = $("#btn7");
const $btn8 = $("#btn8");
const $btn9 = $("#btn9");
const $btnPeriod = $("#btnPeriod");

const setInitialState = (typeOfReset) => {

    switch (typeOfReset) {
        case "clearDisplay":
            state = $.extend(true, {}, initialState);
            $displayChain.text("0");
            $displayResult.text("0");
            break;
        case "doNotClearDisplay":
            state = $.extend(true, {}, initialState);
    }

};

const setNumber = number => {
    // !state.startedCalculating ?
    //     state.numbers.firstNumber = number
    //     :
    //     state.numbers.secondNumber = number

    if (state.numbers.firstNumber && state.numbers.secondNumber) {
        //both nums are true, so we do chaining

        calculate(state.operator);
        state.numbers.firstNumber = state.result;
        state.numbers.secondNumber = number;
        $displayResult.text(number);
        displayChain(number)

    } else if (!state.numbers.firstNumber && !state.numbers.secondNumber) {
        // both nums are null, so this is start of calculating

        state.numbers.firstNumber = number;
        $displayResult.text(number);
        displayChain(number)

    } else {
        //state.numbers.firstNumber && !state.numbers.secondNumber - first is already provided
        state.numbers.secondNumber = number;
        $displayResult.text(number);
        displayChain(number)
    }

};

const setOperator = operator => {
    state.operator = operator;
    displayChain(operator)

};

const calculate = (operator) => {

    let result;

    switch (operator) {
        case "add":
            result = state.numbers.firstNumber + state.numbers.secondNumber;
            break;
        case "subtract":
            result = state.numbers.firstNumber - state.numbers.secondNumber;
            break;
        case "multiply":
            result = state.numbers.firstNumber * state.numbers.secondNumber;
            break;
        case "divide":
            result = state.numbers.firstNumber / state.numbers.secondNumber;
    }

    state.result = result;
    console.log(result);

};

const getFinalResult = () => {

    calculate(state.operator);
    console.log(state.result);
    console.log(state.numbers);
    $displayResult.text(state.result);
    displayChain(`=${state.result}`);
    setInitialState("doNotClearDisplay");
    console.log(state.numbers);

};

const displayChain = (newElement) => {

    switch (newElement) {
        case "add":
            newElement = "+";
            break;
        case "subtract":
            newElement = "-";
            break;
        case "multiply":
            newElement = "*";
            break;
        case "divide":
            newElement = "÷"
    }

    state.displayedChain += newElement.toString();
    console.log(state.displayedChain);
    $displayChain.text(state.displayedChain)
};

$(window).on( "load", () => setInitialState("doNotClearDisplay"));

$btn0.on("click", () => setNumber(0));
$btn1.on("click", () => setNumber(1));
$btn2.on("click", () => setNumber(2));
$btn3.on("click", () => setNumber(3));
$btn4.on("click", () => setNumber(4));
$btn5.on("click", () => setNumber(5));
$btn6.on("click", () => setNumber(6));
$btn7.on("click", () => setNumber(7));
$btn8.on("click", () => setNumber(8));
$btn9.on("click", () => setNumber(9));

$btnAdd.on("click", () => setOperator("add"));
$btnSubtract.on("click", () => setOperator("subtract"));
$btnMultiply.on("click", () => setOperator("multiply"));
$btnDivide.on("click", () => setOperator("divide"));

$btnCE.on("click", () => setInitialState("clearDisplay"));
$btnEquals.on("click", getFinalResult);