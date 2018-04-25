/*
TODO:
1) Decimals,
2) Numbers bigger than one digit,
3) AC (removing last number from chaining)
4) Rendering
5) Shortening too long decimals
6) Chaining after clicking equals ???
 */

let state = {};

const initialState = {
    numA: 0,
    numB: 0,
    builtA: null,
    builtB: null,
    operator: null,
    result: 0,
    displayedChain: "",
    isBuildingNumA: false,
    isBuildingNumB: false
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

    if (state.numA && state.numB) {
        // CHAINING (BOTH NUMBERS ALREADY PROVIDED)

        calculate(state.operator);
        state.numA = state.result;
        state.numB = number;

        //only displaying - nothing to do with building flow!
        $displayResult.text(number);
        displayChain(number)

    } else if (!state.numA && !state.numB) {
        // START OF CALCULATING - PROVIDING FIRST NUMBER
        provideNumA(number)

    } else {
        // CONTINUATION OF CALCULATING - PROVIDING SECOND NUMBER
        provideNumB(number)

    }

};

const buildNumber = (prevDigit, nextDigit) => {

    const newNumber = prevDigit.toString() + nextDigit.toString();
    console.log(`BUILD: ${parseInt(newNumber)}`);
    return parseInt(newNumber)

};

const provideNumA = (number) => {

    if (!state.isBuildingNumA) {
        // this is first digit in building chain
        state.builtA = number;
        state.isBuildingNumA = true // we initialize building
    } else {
        // this is next digit in building chain - we add it to previous
        state.builtA = buildNumber(state.builtA, number);
    }

    //only displaying - nothing to do with building flow!
    $displayResult.text(state.builtA);
    displayChain(number)

};

const provideNumB = (number) => {

    if (!state.isBuildingNumB) {
        // this is first digit in building chain
        state.builtB = number;
        state.isBuildingNumB = true // we initialize building
    } else {
        // this is next digit in building chain - we add it to previous
        state.builtB = buildNumber(state.builtB, number);
    }

    //only displaying - nothing to do with building flow!
    $displayResult.text(state.builtB);
    displayChain(number)

};

const setOperator = operator => {

    // PASSING RESULT OF THE FIRST BUILT TO THE FIRST NUMBER:
    state.isBuildingNumA = false;
    state.numA = state.builtA;
    state.builtA = null;

    state.operator = operator;
    displayChain(operator)

};

const calculate = (operator) => {

    let result;

    switch (operator) {
        case "add":
            result = state.numA + state.numB;
            break;
        case "subtract":
            result = state.numA - state.numB;
            break;
        case "multiply":
            result = state.numA * state.numB;
            break;
        case "divide":
            result = state.numA / state.numB;
    }

    state.result = result;

};

const getFinalResult = () => {

    // PASSING RESULT OF THE SECOND BUILT TO THE SECOND NUMBER:
    state.isBuildingNumB = false;
    state.numB = state.builtB;
    state.builtB = null;

    calculate(state.operator);
    $displayResult.text(state.result);
    displayChain(`=${state.result}`);
    setInitialState("doNotClearDisplay");

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