let state = {};

const initialState = {
    numA: null,
    numB: null,
    builtA: "",
    builtB: "",
    isBuildingNumA: false,
    isBuildingNumB: false,
    operator: null,
    prevOperator: null,
    result: null,
    historyOfResults: [],
    historyOfOperations: [],
};

const displayedResultDigitLimit = 10;
const displayedChainDigitLimit = 25;
const digitLimitMsg = "DIGIT LIMIT MET";

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

    if (state.builtA.length > displayedResultDigitLimit || state.builtB.length > displayedResultDigitLimit) {
        // ERROR - DIGIT LIMIT HAS BEEN EXCEEDED
        setInitialState("clearDisplay");
        $displayResult.text(digitLimitMsg);
    }

    else {

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
            state.builtB = "";
            state.isBuildingNumB = false;
            state.numA = state.result;
            state.numB = constructNumB(number);
        }

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
            state.builtA = "";
            state.historyOfOperations.push(state.numA);
            displayChain();
            break;
        case "numB":
            state.isBuildingNumB = false;
            state.numB = parseFloat(state.builtB);
            state.builtB = "";
            state.historyOfOperations.push(state.numB);
            displayChain();
    }

};

const setOperator = operator => {

    if (state.isBuildingNumA && !state.isBuildingNumB) { passBuiltsValueToNumber("numA") }
    else if (!state.isBuildingNumA && state.isBuildingNumB) { passBuiltsValueToNumber("numB") }

    if ( typeof(state.historyOfOperations[state.historyOfOperations.length -1]) !== "string" ) {

        state.prevOperator = state.operator || null;
        state.operator = operator;
        state.historyOfOperations.push(operator);

        calculate(state.prevOperator);
        state.result && $displayResult.text(state.result);
        displayChain();

    }

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

    state.historyOfResults.push(state.result)

};

const getFinalResult = () => {

    calculate(state.operator);
    const displayedResult = shortenDisplayedNumber(state.result, displayedResultDigitLimit);
    $displayResult.text(displayedResult);
    state.historyOfOperations.push(`=${displayedResult}`);
    displayChain();
    setInitialState("doNotClearDisplay");

};

const displayChain = () => {

    let displayedChain = "";
    $displayChain.empty();

    state.historyOfOperations.forEach(item => {

        switch (item) {
            case "add":
                item = "+";
                break;
            case "subtract":
                item = "-";
                break;
            case "multiply":
                item = "*";
                break;
            case "divide":
                item = "÷";
                break;
            default:
                item = item.toString() // when item is a number
        }

        displayedChain += item;

    });

    $displayChain.text(shortenDisplayedNumber(displayedChain, displayedChainDigitLimit));

};

const handleDecimals = () => {
    if (state.isBuildingNumA || state.isBuildingNumB) { setNumber(".") }
};

const shortenDisplayedNumber = (number, maxLength) => {
    return number.toString().length > maxLength ? number.toString().slice(0, maxLength) + "..." : number
};

const revert = () => {

    // first number is being built and hasn't been added to history yet:
    if (state.historyOfOperations.length <= 1) { setInitialState("clearDisplay") }

    // cancelling currently built second number (initial calculation or chaining), but no changes to history:
    else if (state.isBuildingNumB) {
        state.isBuildingNumB = false;
        state.builtB = "";
        $displayResult.text(state.result || "0")
    }

    // cancelling last operator (operators are strings -> type of check):
    else if (state.historyOfOperations.length > 1
        && !state.isBuildingNumB
        && typeof(state.historyOfOperations[state.historyOfOperations.length -1]) === "string") {

        state.historyOfOperations.pop();
        state.operator = null;
        displayChain();

    }

    // returning to previous result: cancelling last (already built) number with proceeding operator:
    else if (state.historyOfOperations.length > 1
        && !state.isBuildingNumB
        && typeof(state.historyOfOperations[state.historyOfOperations.length -1]) === "number")
    {

        state.historyOfResults.pop();
        state.historyOfOperations = state.historyOfOperations.slice(0, -2);

        const lastResult = state.historyOfResults[state.historyOfResults.length -1];

        $displayResult.text(lastResult || state.historyOfOperations[0]);
        displayChain();

        state.numA = lastResult || state.historyOfOperations[0];
        state.numB = null;
        state.result = null;
        state.operator = null;
        state.prevOperator = null;

    }

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

    $btnAC.on("click", revert);
    $btnCE.on("click", () => setInitialState("clearDisplay"));
    $btnEquals.on("click", getFinalResult);

});