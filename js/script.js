/*
TODO:
1) Decimals, - DONE
2) Numbers bigger than one digit, - DONE
3) AC (removing last number from chaining)
4) Rendering - DONE
5) Shortening too long decimals;
6) Changing operator during chaining - DONE
 */

let state = {};

const initialState = {
    numA: null,
    numB: null,
    builtA: null,
    builtB: null,
    isBuildingNumA: false,
    isBuildingNumB: false,
    operator: null,
    prevOperator: null,
    displayedChain: "",
    result: null
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

        if (!state.numA && !state.numB) {
            // START OF CALCULATING - PROVIDING FIRST NUMBER
            constructNumA(number);
        }

        else if (state.numA && !state.numB) {
            // CONTINUATION OF CALCULATING - PROVIDING SECOND NUMBER
            constructNumB(number);
        }

        else if (state.numA && state.numB) {
            // CHAINING - BOTH NUMBERS PROVIDED
            // result of calculating previous numbers is a first number in a new calculation
            state.builtB = null;
            state.isBuildingNumB = false;
            calculate(state.prevOperator);
            state.numA = state.result;
            state.numB = constructNumB(number);
        }

};

const buildNumber = (prevDigit, nextDigit) => {
    if (prevDigit !== ".") { return prevDigit + nextDigit }
};

const constructNumA = (number) => {

    if (!state.isBuildingNumA) {
        // if this is first digit in building chain, building is initialized:
        state.builtA = number;
        state.isBuildingNumA = true
    }

    else { state.builtA = buildNumber(state.builtA, number) }
    // if this is next digit in building chain, it's added to previous digit

    $displayResult.text(state.builtA);

};

const constructNumB = (number) => {

    if (!state.isBuildingNumB) {
        state.builtB = number;
        state.isBuildingNumB = true
    }

    else { state.builtB = buildNumber(state.builtB, number) }

    $displayResult.text(state.builtB);

};

const passBuiltsValueToNumber = (number) => {

    switch (number) {
        case "numA":
            state.isBuildingNumA = false;
            state.numA = parseFloat(state.builtA);
            state.builtA = null;
            displayChain(state.numA);
            break;
        case "numB":
            state.isBuildingNumB = false;
            state.numB = parseFloat(state.builtB);
            state.builtB = null;
            displayChain(state.numB);
    }

};

const setOperator = operator => {

    if (state.isBuildingNumA && !state.isBuildingNumB) { passBuiltsValueToNumber("numA") }
    else if (!state.isBuildingNumA && state.isBuildingNumB) { passBuiltsValueToNumber("numB") }

    state.prevOperator = state.operator || null;
    state.operator = operator;
    displayChain(operator)

};

const calculate = (operator) => {

    if (state.builtB) { passBuiltsValueToNumber("numB") }
    // condition required to prevent error during chaining (without it, below we would get state.numA + null)

    switch (operator) {
        case "add":
            state.result = state.numA + state.numB;
            break;
        case "subtract":
            state.result = state.numA - state.numB;
            break;
        case "multiply":
            state.result = state.numA * state.numB;
            break;
        case "divide":
            state.result = state.numA / state.numB;
    }

};

const getFinalResult = () => {

    calculate(state.operator);
    $displayResult.text(state.result);
    //TODO: state.result.toString().length...
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

const handleDecimals = () => {
    if (state.isBuildingNumA || state.isBuildingNumB) { setNumber(".") }
};

$(document).ready(() => {

    setInitialState("doNotClearDisplay");

    $btn0.on("click", () => setNumber("0"));
    $btn1.on("click", () => setNumber("1"));
    $btn2.on("click", () => setNumber("2"));
    $btn3.on("click", () => setNumber("3"));
    $btn4.on("click", () => setNumber("4"));
    $btn5.on("click", () => setNumber("5"));
    $btn6.on("click", () => setNumber("6"));
    $btn7.on("click", () => setNumber("7"));
    $btn8.on("click", () => setNumber("8"));
    $btn9.on("click", () => setNumber("9"));

    $btnPeriod.on("click", handleDecimals);

    $btnAdd.on("click", () => setOperator("add"));
    $btnSubtract.on("click", () => setOperator("subtract"));
    $btnMultiply.on("click", () => setOperator("multiply"));
    $btnDivide.on("click", () => setOperator("divide"));

    $btnCE.on("click", () => setInitialState("clearDisplay"));
    $btnEquals.on("click", getFinalResult);

});